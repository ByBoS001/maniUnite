import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TestimonialCard } from '../../shared/components/testimonial-card/testimonial-card';
import { FileUploadApi } from '../../core/services/file-upload-api';
import { DonationsApi } from '../../core/services/donations-api';

@Component({
  selector: 'app-donaciones',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TestimonialCard],
  templateUrl: './donaciones.html',
  styleUrl: './donaciones.scss',
})
export class Donaciones implements OnInit {
  private fileUploadApi = inject(FileUploadApi);
  private donationsApi = inject(DonationsApi);

  tipo = signal<'dinero' | 'premios'>('dinero');
  donations = signal<any[]>([]);

  moneyDonationAmount: number | null = null;

  donation = {
    type: '',
    description: '',
    images: [] as string[],
  };


  uploading = signal(false);
  errorMsg = signal<string | null>(null);
  successMsg = signal<string | null>(null);

  selectedFiles = signal<File[]>([]);
  selectedCount = computed(() => this.selectedFiles().length);

  ngOnInit() {
    this.loadDonations();
  }

  loadDonations() {
    this.donationsApi.getDonations().subscribe({
      next: (data) => this.donations.set(data),
      error: (err) => console.error('Error fetching donations:', err)
    });
  }

  setTipo(valor: 'dinero' | 'premios') {
    this.tipo.set(valor);
  }

  handleFileSelection(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    const MAX_FILES = 5;
    const MAX_SIZE_MB = 10;
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];

    const picked: File[] = [];
    for (const f of files) {
      if (!allowed.includes(f.type)) {
        this.errorMsg.set(`Formato no permitido: ${f.name} (${f.type}). Usa JPG/PNG/WEBP.`);
        continue;
      }
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        this.errorMsg.set(`Archivo muy grande: ${f.name} (máx ${MAX_SIZE_MB}MB).`);
        continue;
      }
      picked.push(f);
    }

    const combined = [...this.selectedFiles(), ...picked].slice(0, MAX_FILES);
    this.selectedFiles.set(combined);
    if (combined.length === 0) {
      this.successMsg.set(null);
    }
  }

  async submitDonation() {
    this.errorMsg.set(null);
    this.successMsg.set(null);
    this.uploading.set(true);

    try {
      // Forzamos el tipo en backend como 'prize' (manteniendo tu API actual)
      this.donation.type = 'prize';

      if (this.selectedFiles().length > 0) {
        const uploadPromises = this.selectedFiles().map(file => this.fileUploadApi.uploadFile(file));
        this.donation.images = await Promise.all(uploadPromises);
        console.log('[Cloudinary] URLs:', this.donation.images);
      }

      await this.donationsApi.createDonation(this.donation);

      // Reset del formulario
      this.donation = { type: '', description: '', images: [] };
      this.selectedFiles.set([]);
      this.successMsg.set('¡Donación enviada correctamente! 🎉');
    } catch (err: unknown) {
      const msg = (err instanceof Error ? err.message : 'Error desconocido');
      console.error('[Donaciones] submitDonation error:', err);
      this.errorMsg.set(`No se pudo enviar la donación: ${msg}`);
    } finally {
      this.uploading.set(false);
    }
  }

  async submitMoneyDonation() {
    this.errorMsg.set(null);
    this.successMsg.set(null);
    if (this.moneyDonationAmount === null || this.moneyDonationAmount <= 0) {
      this.errorMsg.set('Ingresa un monto válido.');
      return;
    }
    try {
      await this.donationsApi.createDonation({
        type: 'money',
        amount: this.moneyDonationAmount,
        timestamp: new Date()
      });
      this.moneyDonationAmount = null;
      this.successMsg.set('¡Gracias por tu donación monetaria! 💚');
    } catch (err: unknown) {
      const msg = (err instanceof Error ? err.message : 'Error desconocido');
      console.error('[Donaciones] submitMoneyDonation error:', err);
      this.errorMsg.set(`No se pudo procesar tu donación: ${msg}`);
    }
  }

  currentSlide = 0;

  testimonios = [
    {
      quote:
        'En un año hemos logrado equipar completamente el centro médico comunitario. ¡Gracias a todos!',
      author: 'Centro de Salud Esperanza',
      role: 'Beneficiario',
      impact: '500 familias atendidas',
      image: 'https://source.unsplash.com/200x200/?doctor,woman',
      color: 'bg-teal-500',
    },
    {
      quote:
        'Doné mi servicio de fotografía y ver las sonrisas de los ganadores no tiene precio.',
      author: 'Ana Rodríguez',
      role: 'Donante de Premio',
      impact: 'Sesión fotográfica profesional',
      image: 'https://source.unsplash.com/200x200/?photographer,woman',
      color: 'bg-yellow-500',
    },
    {
      quote:
        'Donar a través de los bingos me permite ayudar mientras me divierto. Es increíble ver el impacto real.',
      author: 'María González',
      role: 'Donante Regular',
      impact: '$450 donados este año',
      image: 'https://source.unsplash.com/200x200/?business,woman',
      color: 'bg-indigo-500',
    },
  ];

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.testimonios.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.testimonios.length) %
      this.testimonios.length;
  }

  scrollToDonationSection() {
    const element = document.getElementById('donation-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
