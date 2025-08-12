import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type UserProfile = {
  email: string;
  nombre: string;
  telefono: string;
  ciudad: string;
  pais: string;
  ultimoAcceso: string;
  miembroDesde: string;
  avatar?: string;
};

@Component({
  standalone: true,
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html'
})
export class UserProfilePage {
  edit = false;

  // demo data — luego lo puedes hidratar desde tu store/api
  model: UserProfile = {
    email: 'usuario@gmail.com',
    nombre: 'María González',
    telefono: '+593 99 123 4567',
    ciudad: 'Quito',
    pais: 'Ecuador',
    ultimoAcceso: 'hace 2 días',
    miembroDesde: '2024',
  };

  // copia para edición
  draft: UserProfile = structuredClone(this.model);

  startEdit() {
    this.draft = structuredClone(this.model);
    this.edit = true;
  }

  cancel() {
    this.edit = false;
  }

  save() {
    // aquí podrías llamar a tu API/store
    this.model = structuredClone(this.draft);
    this.edit = false;
  }
}