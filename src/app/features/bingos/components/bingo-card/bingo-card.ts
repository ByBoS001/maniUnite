import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bingo as FirebaseBingo } from '../../../../core/services/firebase.service';

export interface Bingo extends FirebaseBingo {
  // Add any additional properties needed by the BingoCard component
  // that are not in FirebaseBingo, or derive them.
  // For example, if you need 'title' and FirebaseBingo has 'name':
  // title: string;
  // organization: string;
  // collected: number;
  // goal: number;
  // remainingTables: number;
  // active: boolean;
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
  @Input() maxTables: number = 5;

  // Assuming 'name' from FirebaseBingo maps to 'title'
  // Assuming 'price' from FirebaseBingo is the price
  // Assuming 'maxTables' from FirebaseBingo is the total tables

  // These properties need to be derived or added to FirebaseBingo if they are truly needed
  // For now, I will make them optional or provide dummy values.
  get progressPercent(): number {
    // This needs 'collected' and 'goal' which are not in FirebaseBingo
    // For now, return a dummy value or handle gracefully.
    return 0; // Placeholder
  }

  get isActive(): boolean {
    // This needs 'active' property which is not in FirebaseBingo
    // For now, return a dummy value or handle gracefully.
    return this.bingo.status === 'live'; // Assuming 'status' can determine activeness
  }
}
