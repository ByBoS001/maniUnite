import { Injectable, inject, NgZone } from '@angular/core';
import { Auth, user, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private auth: Auth = inject(Auth);
  private ngZone: NgZone = inject(NgZone);
  readonly user$ = user(this.auth);

  createUser(email: string, password: string): Promise<any> {
    return this.ngZone.run(() => createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Promise<any> {
    return this.ngZone.run(() => signInWithEmailAndPassword(this.auth, email, password));
  }
}
