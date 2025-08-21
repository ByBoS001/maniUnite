import { Injectable, inject, NgZone } from '@angular/core';
import { Firestore, doc, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserProfileApi {
  private firestore: Firestore = inject(Firestore);
  private ngZone: NgZone = inject(NgZone);

  createUserProfile(userId: string, data: any) {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    return this.ngZone.run(() => setDoc(userDocRef, data));
  }

  updateUserProfile(userId: string, data: any) {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    return this.ngZone.run(() => updateDoc(userDocRef, data));
  }
}
