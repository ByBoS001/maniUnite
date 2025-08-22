import { firstValueFrom } from 'rxjs';
import { Component, EventEmitter, Output, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthStore } from '../../core/services/auth-store';
import { FirebaseService, Bingo } from '../../core/services/firebase.service';
import { FileUploadApi } from '../../core/services/file-upload-api';
import { DonationsApi } from '../../core/services/donations-api';

@Component({
  selector: 'app-create-bingo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-bingo.html',
  styleUrls: ['./create-bingo.scss'],
})
export class CreateBingo {
  @Input() set donations(donations: any[]) {
    console.log('[CreateBingo] Donations received:', donations);
    this.prizes = (donations || [])
      .filter(d => {
        console.log('[CreateBingo] Filtering donation:', d, 'isPrizeDonation:', d.isPrizeDonation);
        return d.isPrizeDonation === true;
      })
      .map(d => ({
        id: d.id,
        title: d.description,
        value: d.amount,
        type: d.type,
        image: d.images && d.images.length > 0 ? d.images[0] : null,
        donor: {
          id: d.userId,
          name: d.userName,
          desc: ''
        },
        selected: false,
      }));
    console.log('[CreateBingo] Prizes after processing:', this.prizes);
  }
  @Output() close = new EventEmitter<void>();

  private authStore = inject(AuthStore);
  private firebaseService = inject(FirebaseService);
  private fileUploadApi = inject(FileUploadApi);
  private donationsApi = inject(DonationsApi);

  showPreview = false;
  selectedImageFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  bingo = {
    titulo: '',
    descripcion: '',
    fecha: '',
    hora: '',
    precio: 45,
    limite: 2,
    max: 500,
    streamUrl: '',
  };

  prizes: any[] = [];

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedImageFile);
    }
  }

  get selectedPrizes() {
    return this.prizes.filter((p) => p.selected);
  }

  get associatedNGOs() {
    const map = new Map<
      string,
      { id: string; name: string; desc: string; count: number }
    >();
    this.selectedPrizes.forEach((p) => {
      const d = p.donor;
      if (!map.has(d.id))
        map.set(d.id, { id: d.id, name: d.name, desc: d.desc, count: 0 });
      map.get(d.id)!.count++;
    });
    return Array.from(map.values());
  }

  togglePrize(id: string) {
    const p = this.prizes.find((x) => x.id === id);
    if (p) p.selected = !p.selected;
  }

  async saveAndPublish() {
    console.log('Starting saveAndPublish...');

    if (!this.selectedImageFile) {
      alert('Por favor, selecciona una imagen para el bingo.');
      console.log('Validation failed: No image selected.');
      return;
    }

    if (this.selectedPrizes.length === 0) {
      alert('Por favor, selecciona al menos un premio para el bingo.');
      console.log('Validation failed: No prizes selected.');
      return;
    }
    console.log('Validation passed.');

    let imageUrl: string | null = null;
    try {
      console.log('Uploading image...');
      imageUrl = await this.fileUploadApi.uploadFile(this.selectedImageFile);
      console.log('Image uploaded successfully:', imageUrl);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Error al subir la imagen. Por favor, inténtalo de nuevo.');
      return;
    }

    console.log('Fetching admin user...');
    const adminUser = await firstValueFrom(this.authStore.userProfile$);
    if (!adminUser || adminUser.role !== 'admin') {
      alert('Solo los administradores pueden crear bingos.');
      console.log('Auth failed: User is not an admin or not logged in.', adminUser);
      return;
    }
    console.log('Admin user found:', adminUser);

    const newBingo: Bingo = {
      name: this.bingo.titulo,
      date: new Date(`${this.bingo.fecha}T${this.bingo.hora}`),
      streamUrl: this.bingo.streamUrl,
      status: 'upcoming', // Default status
      ongId: adminUser.uid, // Assuming admin user is also an ONG or we need to get ONG ID from admin profile
      imageUrl: imageUrl,
      price: this.bingo.precio,
      userLimit: this.bingo.limite,
      maxTables: this.bingo.max,
    };
    console.log('Constructed Bingo object:', newBingo);

    const prizesToSave = this.selectedPrizes.map((p) => ({
      id: p.id || '',
      name: p.title || '',
      description: p.type || '',
      value: p.value || 0,
      donorId: p.donor.id || '',
    }));
    console.log('Prizes to save:', prizesToSave);

    try {
      console.log('Calling firebaseService.createBingo...');
      const bingoId = await this.firebaseService.createBingo(newBingo, prizesToSave);
      console.log('Bingo created successfully with ID:', bingoId);
      alert('Bingo creado y publicado con éxito. ID: ' + bingoId);
      this.cerrar(); // Close the modal
    } catch (error) {
      console.error('Error al guardar el bingo:', error);
      alert('Error al guardar el bingo. Por favor, inténtalo de nuevo.');
    }
  }

  togglePreview() {
    this.showPreview = !this.showPreview;
  }

  cerrar() {
    this.close.emit();
  }
}
