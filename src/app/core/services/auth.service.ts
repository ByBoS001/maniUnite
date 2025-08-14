import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { UserProfile } from './firebase.service'; // Reutilizamos la interfaz

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  // Observable para escuchar el estado de autenticación
  authState$ = new Observable<User | null>(subscriber => {
    const unsubscribe = onAuthStateChanged(this.auth, user => {
      subscriber.next(user);
    });
    return unsubscribe; // Se desuscribe cuando el observable es completado
  });

  constructor() { }

  // --- Auth Operations ---

  login(credentials: { email: string, pass: string }) {
    return from(signInWithEmailAndPassword(this.auth, credentials.email, credentials.pass));
  }

  logout() {
    return from(signOut(this.auth));
  }

  // --- User Profile Operations ---

  // Obtener el perfil de usuario de Firestore usando el UID de Auth
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  }
}
