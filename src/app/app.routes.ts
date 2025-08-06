import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'bingo',
        loadComponent: () => import('./pages/bingo/bingo').then((m) => m.Bingo),
      },
      {
        path: 'donaciones',
        loadComponent: () =>
          import('./pages/donaciones/donaciones').then((m) => m.Donaciones),
      },
      {
        path: 'comprar',
        loadComponent: () =>
          import('./pages/comprar/comprar').then((m) => m.Comprar),
      },
      {
        path: 'informacion',
        loadComponent: () =>
          import('./pages/bingo-detail/bingo-detail').then(
            (m) => m.BingoDetail
          ),
      },
          {
        path: 'transparencia',
        loadComponent: () =>
          import('./pages/transparencia/transparencia').then(
            (m) => m.Transparencia
          ),
      },
        {
        path: 'transparenciaInfo',
        loadComponent: () =>
          import('./pages/transparencia-info/transparencia-info').then(
            (m) => m.TransparenciaInfo
          ),
      },
      {
        path: 'iniciosesion',
        loadComponent: () =>
          import('./pages/login-page/login-page').then(
            (m) => m.LoginPage
          ),
      },
      {
        path: 'registro',
        loadComponent: () =>
          import('./features/auth/pages/register/register').then(
            (m) => m.Register
          ),
      },
    ],
  },
];
