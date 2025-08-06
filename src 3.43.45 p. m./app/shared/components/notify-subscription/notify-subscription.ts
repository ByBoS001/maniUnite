import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notify-subscription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notify-subscription.html',
  styleUrl: './notify-subscription.scss',
})
export class NotifySubscription {
  email = '';

  onSubmit() {
    // Por ahora, solo muestra el email en consola
    console.log('📧 Email registrado:', this.email);
    alert('¡Te notificaremos del próximo bingo!');
    this.email = '';
  }
}
