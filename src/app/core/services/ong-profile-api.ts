import { Injectable, inject } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OngProfileApi {
  private firestore: Firestore = inject(Firestore);

  createOngProfile(ongId: string, data: any) {
    const ongDocRef = doc(this.firestore, `ongs/${ongId}`);
    return setDoc(ongDocRef, data);
  }
}
