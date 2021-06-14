import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Recuperar2PageRoutingModule } from './recuperar2-routing.module';

import { Recuperar2Page } from './recuperar2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Recuperar2PageRoutingModule
  ],
  declarations: [Recuperar2Page]
})
export class Recuperar2PageModule {}
