import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayrollPopoverPageRoutingModule } from './payroll-popover-routing.module';

import { PayrollPopoverPage } from './payroll-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollPopoverPageRoutingModule
  ],
  declarations: [PayrollPopoverPage]
})
export class PayrollPopoverPageModule {}
