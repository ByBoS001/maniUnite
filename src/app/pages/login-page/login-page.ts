import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthStore } from '../../core/services/auth-store';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
})
export class LoginPage {
  private authStore = inject(AuthStore);
  private router = inject(Router);

  email = '';
  password = '';
  remember = false;
  showPassword = false;
  loginError: string | null = null;

  async login() {
    this.loginError = null; // Reset error message on new attempt
    try {
      const userProfile = await this.authStore.login(this.email, this.password);

      if (userProfile) {
        // Redirección basada en el rol del usuario
        if (userProfile.role === 'ong') {
          this.router.navigate(['/ong']);
        } else if (userProfile.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          // Para cualquier otro caso (incluido 'individual'), redirigir a /user
          this.router.navigate(['/user']);
        }
      } else {
        // El login falló o el perfil no existe
        this.loginError = 'El correo o la contraseña son incorrectos.';
        console.error('Login failed or user profile not found.');
      }
    } catch (error) {
      this.loginError = 'El correo o la contraseña son incorrectos.';
      console.error('Error logging in:', error);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
