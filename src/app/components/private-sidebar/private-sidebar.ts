import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

type Role = 'admin' | 'ong' | 'user';

interface NavItem {
  label: string;
  link: string;
}

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  admin: [
    { label: 'Dashboard', link: '/admin/dashboard' },
    { label: 'Stream', link: '/admin/stream' },
    { label: 'Bingos', link: '/admin/bingos' },
    { label: 'Reportes', link: '/admin/reportes' },
    { label: 'Premios', link: '/admin/premios' },
    { label: 'Audiencia', link: '/admin/audiencia' },
    { label: 'Configuración', link: '/admin/configuracion' },
  ],
  ong: [
    { label: 'Inicio / Resumen', link: '/ong/inicio' },
    { label: 'Mi perfil', link: '/ong/perfil' },
    { label: 'Mis reportes', link: '/ong/reportes' },
    { label: 'Premios donados', link: '/ong/premios' },
    { label: 'Configuración', link: '/ong/configuracion' },
  ],
  user: [
    { label: 'Perfil', link: '/user' },
    { label: 'Bingos Stream', link: '/user/bingo' },
    { label: 'Historial de Bingos', link: '/user/historial' },
    { label: 'Premios Ganados', link: '/user/premios' },
    
  ],
};

@Component({
  selector: 'app-private-sidebar',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  template: `
    <aside
      class="w-64 bg-white shadow-lg border-r border-gray-200 h-screen sticky top-0 overflow-y-auto flex flex-col"
    >
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-600 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-lg font-semibold text-gray-900">Panel ONG</h1>
            <p class="text-sm text-gray-500">ONG Bingo</p>
          </div>
        </div>
      </div>
      <div class="flex-1 p-4 space-y-2">
        <nav class="space-y-1">
          <a
            *ngFor="let item of menu"
            [routerLink]="item.link"
            routerLinkActive="bg-emerald-500 text-white"
            [routerLinkActiveOptions]="{ exact: true }"
            class="block px-4 py-2 rounded-lg hover:bg-indigo-100 text-gray-700"
          >
            {{ item.label }}
          </a>
        </nav>
      </div>
      <div class="p-4 border-t border-gray-200">
        <a
          href="#"
          class="block px-4 py-2 rounded-lg hover:bg-red-100 text-red-600"
          >Cerrar Sesión</a
        >
      </div>
    </aside>
  `,
})
export class PrivateSidebar {
  @Input() role: Role = 'admin';
  get menu(): NavItem[] {
    return NAV_BY_ROLE[this.role];
  }
}
