import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('src/app/dashboard/dashboard.module').then((m) => m.DashboardPageModule),
      },
      {
        path: 'dashboard/bmi-detail',
        loadChildren: () =>
          import('src/app/dashboard-details/bmi-detail/bmi-detail.module').then((m) => m.BmiDetailPageModule),
      },
      {
        path: 'progress',
        loadChildren: () => import('src/app/progress/progress.module').then((m) => m.ProgressPageModule),
      },
      {
        path: 'history',
        loadChildren: () => import('src/app/history/history.module').then((m) => m.HistoryPageModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('src/app/settings/settings.module').then((m) => m.SettingsPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
