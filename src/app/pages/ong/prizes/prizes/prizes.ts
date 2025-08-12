import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';


type PrizeStatus = 'Activo' | 'Usado' | 'Entregado';

interface DonatedPrize {
  id: string;
  title: string;
  type: 'producto' | 'vale' | 'experiencia';
  price: number;     // en USD
  qty: number;
  status: PrizeStatus;
  image: string;
  usedIn?: string;   // texto “Usado en: …” (opcional)
}

@Component({
  standalone: true,
  selector: 'app-ong-prizes',
  imports: [CommonModule],
  templateUrl: './prizes.html'
})
export class OngPrizesPage {
  // Datos mock para la UI
  readonly prizes = signal<DonatedPrize[]>([
    {
      id: 'p-1',
      title: 'Tablet Samsung Galaxy',
      type: 'producto',
      price: 300,
      qty: 1,
      status: 'Entregado',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
      usedIn: 'Bingo por la Educación 2025'
    },
    {
      id: 'p-2',
      title: 'Auriculares Bluetooth',
      type: 'producto',
      price: 120,
      qty: 2,
      status: 'Usado',
      image: 'https://images.unsplash.com/photo-1518443855757-8d3d3f1d1f7a?q=80&w=1200&auto=format&fit=crop',
      usedIn: 'Bingo Solidario Navidad'
    },
    {
      id: 'p-3',
      title: 'Kit de Útiles Escolares',
      type: 'producto',
      price: 50,
      qty: 5,
      status: 'Activo',
      image: 'https://images.unsplash.com/photo-1513477967668-2aaf11838bd0?q=80&w=1200&auto=format&fit=crop'
    }
  ]);

  // Acciones de UI (futuro: abrir modal de crear/editar)
  addPrize() { console.log('Agregar nuevo premio'); }
  editPrize(id: string) { console.log('Editar premio', id); }
}