import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type StatCard = { icon: string; label: string; value: string; note?: string };
type Notice = {
  type: 'info' | 'warn' | 'success';
  title: string;
  detail: string;
};
type EventItem = {
  name: string;
  date: string;
  prizes: number;
  total: string;
  status: 'Finalizado' | 'En curso';
};

@Component({
  standalone: true,
  selector: 'app-ong-overview',
  imports: [CommonModule, RouterLink],
  templateUrl: './overview.html',
  styleUrls: ['./overview.scss'],
})
export class OngOverviewPage {
  // Tarjetas superiores
  stats = signal<StatCard[]>([
    { icon: '🎁', label: 'Premios activos', value: '1' },
    { icon: '📈', label: 'Bingos activos', value: '1' },
    { icon: '💵', label: 'Total recaudado', value: '$1925.00' },
    { icon: '💗', label: 'Mensajes pendientes', value: '2' },
  ]);

  // Notificaciones
  notices = signal<Notice[]>([
    {
      type: 'info',
      title: 'Tienes 1 premio disponible',
      detail:
        'Estos premios están listos para ser incluidos en próximos bingos.',
    },
    {
      type: 'warn',
      title: '2 mensajes de agradecimiento sin responder',
      detail:
        'Los ganadores han enviado mensajes de agradecimiento por sus premios.',
    },
  ]);

  // Eventos recientes
  events = signal<EventItem[]>([
    {
      name: 'Bingo por la Educación 2025',
      date: '14/1/2025',
      prizes: 3,
      total: '$1125.00 recaudados',
      status: 'Finalizado',
    },
    {
      name: 'Bingo Solidario Navidad',
      date: '19/12/2024',
      prizes: 2,
      total: '$800.00 recaudados',
      status: 'Finalizado',
    },
  ]);
}
