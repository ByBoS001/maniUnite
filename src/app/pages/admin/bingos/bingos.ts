import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBingo } from '../../../components/create-bingo/create-bingo';
import { DonationsApi } from '../../../core/services/donations-api';

@Component({
  standalone: true,
  selector: 'app-bingos',
  imports: [CommonModule, CreateBingo],
  templateUrl: './bingos.html',
})
export class Bingos implements OnInit {
  private donationsApi = inject(DonationsApi);
  donations = signal<any[]>([]);

  showCreate = false;

  ngOnInit() {
    this.loadDonations();
  }

  loadDonations() {
    this.donationsApi.getDonations().subscribe({
      next: (data) => {
        console.log('Donations loaded in bingos component:', data);
        this.donations.set(data);
      },
      error: (err) => console.error('Error fetching donations:', err)
    });
  }

  openCreate()  { this.showCreate = true; }
  closeCreate() { this.showCreate = false; }
}
