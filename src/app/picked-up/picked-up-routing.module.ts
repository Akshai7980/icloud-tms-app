import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickedUpPage } from './picked-up.page';

const routes: Routes = [
  {
    path: '',
    component: PickedUpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickedUpPageRoutingModule {}
