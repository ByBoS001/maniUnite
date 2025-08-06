import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserProfileApi {
  private firestore: Firestore = inject(Firestore);

  createUserProfile(userId: string, data: any) {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    return setDoc(userDocRef, data);
  }
}
