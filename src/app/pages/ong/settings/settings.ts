import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-ong-settings',
  imports: [CommonModule],
  templateUrl: './settings.html',
})
export class OngSettingsPage {
  // Seguridad
  onChangePassword() {
    console.log('Cambiar contraseña');
  }
  onAddAdmins() {
    console.log('Agregar administradores');
  }

  // Notificaciones (signals para no usar ngModel)
  emailNotif = signal<boolean>(false);
  thanksNotif = signal<boolean>(false);

  // src/app/pages/ong/settings/settings.ts
  // ...
  toggleEmailNotif(value: boolean) {
    this.emailNotif.set(value); // antes: this.emailNotif = value;
  }

  toggleThanksNotif(value: boolean) {
    this.thanksNotif.set(value); // antes: this.thanksNotif = value;
  }
  // ...
  // Cuenta
  deactivate() {
    console.log('Desactivar perfil temporalmente');
  }
  deleteAccount() {
    console.log('Eliminar cuenta permanentemente');
  }
}
