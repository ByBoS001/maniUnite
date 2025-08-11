import { Component } from '@angular/core';

@Component({
  selector: 'app-private-header',
  imports: [],
  template: `
    <header
      class="bg-white border-b border-gray-200 sticky top-0 z-10 px-6 py-4 shadow-sm"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-800">Panel</h2>
        <div class="flex items-center gap-4">
          <!-- Buscador -->
          <div class="relative">
            <input
              type="text"
              placeholder="Buscar..."
              class="pl-10 pr-4 py-2 border rounded-lg w-64 text-sm"
            />
            <svg
              class="w-4 h-4 absolute left-3 top-2.5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35M15 10a5 5 0 11-10 0 5 5 0 0110 0z"
              />
            </svg>
          </div>

          <!-- Notificación -->
          <button class="relative">
            <svg
              class="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 17h5l-1.405-1.405C18.79 15.21 18 14.11 18 13V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C8.67 6.165 8 7.388 8 9v4c0 1.11-.79 2.21-1.595 2.595L5 17h5m5 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span
              class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
            >
              3
            </span>
          </button>

          <!-- Avatar -->
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm"
            >
              A
            </div>
            <div class="text-sm">
              <p class="text-gray-800">Admin</p>
              <p class="text-gray-500 text-xs">admin@ongbingo.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class PrivateHeader {}
