import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardInnerPage } from './dashboard-inner.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardInnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardInnerPageRoutingModule {}
