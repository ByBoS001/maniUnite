import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Tab = 'resumen' | 'financiero' | 'eventos';

@Component({
  standalone: true,
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.html',
})
export class Reports {
  tab: Tab = 'resumen';

  // Demo data
  kpis = {
    ingresosMes: 24580,
    usuariosActivos: 3247,
    bingos: 42,
    crecimiento: 18,
  };

  topBingos = [
    { nombre: 'Bingo Benéfico Hospital', participantes: 245, monto: 1850 },
    { nombre: 'Super Bingo Nocturno', participantes: 189, monto: 1200 },
    { nombre: 'Bingo Educativo', participantes: 156, monto: 980 },
    { nombre: 'Bingo Comunitario', participantes: 134, monto: 750 },
  ];

  financiero = {
    brutos: 28450,
    premios: 12300,
    comisiones: 3200,
    netos: 12950,
    metodos: [
      { nombre: 'Tarjeta de crédito', monto: 18492, fill: 70 },
      { nombre: 'Transferencia bancaria', monto: 7112, fill: 45 },
      { nombre: 'Billetera digital', monto: 2846, fill: 90 },
    ],
    ongs: [
      { nombre: 'Hospital San Juan', monto: 5240, fill: 72 },
      { nombre: 'Fundación Esperanza', monto: 3180, fill: 48 },
      { nombre: 'Centro Comunitario', monto: 2520, fill: 36 },
      { nombre: 'Fundación Aprende', monto: 1960, fill: 28 },
    ],
  };

  eventos = [
    {
      evento: 'Bingo Benéfico Hospital',
      fecha: '10/08/2025',
      participantes: 245,
      ingresos: 1850,
      rating: 4.8,
    },
    {
      evento: 'Super Bingo Nocturno',
      fecha: '09/08/2025',
      participantes: 189,
      ingresos: 1200,
      rating: 4.6,
    },
    {
      evento: 'Bingo Educativo',
      fecha: '08/08/2025',
      participantes: 156,
      ingresos: 980,
      rating: 4.7,
    },
    {
      evento: 'Bingo Comunitario',
      fecha: '07/08/2025',
      participantes: 134,
      ingresos: 750,
      rating: 4.5,
    },
  ];

  setTab(t: Tab) {
    this.tab = t;
  }
  format(n: number) {
    return n.toLocaleString('en-US');
  }
}
