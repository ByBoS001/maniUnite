import { Component, HostListener, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoStream } from '../../shared/components/video-stream/video-stream';
import { LiveChat } from '../../shared/components/live-chat/live-chat';
import { BingoCards } from '../../shared/components/bingo-cards/bingo-cards';
import { DonationsApi } from '../../core/services/donations-api';

@Component({
  selector: 'app-bingo',
  standalone: true,
  imports: [CommonModule, VideoStream,LiveChat, BingoCards],
  templateUrl: './bingo.html',
  styleUrl: './bingo.scss',
})
export class Bingo implements OnInit {
  private donationsApi = inject(DonationsApi);
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
