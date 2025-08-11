import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PrizeForm {
  nombre: string;
  tipo: string;
  estado: string;
  valor: number;
  eventos: string;
}

@Component({
  selector: 'app-prize-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prize-editor.html',
  styleUrls: ['./prize-editor.scss']
})
export class PrizeEditor {
  @Input() value: PrizeForm = {
    nombre: '',
    tipo: 'Dinero',
    estado: 'Activo',
    valor: 0,
    eventos: ''
  };
  @Input() editMode = false;
  @Output() save = new EventEmitter<PrizeForm>();
  @Output() close = new EventEmitter<void>();

  onSave() {
    this.save.emit(this.value);
  }

  onClose() {
    this.close.emit();
  }
}