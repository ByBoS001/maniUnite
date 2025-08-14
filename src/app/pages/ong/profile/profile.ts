import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthStore } from '../../../core/services/auth-store';
import { Subscription } from 'rxjs';

type OrgProfile = {
  name: string;
  legalRep: string;
  email: string;
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
export class OngProfilePage implements OnInit, OnDestroy {
  private authStore = inject(AuthStore);
  private subscription: Subscription | undefined;

  editing = signal(false);
  profile = signal<Partial<OrgProfile>>({});

  ngOnInit() {
    this.subscription = this.authStore.userProfile$.subscribe(userProfile => {
      console.log('OngProfilePage received userProfile:', userProfile);
      if (userProfile) {
        this.profile.set({
          name: userProfile.name,
          email: userProfile.email,
          legalRep: 'María Isabel Rodríguez',
          phone: '+593 99 876 5432',
          website: 'https://educamas.org',
          city: 'Quito',
          country: 'Ecuador',
          description: 'Dedicada a la educación de niños en situación vulnerable, ...',
          verified: true
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  toggleEdit() {
    this.editing.update(v => !v);
  }

  save() {
    this.editing.set(false);
  }

  cancel() {
    this.editing.set(false);
  }
}