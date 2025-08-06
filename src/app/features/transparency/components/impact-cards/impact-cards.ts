import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface ImpactCard {
  label: string;
  labelColor: string;
  date: string;
  title: string;
  description: string;
  image: string;
}
@Component({
  selector: 'app-impact-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impact-cards.html',
  styleUrl: './impact-cards.scss',
})
export class ImpactCards {
  private http = inject(HttpClient);
  cards: ImpactCard[] = [];

  ngOnInit() {
    this.http.get<ImpactCard[]>('/assets/data/impact-cards.json').subscribe({
      next: (data) => (this.cards = data),
      error: (err) =>
        console.error('Error al cargar tarjetas de impacto:', err),
    });
  }
}
