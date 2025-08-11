import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrivateHeader } from '../../components/private-header/private-header';
import { PrivateSidebar } from '../../components/private-sidebar/private-sidebar';
@Component({
  selector: 'app-private-layout',
  imports: [PrivateHeader, PrivateSidebar,RouterOutlet],
  template: `
    <div class="min-h-screen flex">
      <app-private-sidebar [role]="role"></app-private-sidebar>
      <div class="flex-1 flex flex-col">
        <app-private-header></app-private-header>
        <main class="p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
})
export class PrivateLayout {
  // TODO: set this from your auth store/session
  role: 'admin' | 'ong' | 'user' = 'user';
}
