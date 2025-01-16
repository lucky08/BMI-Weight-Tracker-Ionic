import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BmiDetailPage } from './bmi-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BmiDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BmiDetailPageRoutingModule {}
