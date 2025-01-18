import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodyFatPercentageDetailPage } from './body-fat-percentage-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BodyFatPercentageDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodyFatPercentageDetailPageRoutingModule {}
