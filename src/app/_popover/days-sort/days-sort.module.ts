import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DaysSortPageRoutingModule } from './days-sort-routing.module';

import { DaysSortPage } from './days-sort.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DaysSortPageRoutingModule
  ],
  declarations: [DaysSortPage]
})
export class DaysSortPageModule {}
