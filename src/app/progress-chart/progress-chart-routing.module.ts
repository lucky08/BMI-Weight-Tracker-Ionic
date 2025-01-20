import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressChartComponent } from './progress-chart.component';

const routes: Routes = [
  {
    path: '',
    component: ProgressChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressChartPageRoutingModule {}
