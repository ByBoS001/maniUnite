import { Injectable, inject, NgZone } from '@angular/core';
import { Auth, user, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { UserProfile } from './firebase.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

const AUTH_TOKEN_KEY = 'maniunite_auth_token';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private ngZone: NgZone = inject(NgZone);
  private router: Router = inject(Router);
  
  readonly user$ = user(this.auth);
  
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);
  userProfile$ = this.userProfileSubject.asObservable();

  constructor() {
    this.checkToken();
  }

  get userRole(): 'individual' | 'ong' | 'admin' | null {
    return this.userProfileSubject.value?.role || null;
  }

  createUser(email: string, password: string): Promise<any> {
    return this.ngZone.run(() => createUserWithEmailAndPassword(this.auth, email, password));
  }

  async login(email: string, password: string): Promise<UserProfile | null> {
    try {
      const userCredential = await this.ngZone.run(() => 
        signInWithEmailAndPassword(this.auth, email, password)
      );

      if (!userCredential || !userCredential.user) {
        this.userProfileSubject.next(null);
        return null;
      }

      const uid = userCredential.user.uid;
      const userProfile = await this.fetchAndSetUserProfile(uid);
      
      if (userProfile) {
        this.setAuthToken(uid);
      }

      return userProfile;
    } catch (error) {
      console.error('[AuthStore] An error occurred during the login process:', error);
      this.userProfileSubject.next(null);
      return null;
    }
  }

  async logout() {
    this.userProfileSubject.next(null);
    this.removeAuthToken();
    await signOut(this.auth);
    this.ngZone.run(() => {
      this.router.navigate(['/iniciosesion']);
    });
  }

  private async fetchAndSetUserProfile(uid: string): Promise<UserProfile | null> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userProfile = userSnap.data() as UserProfile;
      this.userProfileSubject.next(userProfile);
      return userProfile;
    } else {
      this.userProfileSubject.next(null);
      return null;
    }
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

  private removeAuthToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }

  private checkToken(): void {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return;

    const tokenData = JSON.parse(token);
    const expirationDate = new Date(tokenData.expiration);

    if (expirationDate < new Date()) {
      this.removeAuthToken();
    } else {
      this.fetchAndSetUserProfile(tokenData.uid);
    }
  }
}
