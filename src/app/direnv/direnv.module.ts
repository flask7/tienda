import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirenvPageRoutingModule } from './direnv-routing.module';

import { DirenvPage } from './direnv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirenvPageRoutingModule
  ],
  declarations: [DirenvPage]
})
export class DirenvPageModule {}
