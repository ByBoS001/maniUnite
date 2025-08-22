import { Component, HostListener, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationsApi } from '../../core/services/donations-api';
import { AuthStore } from '../../core/services/auth-store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-bingo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bingo.html',
  styleUrl: './bingo.scss',
})
export class Bingo implements OnInit {
  private donationsApi = inject(DonationsApi);
  private authStore = inject(AuthStore);

  isLoggedIn$: Observable<boolean> = this.authStore.userProfile$.pipe(map(user => !!user));

  donations = signal<any[]>([]);

  ngOnInit() {
    this.loadDonations();
  }

  loadDonations() {
    this.donationsApi.getDonations().subscribe({
      next: (data) => this.donations.set(data),
      error: (err) => console.error('Error fetching donations:', err)
    });
  }
}
