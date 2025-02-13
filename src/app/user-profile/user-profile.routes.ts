import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user-profile.page').then((m) => m.UserProfilePage),
  },
  {
    path: ':uuid',
    loadComponent: () => import('./user-profile.page').then((m) => m.UserProfilePage),
  },
];
