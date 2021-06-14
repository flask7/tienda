import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirenvPage } from './direnv.page';

const routes: Routes = [
  {
    path: '',
    component: DirenvPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirenvPageRoutingModule {}
