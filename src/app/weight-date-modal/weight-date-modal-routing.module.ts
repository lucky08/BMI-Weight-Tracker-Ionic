import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeightDateModalPage } from './weight-date-modal.page';

const routes: Routes = [
  {
    path: '',
    component: WeightDateModalPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeightDateModalPageRoutingModule {}
