import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DistribuidorPageRoutingModule } from './distribuidor-routing.module';

import { DistribuidorPage } from './distribuidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DistribuidorPageRoutingModule
  ],
  declarations: [DistribuidorPage]
})
export class DistribuidorPageModule {}
