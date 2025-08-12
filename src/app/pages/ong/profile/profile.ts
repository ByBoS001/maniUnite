import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type OrgProfile = {
  name: string;
  legalRep: string;
  email: string;         // no editable (ejemplo)
  phone: string;
  website: string;
  city: string;
  country: string;
  description: string;
  verified: boolean;
};

@Component({
  standalone: true,
  selector: 'app-ong-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html'
})
export class OngProfilePage {
  // modo edición
  editing = signal(false);

  // Perfil (mock por ahora)
  profile = signal<OrgProfile>({
    name: 'Fundación Educa Más',
    legalRep: 'María Isabel Rodríguez',
    email: 'ong@gmail.com',
    phone: '+593 99 876 5432',
    website: 'https://educamas.org',
    city: 'Quito',
    country: 'Ecuador',
    description:
      'Dedicada a la educación de niños en situación vulnerable, ...',
    verified: true
  });

  toggleEdit() {
    this.editing.update(v => !v);
  }

  // Simula guardado
  save() {
    // Aquí llamarías a tu API (service) y al terminar apagas edición.
    this.editing.set(false);
  }

  cancel() {
    // Si tuvieras un store/API, volverías a pedir el perfil original.
    this.editing.set(false);
  }
}