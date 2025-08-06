import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface BingoEvent {
  label: string;
  title: string;
  org: string;
  date: string;
  prizes: string;
  registered: string;
  image: string;
}

@Component({
  selector: 'app-upcoming-bingos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upcoming-bingos.html',
  styleUrl: './upcoming-bingos.scss',
})
export class UpcomingBingos {
  private http = inject(HttpClient);
  bingos: BingoEvent[] = [];

  ngOnInit() {
    this.http.get<BingoEvent[]>('/assets/data/upcoming-bingos.json').subscribe({
      next: (data) => (this.bingos = data),
      error: (err) => console.error('Error al cargar próximos bingos', err),
    });
  }
}
