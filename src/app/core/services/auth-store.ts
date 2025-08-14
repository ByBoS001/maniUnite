import { Injectable, inject, NgZone } from '@angular/core';
import { Auth, user, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { UserProfile } from './firebase.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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

  get userRole(): 'individual' | 'ong' | null {
    return this.userProfileSubject.value?.role || null;
  }

  createUser(email: string, password: string): Promise<any> {
    return this.ngZone.run(() => createUserWithEmailAndPassword(this.auth, email, password));
  }

  async login(email: string, password: string): Promise<UserProfile | null> {
    console.log(`[AuthStore] Attempting to log in with email: ${email}`);
    try {
      const userCredential = await this.ngZone.run(() => 
        signInWithEmailAndPassword(this.auth, email, password)
      );

      if (!userCredential || !userCredential.user) {
        console.error('[AuthStore] Login failed: No user credential returned from Firebase.');
        this.userProfileSubject.next(null);
        return null;
      }

      const uid = userCredential.user.uid;
      console.log(`[AuthStore] Login successful. User UID: ${uid}`);

      const userRef = doc(this.firestore, `users/${uid}`);
      console.log(`[AuthStore] Fetching user profile from Firestore at path: ${userRef.path}`);
      
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userProfile = userSnap.data() as UserProfile;
        console.log('[AuthStore] User profile found:', userProfile);
        this.userProfileSubject.next(userProfile);
        return userProfile;
      } else {
        console.error(`[AuthStore] User profile not found in Firestore for UID: ${uid}`);
        this.userProfileSubject.next(null);
        return null;
      }
    } catch (error) {
      console.error('[AuthStore] An error occurred during the login process:', error);
      this.userProfileSubject.next(null);
      return null;
    }
  }

  async logout() {
    this.userProfileSubject.next(null);
    await signOut(this.auth);
    this.ngZone.run(() => {
      this.router.navigate(['/iniciosesion']);
    });
  }
}
