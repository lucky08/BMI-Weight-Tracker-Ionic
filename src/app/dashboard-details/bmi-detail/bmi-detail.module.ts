import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BmiDetailPageRoutingModule } from './bmi-detail-routing.module';

import { BmiDetailPage } from './bmi-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BmiDetailPageRoutingModule
  ],
  declarations: [BmiDetailPage]
})
export class BmiDetailPageModule {}
