import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Recuperar2Page } from './recuperar2.page';

const routes: Routes = [
  {
    path: '',
    component: Recuperar2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Recuperar2PageRoutingModule {}
