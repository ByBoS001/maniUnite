import { Routes } from '@angular/router';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { PrivateLayout } from './layouts/private-layout/private-layout';
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
        path: 'informacion/:id',
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
        path: 'transparencia/:slug',
        loadComponent: () =>
          import('./pages/transparencia-info/transparencia-info').then(
            (m) => m.TransparenciaInfo
          ),
      },
      {
        path: 'iniciosesion',
        loadComponent: () =>
          import('./pages/login-page/login-page').then((m) => m.LoginPage),
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
  {
    path: 'admin',
    component: PrivateLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'stream',
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'select' },
          {
            path: 'select',
            loadComponent: () =>
              import('./pages/admin/stream-select/stream-select').then(
                (m) => m.StreamSelect
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./pages/admin/stream/stream').then((m) => m.Stream),
          },
        ],
      },
      {
        path: 'bingos',
        loadComponent: () =>
          import('./pages/admin/bingos/bingos').then((m) => m.Bingos),
      },
      {
        path: 'reportes',
        loadComponent: () =>
          import('./pages/admin/reports/reports').then((m) => m.Reports),
      },
      {
        path: 'premios',
        loadComponent: () =>
          import('./pages/admin/prizes/prizes').then((m) => m.Prizes),
      },
      {
        path: 'audiencia',
        loadComponent: () =>
          import('./pages/admin/audience/audience').then((m) => m.Audience),
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('./pages/admin/settings/settings').then((m) => m.Settings),
      },
    ],
  },
  {
    path: 'user',
    component: PrivateLayout,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/user/profile/profile').then((m) => m.UserProfilePage),
      },
      {
        path: 'bingo',
        loadComponent: () => import('./pages/bingo/bingo').then((m) => m.Bingo),
      },
      {
        path: 'historial',
        loadComponent: () =>
          import('./pages/user/history/history').then((m) => m.UserHistoryPage),
      },
      {
        path: 'premios',
        loadComponent: () =>
          import('./pages/user/prizes/prizes').then((m) => m.UserPrizesPage),
      },
    ],
  },
  {
    path: 'ong',
    component: PrivateLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'inicio' },
      {
        path: 'inicio',
        loadComponent: () =>
          import('./pages/ong/overview/overview').then(
            (m) => m.OngOverviewPage
          ),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./pages/ong/profile/profile').then((m) => m.OngProfilePage),
      },
      {
        path: 'reportes',
        loadComponent: () =>
          import('./pages/ong/reports/reports').then((m) => m.OngReportsPage),
      },
      {
        path: 'premios',
        loadComponent: () =>
          import('./pages/ong/prizes/prizes/prizes').then(
            (m) => m.OngPrizesPage
          ),
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('./pages/ong/settings/settings').then(
            (m) => m.OngSettingsPage
          ),
      },
    ],
  },
];
