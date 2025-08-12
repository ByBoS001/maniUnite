import { Component, signal } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterLink } from '@angular/router';

type EventStatus = 'Finalizado' | 'Activo';

interface OngEventReport {
  id: string;
  name: string;
  date: string;            // dd/mm/aaaa
  prizes: number;
  tables: number;          // tablas vendidas
  amount: string;          // $1125.00
  participants: number;    // 450
  effectiveness: string;   // "90.0%"
  status: EventStatus;
  hasVideo?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-ong-reports',
  imports: [CommonModule , RouterLink],
  templateUrl: './reports.html'
})
export class OngReportsPage {
  // Lista mock; puedes reemplazar por datos de API cuando los tengas
  readonly reports = signal<OngEventReport[]>([
    {
      id: 'b-2025-01',
      name: 'Bingo por la Educación 2025',
      date: '14/1/2025',
      prizes: 3,
      tables: 450,
      amount: '$1125.00',
      participants: 450,
      effectiveness: '90.0%',
      status: 'Finalizado',
      hasVideo: true
    },
    {
      id: 'b-2024-12',
      name: 'Bingo Solidario Navidad',
      date: '19/12/2024',
      prizes: 2,
      tables: 320,
      amount: '$800.00',
      participants: 320,
      effectiveness: '64.0%',
      status: 'Finalizado'
    },
    {
      id: 'b-2025-02',
      name: 'Bingo Comunitario Febrero',
      date: '9/2/2025',
      prizes: 4,
      tables: 0,
      amount: '$0.00',
      participants: 0,
      effectiveness: '—',
      status: 'Activo'
    }
  ]);

  // Placeholder para el filtro por fecha
  openDateFilter() {
    // aquí lanzarías un date-range picker o un modal
    console.log('Abrir filtro por fecha');
  }

  trackById = (_: number, r: OngEventReport) => r.id;
}