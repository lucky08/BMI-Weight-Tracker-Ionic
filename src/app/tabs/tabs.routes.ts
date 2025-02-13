import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('src/app/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'dashboard/bmi-detail',
    loadComponent: () => import('src/app/dashboard-details/bmi-detail/bmi-detail.page').then((m) => m.BmiDetailPage),
  },
  {
    path: 'dashboard/body-fat-percentage-detail',
    loadComponent: () =>
      import('src/app/dashboard-details/body-fat-percentage-detail/body-fat-percentage-detail.page').then(
        (m) => m.BodyFatPercentageDetailPage,
      ),
  },
  {
    path: 'progress',
    loadComponent: () => import('src/app/progress/progress.page').then((m) => m.ProgressPage),
  },
  {
    path: 'history',
    loadComponent: () => import('src/app/history/history.page').then((m) => m.HistoryPage),
  },
  {
    path: 'settings',
    loadComponent: () => import('src/app/settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
