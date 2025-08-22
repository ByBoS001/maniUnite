import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Bingo as FirebaseBingo, FirebaseService } from '../../../../core/services/firebase.service';
import { AuthStore } from '../../../../core/services/auth-store';
import { firstValueFrom } from 'rxjs';
import { PurchaseModalComponent } from '../../../../components/purchase-modal/purchase-modal';

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

type PaymentMethod = 'transfer' | 'card'; // Define PaymentMethod here

@Component({
  selector: 'app-bingo-card',
  standalone: true,
  imports: [CommonModule, RouterModule, PurchaseModalComponent],
  templateUrl: './bingo-card.html',
  styleUrl: './bingo-card.scss',
})
export class BingoCard {
  @Input() bingo!: Bingo;
  @Input() maxTables: number = 5;

  showPurchase = signal(false); // Added showPurchase signal

  private authStore = inject(AuthStore);
  private firebaseService = inject(FirebaseService);

  get progressPercent(): number {
    return 0;
  }

  get isActive(): boolean {
    return this.bingo.status === 'live';
  }

  async buyCard() {
    const user = await firstValueFrom(this.authStore.userProfile$);
    if (!user || !user.uid) {
      alert('Debes iniciar sesión para comprar una tabla.');
      return;
    }

    if (!this.bingo.id) {
      alert('Error: ID del bingo no disponible.');
      return;
    }

    this.showPurchase.set(true); // Open the purchase modal
  }

  onPurchaseCompleted(event: { method: PaymentMethod, payload: any }) {
    this.showPurchase.set(false); // Close the modal
    console.log('Purchase completed event:', event);
    // Here you would typically integrate with your backend to process the payment
    // For now, we'll just show an alert
    alert('¡Tabla comprada con éxito!');
    // You might want to update the bingo data or user's purchased cards here
  }
}
