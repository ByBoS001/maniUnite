import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-stream-select',
  imports: [CommonModule],
  templateUrl: './stream-select.html',
})
export class StreamSelect {
  private router = inject(Router);

  events = [
    {
      id: 'B005',
      title: 'Bingo Solidario Express',
      urgent: true,
      date: '10/8/2025',
      time: '18:30',
      startsIn: 'Inicia en 30 minutos',
      participants: 45,
      capacity: 80,
      prize: 200,
      beneficiary: 'Comedores Solidarios',
      fill: 56,
    },
    {
      id: 'B010',
      title: 'Bingo Benéfico - Hospital San Juan',
      urgent: false,
      date: '10/8/2025',
      time: '20:00',
      startsIn: 'Inicia en 2 horas',
      participants: 150,
      capacity: 200,
      prize: 500,
      beneficiary: 'Hospital San Juan',
      fill: 75,
    },
    {
      id: 'B020',
      title: 'Super Bingo Nocturno',
      urgent: false,
      date: '10/8/2025',
      time: '22:00',
      startsIn: 'Inicia en 4 horas',
      participants: 89,
      capacity: 150,
      prize: 300,
      beneficiary: 'Fundación Esperanza',
      fill: 59,
    },
  ];

  startStream(e: { id: string }) {
    // Navega al gestor del stream con el ID seleccionado
    this.router.navigate(['/admin/stream', e.id]);
  }
}