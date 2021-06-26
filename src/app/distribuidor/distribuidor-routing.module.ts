import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DistribuidorPage } from './distribuidor.page';

const routes: Routes = [
  {
    path: '',
    component: DistribuidorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DistribuidorPageRoutingModule {}
