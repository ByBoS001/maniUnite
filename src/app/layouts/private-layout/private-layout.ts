import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicHeaderComponent } from '../../components/public-header/public-header';
import { PrivateSidebar } from '../../components/private-sidebar/private-sidebar';
import { AuthStore } from '../../core/services/auth-store';
import { Observable, map, filter } from 'rxjs';

type Role = 'admin' | 'ong' | 'user';

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [CommonModule, PublicHeaderComponent, PrivateSidebar, RouterOutlet],
  template: `
    <div class="h-screen flex" *ngIf="userRole$ | async as role; else loading">
      <!-- Pasamos el rol al sidebar -->
      <app-private-sidebar [role]="role"></app-private-sidebar>
      
      <div class="flex-1 flex flex-col h-screen overflow-hidden">
        <app-public-header></app-public-header>
        <main class="p-6 flex-1 overflow-auto">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
    <ng-template #loading>
      <div class="h-screen w-screen flex items-center justify-center">
        Cargando perfil...
      </div>
    </ng-template>
  `,
})
export class PrivateLayout {
  private authStore = inject(AuthStore);

  userRole$: Observable<Role> = this.authStore.userProfile$.pipe(
    filter(userProfile => userProfile !== null), // Wait until userProfile is not null
    map(userProfile => {
      if (userProfile!.role === 'individual') {
        return 'user';
      } else if (userProfile!.role === 'ong') {
        return 'ong';
      } else {
        return 'admin'; // Assuming any other role is admin for now
      }
    })
  );
}

