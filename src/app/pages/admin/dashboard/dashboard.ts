import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBingo } from '../../../components/create-bingo/create-bingo';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, CreateBingo],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  showCreateBingo = false;
}
