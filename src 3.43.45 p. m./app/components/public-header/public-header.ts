import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="bg-white shadow px-4 py-3">
      <div class="mx-auto max-w-7xl flex items-center justify-between">
        <!-- Logo / Brand -->
        <a routerLink="/" class="flex items-center gap-2">
          <div
            class="bg-primary text-white font-bold rounded-full w-7 h-7 flex items-center justify-center"
          >
            B
          </div>
          <span class="text-lg font-semibold text-text">ONG Bingo</span>
        </a>

        <!-- Desktop nav -->
        <nav class="hidden md:flex gap-6 text-sm text-textSecondary">
          @for (link of navLinks; track link.path) {
          <a
            [routerLink]="link.path"
            routerLinkActive="text-primary border-b-2 border-primary"
            [routerLinkActiveOptions]="{ exact: link.exact || false }"
            class="hover:text-text"
          >
            {{ link.label }}
          </a>
          }
        </nav>

        <!-- CTA -->
        <a
          routerLink="/iniciosesion"
          class="hidden md:inline-block bg-accent text-white px-4 py-2 rounded text-sm font-medium hover:bg-highlight transition"
        >
          Acceder / Registrarse
        </a>

        <!-- Mobile menu button (optional) -->
        <button
          class="md:hidden p-2 rounded border border-gray-200"
          (click)="open = !open"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      <!-- Mobile menu -->
      @if (open) {
      <div class="md:hidden mt-3 px-2">
        <nav class="flex flex-col gap-2 text-sm text-textSecondary">
          @for (link of navLinks; track link.path) {
          <a
            [routerLink]="link.path"
            [routerLinkActiveOptions]="{ exact: link.exact || false }"
            routerLinkActive="bg-overlay text-primary"
            class="py-2 px-3 rounded hover:bg-overlay"
          >
            {{ link.label }}
          </a>
          }
          <a
            routerLink="/iniciosesion"
            class="py-2 px-3 rounded text-white bg-accent text-center hover:bg-highlight"
          >
            Acceder / Registrarse
          </a>
        </nav>
      </div>
      }
    </header>
  `,
})
export class PublicHeaderComponent {
  open = false;
  navLinks = [
    { path: '/', label: 'Inicio', exact: true },
    { path: '/bingo', label: 'Bingo', exact: true },
    { path: '/donaciones', label: 'Donaciones' },
    { path: '/comprar', label: 'Comprar' },
    { path: '/transparencia', label: 'Transparencia' },
  ];
}
