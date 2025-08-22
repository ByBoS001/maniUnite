import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BingoCard } from '../../features/bingos/components/bingo-card/bingo-card';
import { FirebaseService, Bingo } from '../../core/services/firebase.service';

@Component({
  selector: 'app-comprar',
  standalone: true,
  imports: [CommonModule, BingoCard],
  templateUrl: './comprar.html',
  styleUrl: './comprar.scss',
})
export class Comprar implements OnInit {
  private firebaseService = inject(FirebaseService);
  
  bingos: Bingo[] = [];

  ngOnInit() {
    this.firebaseService.getBingosOrderedByDate().subscribe((bingos: Bingo[]) => {
      this.bingos = bingos;
      console.log('[Comprar] Bingos received and assigned:', this.bingos);
    });
  }

  stats = [
    { value: '3', label: 'Bingos activos', color: 'text-green-500' },
    { value: '545', label: 'Tablas disponibles', color: 'text-blue-600' },
    { value: '$76,800', label: 'Total recaudado', color: 'text-yellow-500' },
    { value: '1', label: 'En vivo ahora', color: 'text-gray-900' },
  ];
}
