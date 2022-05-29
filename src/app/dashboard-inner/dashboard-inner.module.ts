import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardInnerPageRoutingModule } from './dashboard-inner-routing.module';

import { DashboardInnerPage } from './dashboard-inner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardInnerPageRoutingModule
  ],
  declarations: [DashboardInnerPage]
})
export class DashboardInnerPageModule {}
