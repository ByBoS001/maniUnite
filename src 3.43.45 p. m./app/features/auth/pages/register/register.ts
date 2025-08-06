import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  accountType: 'user' | 'ong' = 'user';

  user = {
    fullName: '',
    email: '',
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

  submitForm() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      console.log(this.accountType === 'user' ? this.user : this.ong);
    }, 2000);
  }
}
