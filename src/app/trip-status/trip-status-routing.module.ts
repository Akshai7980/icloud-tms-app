import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripStatusPage } from './trip-status.page';

const routes: Routes = [
  {
    path: '',
    component: TripStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripStatusPageRoutingModule {}
