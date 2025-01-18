import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BodyFatPercentageDetailPageRoutingModule } from './body-fat-percentage-detail-routing.module';

import { BodyFatPercentageDetailPage } from './body-fat-percentage-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BodyFatPercentageDetailPageRoutingModule
  ],
  declarations: [BodyFatPercentageDetailPage]
})
export class BodyFatPercentageDetailPageModule {}
