import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripStatusPageRoutingModule } from './trip-status-routing.module';

import { TripStatusPage } from './trip-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripStatusPageRoutingModule
  ],
  declarations: [TripStatusPage]
})
export class TripStatusPageModule {}
