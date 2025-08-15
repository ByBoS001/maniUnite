import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from, tap } from 'rxjs';
import { UserProfile } from './firebase.service'; // Reutilizamos la interfaz

const AUTH_TOKEN_KEY = 'maniunite_auth_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  authState$ = new Observable<User | null>(subscriber => {
    const unsubscribe = onAuthStateChanged(this.auth, user => {
      subscriber.next(user);
    });
    return unsubscribe;
  });

  constructor() { }

  login(credentials: { email: string, pass: string }) {
    return from(signInWithEmailAndPassword(this.auth, credentials.email, credentials.pass)).pipe(
      tap(userCredential => {
        this.setAuthToken(userCredential.user.uid);
      })
    );
  }

  logout() {
    return from(signOut(this.auth)).pipe(
      tap(() => this.removeAuthToken())
    );
  }

  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  }

  // --- Token Management ---

  private setAuthToken(uid: string): void {
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 30);
    const tokenData = {
      uid,
      expiration: expiration.toISOString()
    };
    localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(tokenData));
  }

  getAuthToken(): { uid: string; expiration: string } | null {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return null;

    const tokenData = JSON.parse(token);
    const expirationDate = new Date(tokenData.expiration);

    if (expirationDate < new Date()) {
      this.removeAuthToken();
      return null;
    }

    return tokenData;
  }

  removeAuthToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}
