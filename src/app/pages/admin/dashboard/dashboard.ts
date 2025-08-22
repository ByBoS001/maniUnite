import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBingo } from '../../../components/create-bingo/create-bingo';
import { DonationsApi } from '../../../core/services/donations-api';
import { signal } from '@angular/core';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, CreateBingo],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private donationsApi = inject(DonationsApi);

  showCreateBingo = false;
  donations = signal<any[]>([]);

  ngOnInit() {
    this.donationsApi.getDonations().subscribe({
      next: (data) => this.donations.set(data),
      error: (err) => console.error('Error fetching donations:', err)
    });
  }
}
