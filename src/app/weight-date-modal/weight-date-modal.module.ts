import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeightDateModalPageRoutingModule } from './weight-date-modal-routing.module';

import { WeightDateModalPage } from './weight-date-modal.page';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, WeightDateModalPageRoutingModule],
  declarations: [WeightDateModalPage],
})
export class WeightDateModalPageModule {}
