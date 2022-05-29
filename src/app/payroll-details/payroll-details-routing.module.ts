import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayrollDetailsPage } from './payroll-details.page';

const routes: Routes = [
  {
    path: '',
    component: PayrollDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollDetailsPageRoutingModule {}
