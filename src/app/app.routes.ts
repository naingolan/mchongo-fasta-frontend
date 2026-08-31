import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing';
import { AdminComponent } from './pages/admin/admin';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'MchongoFasta | Marketplace ya Kazi na Wafanyakazi Tanzania',
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'MchongoFasta Ops Console | Operations & Admin Dashboard',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
