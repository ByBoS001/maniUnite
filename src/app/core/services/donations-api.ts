import { Injectable, inject, NgZone } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DonationsApi {
  private firestore: Firestore = inject(Firestore);
  private ngZone: NgZone = inject(NgZone);

  createDonation(donation: any) {
    const donationsCollection = collection(this.firestore, 'donations');
    return this.ngZone.run(() => addDoc(donationsCollection, donation));
  }
}
