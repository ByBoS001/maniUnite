import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseModalComponent } from '../../components/purchase-modal/purchase-modal';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService, Bingo } from '../../core/services/firebase.service';
import { Observable, firstValueFrom } from 'rxjs';
import { AuthStore } from '../../core/services/auth-store';
import { AlertModalComponent } from '../../shared/components/alert-modal/alert-modal';

type PaymentMethod = 'transfer' | 'card';

@Component({
  selector: 'app-bingo-detail',
  imports: [CommonModule, PurchaseModalComponent, AlertModalComponent],
  templateUrl: './bingo-detail.html',
  styleUrl: './bingo-detail.scss',
})
export class BingoDetail implements OnInit {
  selectedTables = signal(1);
  showPurchase = signal(false);
  showAlert = signal(false);
  alertMessage = signal('');

  bingo: Bingo | undefined;

  private route = inject(ActivatedRoute);
  private firebaseService = inject(FirebaseService);
  private authStore = inject(AuthStore);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.firebaseService.getBingoById(id).subscribe(bingo => {
          this.bingo = bingo;
          console.log('Fetched Bingo:', this.bingo);
        });
      }
    });
  }

  decrement() {
    if (this.selectedTables() > 1) {
      this.selectedTables.update(val => val - 1);
    }
  }

  increment() {
    this.selectedTables.update(val => val + 1);
  }

  async openPurchase() {
    const user = await firstValueFrom(this.authStore.userProfile$);
    if (!user || !user.uid) {
      this.alertMessage.set('Debes iniciar sesión para comprar una tabla.');
      this.showAlert.set(true);
      return;
    }
    this.showPurchase.set(true);
  }

  onPurchaseCompleted(event: { method: PaymentMethod, payload: any }) {
    this.showPurchase.set(false);
    console.log('Purchase completed event:', event);
    // You can add more sophisticated logic here based on the event.method and event.payload
    // For now, we'll assume success if the event is emitted.
    this.alertMessage.set('¡Compra realizada con éxito!');
    this.showAlert.set(true);
  }
}
