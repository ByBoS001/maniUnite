import { Injectable, inject, NgZone } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, query, orderBy } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

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

  getDonations(): Observable<any[]> {
    const donationsCollection = collection(this.firestore, 'donations');
    const q = query(donationsCollection);
    return from(this.ngZone.run(() => getDocs(q).then(snapshot => snapshot.docs.map(doc => {
      const data = doc.data();
      if (data['description']) {
        return { id: doc.id, ...data, isPrizeDonation: true };
      } else {
        return { id: doc.id, ...data };
      }
    }))));
  }
}
