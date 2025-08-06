import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
})
export class LoginPage {
  email = '';
  password = '';
  remember = false;
  showPassword = false;

  login() {
    console.log('Iniciar sesión con:', this.email, this.password);
    
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}