import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayrollDetailsPageRoutingModule } from './payroll-details-routing.module';

import { PayrollDetailsPage } from './payroll-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayrollDetailsPageRoutingModule
  ],
  declarations: [PayrollDetailsPage]
})
export class PayrollDetailsPageModule {}
