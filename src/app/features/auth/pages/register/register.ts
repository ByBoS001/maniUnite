import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthStore } from '../../../../core/services/auth-store';
import { UserProfileApi } from '../../../../core/services/user-profile-api';
import { OngProfileApi } from '../../../../core/services/ong-profile-api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  private authStore = inject(AuthStore);
  private router = inject(Router);
  private userProfileApi = inject(UserProfileApi);
  private ongProfileApi = inject(OngProfileApi);

  accountType: 'user' | 'ong' = 'user';

  user = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  ong = {
    organizationName: '',
    legalRepresentative: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    description: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    document: null as File | null,
  };

  showPassword = false;
  showConfirmPassword = false;
  loading = false;

  handleFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.ong.document = input.files[0];
    }
  }

  toggleAccountType(type: 'user' | 'ong') {
    this.accountType = type;
  }

  async submitForm() {
    this.loading = true;
    const email = this.accountType === 'user' ? this.user.email : this.ong.email;
    const password = this.accountType === 'user' ? this.user.password : this.ong.password;

    try {
      const userCredential = await this.authStore.createUser(email, password);
      const userId = userCredential.user.uid;

      if (this.accountType === 'user') {
        await this.userProfileApi.createUserProfile(userId, { 
          fullName: this.user.fullName, 
          email: this.user.email, 
          phone: this.user.phone, 
          role: 'user' 
        });
      } else {
        await this.ongProfileApi.createOngProfile(userId, { ...this.ong, document: null });
      }

      this.router.navigate(['/']); // Redirect to home page after successful registration
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error (e.g., show an error message to the user)
    } finally {
      this.loading = false;
    }
  }
}
