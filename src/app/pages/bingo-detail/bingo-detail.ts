import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseModalComponent } from '../../components/purchase-modal/purchase-modal';
@Component({
  selector: 'app-bingo-detail',
  imports: [CommonModule, PurchaseModalComponent],
  templateUrl: './bingo-detail.html',
  styleUrl: './bingo-detail.scss',
})
export class BingoDetail {
  selectedTables = signal(1);
  showPurchase = signal(false);

  decrement() {
    const v = this.selectedTables();
    if (v > 1) this.selectedTables.set(v - 1);
  }

  increment() {
    const v = this.selectedTables();
    if (v < 5) this.selectedTables.set(v + 1);
  }

  openPurchase() {
    this.showPurchase.set(true);
  }

  onPurchaseCompleted(e: any) {
    console.log('Compra enviada', e);
  }
}
