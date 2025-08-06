import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Bingo {
  id: number;
  title: string;
  organization: string;
  description: string;
  date: string;
  time: string;
  price: string;
  prizes: number;
  collected: number;
  goal: number;
  awards: string[];
  remainingTables: number;
  active: boolean;
}

@Component({
  selector: 'app-bingo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bingo-card.html',
  styleUrl: './bingo-card.scss',
})
export class BingoCard {
  @Input() bingo!: Bingo;
   @Input() maxTables: number = 5

  get progressPercent(): number {
    return (this.bingo.collected / this.bingo.goal) * 100;
  }

  get isActive(): boolean {
    return this.bingo.active;
  }
}
