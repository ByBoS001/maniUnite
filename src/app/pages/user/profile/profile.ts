import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthStore } from '../../../core/services/auth-store';
import { UserProfileApi } from '../../../core/services/user-profile-api';
import { UserProfile } from '../../../core/services/firebase.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html'
})
export class UserProfilePage implements OnInit, OnDestroy {
  edit = false;
  private authStore = inject(AuthStore);
  private userProfileApi = inject(UserProfileApi);
  private subscription: Subscription | undefined;

  model: Partial<UserProfile> & { 
    telefono?: string;
    ciudad?: string;
    pais?: string;
    ultimoAcceso?: string;
    miembroDesde?: string;
  } = {};

  draft: Partial<typeof this.model> = {};

  ngOnInit() {
    this.subscription = this.authStore.userProfile$.subscribe(userProfile => {
      console.log('UserProfilePage received userProfile:', userProfile);
      if (userProfile) {
        this.model = {
          ...userProfile,
          miembroDesde: userProfile.createdAt 
            ? new Date(userProfile.createdAt).toLocaleDateString() 
            : 'Fecha no disponible',
          telefono: '+593 99 123 4567',
          ciudad: 'Quito',
          pais: 'Ecuador',
          ultimoAcceso: 'hace 2 días',
        };
        this.draft = structuredClone(this.model);
      } else {
        // This can happen on logout, so we don't log an error anymore.
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  startEdit() {
    this.draft = structuredClone(this.model);
    this.edit = true;
  }

  cancel() {
    this.edit = false;
  }

  async save() {
    if (!this.model.uid) {
      console.error('User ID is missing, cannot save profile');
      return;
    }
    try {
      await this.userProfileApi.updateUserProfile(this.model.uid, this.draft);
      this.model = structuredClone(this.draft);
      this.edit = false;
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }
}