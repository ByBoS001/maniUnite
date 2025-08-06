import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicHeaderComponent } from '../../components/public-header/public-header';
import { PublicFooterComponent } from '../../components/public-footer/public-footer';
@Component({
  standalone: true,
  selector: 'app-public-layout',
  imports: [PublicHeaderComponent, RouterOutlet, PublicFooterComponent],
  template: `
    <app-public-header />
    <main >
      <router-outlet></router-outlet>
    </main>
    <app-public-footer />
  `,
})
export class PublicLayout {}
