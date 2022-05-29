import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayrollPopoverPage } from './payroll-popover.page';

const routes: Routes = [
  {
    path: '',
    component: PayrollPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayrollPopoverPageRoutingModule {}
