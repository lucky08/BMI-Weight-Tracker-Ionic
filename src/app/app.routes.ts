import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-profile',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: 'weight-date-modal',
    loadComponent: () => import('./weight-date-modal/weight-date-modal.page').then((m) => m.WeightDateModalPage),
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.routes').then((m) => m.routes),
  },
];
