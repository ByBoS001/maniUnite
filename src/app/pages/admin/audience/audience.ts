import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Tab = 'resumen' | 'activos' | 'engagement' | 'analisis';

@Component({
  standalone: true,
  selector: 'app-audience',
  imports: [CommonModule],
  templateUrl: './audience.html',
})
export class Audience {
  tab: Tab = 'resumen';

  // KPIs demo
  kpis = {
    registrados: 3247,
    activos: 1247,
    online: 456,
    growth: 18,
  };

  // Resumen – usuarios por región
  regiones = [
    { nombre: 'Buenos Aires', valor: 1240 },
    { nombre: 'Córdoba', valor: 680 },
    { nombre: 'Santa Fe', valor: 520 },
    { nombre: 'Mendoza', valor: 420 },
    { nombre: 'Otras provincias', valor: 387 },
  ];

  // Activos – conectados ahora
  conectados = [
    { nombre: 'María González', estado: 'En bingo en Sala #1247', tiempo: '45:32' },
    { nombre: 'Carlos Rodríguez', estado: 'Navegando en Lobby', tiempo: '12:15' },
    { nombre: 'Ana López', estado: 'Chat activo en Sala #1247', tiempo: '28:40' },
    { nombre: 'Pedro Martín', estado: 'Comprando tabla en Tienda', tiempo: '03:22' },
    { nombre: 'Luis Fernández', estado: 'En bingo en Sala #1248', tiempo: '67:18' },
  ];

  // Engagement
  chatHoy = 12847;
  reacciones = { likes: 3241, hearts: 1847, comments: 967 };
  participacion = [
    { evento: 'Bingo Benéfico Hospital', mensajes: 847, reacciones: 234, compartidos: 45, rating: 4.8 },
    { evento: 'Super Bingo Nocturno', mensajes: 654, reacciones: 189, compartidos: 32, rating: 4.6 },
  ];

  // Análisis – retención
  retencion = [
    { label: 'Día 1', pct: 85 },
    { label: 'Día 7', pct: 62 },
    { label: 'Día 30', pct: 45 },
    { label: 'Día 90', pct: 28 },
  ];

  setTab(t: Tab) { this.tab = t; }
}