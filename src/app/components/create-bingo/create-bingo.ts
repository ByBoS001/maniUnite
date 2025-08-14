import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthStore } from '../../core/services/auth-store';
import { FirebaseService, Bingo } from '../../core/services/firebase.service';
import { FileUploadApi } from '../../core/services/file-upload-api';

@Component({
  selector: 'app-create-bingo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-bingo.html',
  styleUrls: ['./create-bingo.scss']
})
export class CreateBingo {
@Output() close = new EventEmitter<void>();

private authStore = inject(AuthStore);
private firebaseService = inject(FirebaseService);
private fileUploadApi = inject(FileUploadApi);

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
};

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

prizes = [
  {
    id: 'p1',
    title: 'Tablet Samsung Galaxy',
    value: 300,
    type: 'Producto',
    donor: { id: 'o1', name: 'Fundación Educa Más', desc: 'Educación y oportunidades' },
    selected: false,
  },
  {
    id: 'p2',
    title: 'Bono de Compras $150',
    value: 150,
    type: 'Voucher',
    donor: { id: 'o2', name: 'Hospital San Juan', desc: 'Atención médica gratuita para familias de bajos recursos' },
    selected: false,
  },
  {
    id: 'p3',
    title: 'Cesta de Productos',
    value: 80,
    type: 'Canasta',
    donor: { id: 'o3', name: 'Comedores Unidos', desc: 'Alimentación solidaria para comunidades necesitadas' },
    selected: false,
  },
  {
    id: 'p4',
    title: 'Auriculares Bluetooth',
    value: 120,
    type: 'Producto',
    donor: { id: 'o1', name: 'Fundación Educa Más', desc: 'Educación y oportunidades' },
    selected: false,
  },
];

get selectedPrizes() {
  return this.prizes.filter(p => p.selected);
}

get associatedNGOs() {
  const map = new Map<string, { id: string; name: string; desc: string; count: number }>();
  this.selectedPrizes.forEach(p => {
    const d = p.donor;
    if (!map.has(d.id)) map.set(d.id, { id: d.id, name: d.name, desc: d.desc, count: 0 });
    map.get(d.id)!.count++;
  });
  return Array.from(map.values());
}

togglePrize(id: string) {
  const p = this.prizes.find(x => x.id === id);
  if (p) p.selected = !p.selected;
}

async saveAndPublish() {
  if (!this.selectedImageFile) {
    alert('Por favor, selecciona una imagen para el bingo.');
    return;
  }

  if (this.selectedPrizes.length === 0) {
    alert('Por favor, selecciona al menos un premio para el bingo.');
    return;
  }

  // Upload image to Cloudinary
  let imageUrl: string | null = null;
  try {
    imageUrl = await this.fileUploadApi.uploadFile(this.selectedImageFile);
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    alert('Error al subir la imagen. Por favor, inténtalo de nuevo.');
    return;
  }

  // Get admin user UID
  const adminUser = this.authStore.userProfileSubject.value;
  if (!adminUser || adminUser.role !== 'admin') {
    alert('Solo los administradores pueden crear bingos.');
    return;
  }

  // Construct Bingo object
  const newBingo: Bingo = {
    name: this.bingo.titulo,
    date: new Date(`${this.bingo.fecha}T${this.bingo.hora}`),
    streamUrl: '', // Assuming this will be set later or is not required for creation
    status: 'upcoming', // Default status
    ongId: adminUser.uid, // Assuming admin user is also an ONG or we need to get ONG ID from admin profile
    imageUrl: imageUrl,
    price: this.bingo.precio,
    userLimit: this.bingo.limite,
    maxTables: this.bingo.max,
  };

  try {
    const bingoId = await this.firebaseService.createBingo(newBingo, this.selectedPrizes.map(p => ({
      id: p.id,
      name: p.title,
      description: p.type,
      value: p.value,
      donorId: p.donor.id,
    })));
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