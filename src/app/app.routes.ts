import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing').then((m) => m.LandingComponent),
    title: 'MchongoFasta | Marketplace ya Kazi na Wafanyakazi Tanzania',
  },
  {
    path: 'admin',
    loadComponent: () => import('./layout/component/app.layout').then((m) => m.AppLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/admin/admin').then((m) => m.AdminComponent),
        title: 'MchongoFasta Ops Console | Operations & Admin Dashboard',
      },
      {
        path: 'workers',
        loadComponent: () => import('./pages/admin/admin').then((m) => m.AdminComponent),
        title: 'Wafanyakazi & Vibarakashia | MchongoFasta Ops',
      },
      {
        path: 'jobs',
        loadComponent: () => import('./pages/admin/admin').then((m) => m.AdminComponent),
        title: 'Michongo & Kazi | MchongoFasta Ops',
      },
      {
        path: 'verifications',
        loadComponent: () => import('./pages/admin/admin').then((m) => m.AdminComponent),
        title: 'Uhakiki wa NIDA | MchongoFasta Ops',
      },
      {
        path: 'finances',
        loadComponent: () => import('./pages/admin/admin').then((m) => m.AdminComponent),
        title: 'Mapato & Kamisheni | MchongoFasta Ops',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
