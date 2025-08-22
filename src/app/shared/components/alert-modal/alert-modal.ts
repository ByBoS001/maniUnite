import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (open) {
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50" (click)="close.emit()"></div>

        <!-- Modal -->
        <div class="relative z-10 w-full max-w-sm rounded-xl bg-white shadow-xl p-6">
          <div class="flex items-start justify-between">
            <h3 class="text-xl font-semibold">Alerta</h3>
            <button class="text-gray-500 hover:text-gray-700" (click)="close.emit()">
              &times;
            </button>
          </div>
          <div class="mt-4">
            <p>{{ message }}</p>
          </div>
          <div class="mt-6 flex justify-end">
            <button
              class="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              (click)="close.emit()"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './alert-modal.scss'
})
export class AlertModalComponent {
  @Input({ required: true }) open = false;
  @Input() message = '';
  @Output() close = new EventEmitter<void>();
}
