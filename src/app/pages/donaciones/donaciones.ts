import { Component, inject, signal } from '@angular/core';
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
export class Donaciones {
  private fileUploadApi = inject(FileUploadApi);
  private donationsApi = inject(DonationsApi);

  tipo = signal<'dinero' | 'premios'>('dinero');

  moneyDonationAmount: number | null = null;

  donation = {
    type: '',
    description: '',
    images: [] as string[],
  };

  selectedFiles: File[] = [];

  setTipo(valor: 'dinero' | 'premios') {
    this.tipo.set(valor);
  }

  handleFileSelection(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  async submitDonation() {
    this.donation.type = 'prize';
    if (this.selectedFiles.length > 0) {
      const uploadPromises = this.selectedFiles.map(file => this.fileUploadApi.uploadFile(file));
      this.donation.images = await Promise.all(uploadPromises);
    }

    await this.donationsApi.createDonation(this.donation);
    // Reset form
    this.donation = {
      type: '',
      description: '',
      images: [],
    };
    this.selectedFiles = [];
  }

  async submitMoneyDonation() {
    if (this.moneyDonationAmount !== null) {
      await this.donationsApi.createDonation({
        type: 'money',
        amount: this.moneyDonationAmount,
        timestamp: new Date()
      });
      this.moneyDonationAmount = null; // Reset form
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
