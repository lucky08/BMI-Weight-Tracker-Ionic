import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeightDateModalPageRoutingModule } from './weight-date-modal-routing.module';

import { WeightDateModalPage } from './weight-date-modal.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, WeightDateModalPageRoutingModule],
  declarations: [WeightDateModalPage],
})
export class WeightDateModalPageModule {}
