import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickedUpInnerPage } from './picked-up-inner.page';

const routes: Routes = [
  {
    path: '',
    component: PickedUpInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickedUpInnerPageRoutingModule {}
