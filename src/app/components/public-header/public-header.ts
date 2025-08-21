import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../core/services/auth-store';

@Component({
  selector: 'app-public-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
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
        <div class="hidden md:flex items-center gap-4">
          <ng-container *ngIf="authStore.userProfile$ | async as user; else loggedOut">
            <div class="text-sm text-right">
              <p class="text-gray-800 font-medium">{{ user.name || 'Usuario' }}</p>
              <p class="text-gray-500 text-xs">{{ user.email }}</p>
            </div>
            <div
              class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-semibold"
            >
              {{ user.email ? user.email[0].toUpperCase() : 'U' }}
            </div>
            <button (click)="logout()" title="Cerrar Sesión" class="p-2 rounded-full hover:bg-gray-100">
              <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </ng-container>
          <ng-template #loggedOut>
            <a
              routerLink="/iniciosesion"
              class="bg-accent text-white px-4 py-2 rounded text-sm font-medium hover:bg-highlight transition"
            >
              Acceder / Registrarse
            </a>
          </ng-template>
        </div>

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
          <ng-container *ngIf="authStore.userProfile$ | async as user; else loggedOutMobile">
            <div class="flex items-center gap-3 p-2 rounded hover:bg-overlay">
              <div
                class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-semibold"
              >
                {{ user.email ? user.email[0].toUpperCase() : 'U' }}
              </div>
              <div class="text-sm">
                <p class="text-gray-800 font-medium">{{ user.name || 'Usuario' }}</p>
                <p class="text-gray-500 text-xs">{{ user.email }}</p>
              </div>
            </div>
            <a (click)="logout()" class="py-2 px-3 rounded text-white bg-accent text-center hover:bg-highlight">
              Cerrar Sesión
            </a>
          </ng-container>
          <ng-template #loggedOutMobile>
            <a
              routerLink="/iniciosesion"
              class="py-2 px-3 rounded text-white bg-accent text-center hover:bg-highlight"
            >
              Acceder / Registrarse
            </a>
          </ng-template>
        </nav>
      </div>
      }
    </header>
  `,
})
export class PublicHeaderComponent {
  authStore = inject(AuthStore);
  open = false;
  navLinks = [
    { path: '/', label: 'Inicio', exact: true },
    { path: '/bingo', label: 'Bingo', exact: true },
    { path: '/donaciones', label: 'Donaciones' },
    { path: '/comprar', label: 'Comprar' },
    { path: '/transparencia', label: 'Transparencia' },
  ];

  logout() {
    this.authStore.logout();
  }
}
