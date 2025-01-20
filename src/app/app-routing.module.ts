import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'weight-date-modal',
    loadChildren: () => import('./weight-date-modal/weight-date-modal.module').then((m) => m.WeightDateModalPageModule),
  },
  /*{
    path: 'progress-chart',
    loadChildren: () => import('./progress-chart/progress-chart.module').then((m) => m.ProgressChartComponentModule),
  },*/
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
