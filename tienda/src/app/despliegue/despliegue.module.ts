import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesplieguePageRoutingModule } from './despliegue-routing.module';

import { DesplieguePage } from './despliegue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesplieguePageRoutingModule
  ],
  declarations: [DesplieguePage]
})
export class DesplieguePageModule {}
