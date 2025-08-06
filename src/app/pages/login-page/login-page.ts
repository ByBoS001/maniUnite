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

  async login() {
    try {
      await this.authStore.login(this.email, this.password);
      this.router.navigate(['/']); // Redirect to home page after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error (e.g., show an error message to the user)
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
