import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrizeEditor, PrizeForm } from '../../../components/prize-editor/prize-editor';
type Tab = 'activos' | 'otorgados' | 'pendientes' | 'config';

@Component({
  standalone: true,
  selector: 'app-prizes',
  imports: [CommonModule, FormsModule, PrizeEditor],
  templateUrl: './prizes.html',
})
export class Prizes {
  tab: Tab = 'activos';

  // Demo: tarjetas KPI
  kpis = { total: 12500, disponibles: 24, entregar: 8 };

  // Demo: premios activos
  activos = [
    {
      cat: 'Premio Mayor',
      tipo: 'Dinero',
      valor: 1500,
      eventos: 3,
      estado: 'Activo',
    },
    {
      cat: 'Electrodomésticos',
      tipo: 'Producto',
      valor: 800,
      eventos: 5,
      estado: 'Activo',
    },
    {
      cat: 'Vales de Compra',
      tipo: 'Vale',
      valor: 500,
      eventos: 8,
      estado: 'Activo',
    },
    {
      cat: 'Productos Hogar',
      tipo: 'Producto',
      valor: 300,
      eventos: 6,
      estado: 'Activo',
    },
    {
      cat: 'Tecnología',
      tipo: 'Producto',
      valor: 1200,
      eventos: 2,
      estado: 'Limitado',
    },
    {
      cat: 'Experiencias',
      tipo: 'Experiencia',
      valor: 600,
      eventos: 4,
      estado: 'Activo',
    },
  ];

  // Demo: otorgados
  otorgados = [
    {
      name: 'María González',
      premio: 'Premio Mayor - $1,500',
      evento: 'Bingo Benéfico Hospital',
      email: 'maria.gonzalez@email.com',
      fecha: '10/08/2025',
      estado: 'Entregado',
    },
    {
      name: 'Carlos Rodríguez',
      premio: 'Electrodoméstico - Microondas',
      evento: 'Super Bingo Nocturno',
      email: 'carlos.rodriguez@email.com',
      fecha: '09/08/2025',
      estado: 'En proceso',
    },
    {
      name: 'Ana López',
      premio: 'Vale de Compra - $500',
      evento: 'Bingo Educativo',
      email: 'ana.lopez@email.com',
      fecha: '08/08/2025',
      estado: 'Entregado',
    },
    {
      name: 'Pedro Martín',
      premio: 'Tablet Samsung',
      evento: 'Bingo Comunitario',
      email: 'pedro.martin@email.com',
      fecha: '07/08/2025',
      estado: 'Pendiente',
    },
  ];

  // Demo: pendientes
  pendientes = [
    {
      name: 'Luis Fernández',
      premio: 'Smartphone Galaxy',
      evento: 'Bingo Tecnológico',
      tel: '+54 11 1234-5678',
      dir: 'Av. Corrientes 1234, CABA',
      urg: 'Alta',
    },
    {
      name: 'Carmen Silva',
      premio: 'Experiencia Spa',
      evento: 'Bingo Relajación',
      tel: '+54 11 9876-5432',
      dir: 'San Martín 567, Quilmes',
      urg: 'Media',
    },
  ];

  // Demo: config
  config = {
    entregaAuto: false,
    notificar: true,
    min: 100,
    max: 5000,
    plantillaGanador: '',
    plantillaEntrega: '',
  };

  setTab(t: Tab) {
    this.tab = t;
  }
  money(n: number) {
    return `$${n.toLocaleString('en-US')}`;
  }
  // Modal state for create/edit
showModal = false;
editMode = false;
selectedIndex: number | null = null;

// Form model (matches PrizeEditor)
form: PrizeForm = {
  nombre: '',
  tipo: 'Dinero',
  estado: 'Activo',
  valor: 0,
  eventos: ''
};

openCreate() {
  this.editMode = false;
  this.selectedIndex = null;
  this.form = { nombre: '', tipo: 'Dinero', estado: 'Activo', valor: 0, eventos: '' };
  this.showModal = true;
}

openEdit(index: number) {
  const item = this.activos[index];
  if (!item) return;
  this.editMode = true;
  this.selectedIndex = index;
  this.form = {
    nombre: item.cat,
    tipo: item.tipo,
    estado: item.estado,
    valor: item.valor,
    eventos: String(item.eventos)
  };
  this.showModal = true;
}

savePrize(data: PrizeForm) {
  const payload = {
    cat: data.nombre?.trim() || 'Sin nombre',
    tipo: data.tipo,
    estado: data.estado,
    valor: Number(data.valor) || 0,
    eventos: Number(data.eventos) || 0,
  };

  if (this.editMode && this.selectedIndex !== null) {
    this.activos[this.selectedIndex] = { ...this.activos[this.selectedIndex], ...payload } as any;
  } else {
    this.activos.unshift(payload as any);
  }
  this.closeModal();
}

closeModal() {
  this.showModal = false;
  this.selectedIndex = null;
}
}
