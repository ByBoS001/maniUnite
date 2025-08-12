import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrivateHeader } from '../../components/private-header/private-header';
import { PrivateSidebar } from '../../components/private-sidebar/private-sidebar';
@Component({
  selector: 'app-private-layout',
  imports: [PrivateHeader, PrivateSidebar,RouterOutlet],
  template: `
    <div class="h-screen flex">
      <app-private-sidebar [role]="role"></app-private-sidebar>
      <div class="flex-1 flex flex-col h-screen overflow-hidden">
        <app-private-header></app-private-header>
        <main class="p-6 flex-1 overflow-auto">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
})
export class PrivateLayout {
  // TODO: set this from your auth store/session
  role: 'admin' | 'ong' | 'user' = 'ong';
}
