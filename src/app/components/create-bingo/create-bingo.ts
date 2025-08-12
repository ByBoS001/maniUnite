import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-bingo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-bingo.html',
  styleUrls: ['./create-bingo.scss']
})
export class CreateBingo {
@Output() close = new EventEmitter<void>();

showPreview = false;

bingo = {
  titulo: '',
  descripcion: '',
  fecha: '',
  hora: '',
  precio: 45,
  limite: 2,
  max: 500,
};

prizes = [
  {
    id: 'p1',
    title: 'Tablet Samsung Galaxy',
    value: 300,
    type: 'Producto',
    donor: { id: 'o1', name: 'Fundación Educa Más', desc: 'Educación y oportunidades' },
    selected: false,
  },
  {
    id: 'p2',
    title: 'Bono de Compras $150',
    value: 150,
    type: 'Voucher',
    donor: { id: 'o2', name: 'Hospital San Juan', desc: 'Atención médica gratuita para familias de bajos recursos' },
    selected: false,
  },
  {
    id: 'p3',
    title: 'Cesta de Productos',
    value: 80,
    type: 'Canasta',
    donor: { id: 'o3', name: 'Comedores Unidos', desc: 'Alimentación solidaria para comunidades necesitadas' },
    selected: false,
  },
  {
    id: 'p4',
    title: 'Auriculares Bluetooth',
    value: 120,
    type: 'Producto',
    donor: { id: 'o1', name: 'Fundación Educa Más', desc: 'Educación y oportunidades' },
    selected: false,
  },
];

get selectedPrizes() {
  return this.prizes.filter(p => p.selected);
}

get associatedNGOs() {
  const map = new Map<string, { id: string; name: string; desc: string; count: number }>();
  this.selectedPrizes.forEach(p => {
    const d = p.donor;
    if (!map.has(d.id)) map.set(d.id, { id: d.id, name: d.name, desc: d.desc, count: 0 });
    map.get(d.id)!.count++;
  });
  return Array.from(map.values());
}

togglePrize(id: string) {
  const p = this.prizes.find(x => x.id === id);
  if (p) p.selected = !p.selected;
}

togglePreview() {
  this.showPreview = !this.showPreview;
}

cerrar() {
  this.close.emit();
}
}