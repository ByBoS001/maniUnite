import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBingo } from '../../../components/create-bingo/create-bingo';

@Component({
  standalone: true,
  selector: 'app-bingos',
  imports: [CommonModule, CreateBingo],
  templateUrl: './bingos.html',
})
export class Bingos {
  showCreate = false;

  // demo data
  items = [
    {
      id: '1247',
      title: 'Bingo Benéfico - Hospital San Juan',
      participants: 150,
      prize: 500,
      progress: 82,
      status: 'En curso' as const,
    },
    {
      id: '1248',
      title: 'Super Bingo Nocturno',
      participants: 89,
      prize: 300,
      progress: 12,
      status: 'Esperando' as const,
    },
  ];

  openCreate()  { this.showCreate = true; }
  closeCreate() { this.showCreate = false; }
}