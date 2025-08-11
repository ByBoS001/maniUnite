import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HistoryItem {
  titulo: string;
  estado: 'ganó' | 'participó' | 'no_gano';
  fecha: string;
  ong: string;
  tabla: string;
  premio?: string;
}

@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.html'
})
export class UserHistoryPage {
  items: HistoryItem[] = [
    {
      titulo: 'Bingo por la Educación 2025',
      estado: 'ganó',
      fecha: '14/1/2025',
      ong: 'Fundación Educa Más',
      tabla: 'T-4521',
      premio: 'Tablet Samsung Galaxy'
    },
    {
      titulo: 'Bingo Solidario Navidad',
      estado: 'participó',
      fecha: '19/12/2024',
      ong: 'Hospital San Juan',
      tabla: 'T-3012'
    },
    {
      titulo: 'Bingo Comunitario',
      estado: 'no_gano',
      fecha: '27/11/2024',
      ong: 'Comedores Unidos',
      tabla: 'T-1985'
    },
    {
      titulo: 'Bingo por la Salud',
      estado: 'ganó',
      fecha: '14/10/2024',
      ong: 'Hospital San Juan',
      tabla: 'T-2847',
      premio: 'Cesta de Productos'
    }
  ];

  badge(it: HistoryItem) {
    switch (it.estado) {
      case 'ganó':       return { text: 'Ganó',       cls: 'bg-emerald-100 text-emerald-700' };
      case 'participó':  return { text: 'Participó',  cls: 'bg-indigo-100 text-indigo-700' };
      default:           return { text: 'No ganó',    cls: 'bg-gray-100 text-gray-600' };
    }
  }
}