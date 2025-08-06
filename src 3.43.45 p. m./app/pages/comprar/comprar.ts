import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  BingoCard,
  Bingo,
} from '../../features/bingos/components/bingo-card/bingo-card'; // Asegúrate de exportar Bingo también

@Component({
  selector: 'app-comprar',
  standalone: true,
  imports: [CommonModule, BingoCard],
  templateUrl: './comprar.html',
  styleUrl: './comprar.scss',
})
export class Comprar {
  private http = inject(HttpClient);
  bingos: Bingo[] = [];

  ngOnInit() {
    this.http.get<Bingo[]>('/assets/data/bingos.json').subscribe({
      next: (data) => {
        this.bingos = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar JSON de bingos:', err);
      },
    });
  }

  stats = [
    { value: '3', label: 'Bingos activos', color: 'text-green-500' },
    { value: '545', label: 'Tablas disponibles', color: 'text-blue-600' },
    { value: '$76,800', label: 'Total recaudado', color: 'text-yellow-500' },
    { value: '1', label: 'En vivo ahora', color: 'text-gray-900' },
  ];
}
