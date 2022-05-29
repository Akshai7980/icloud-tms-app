import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickedUpPageRoutingModule } from './picked-up-routing.module';

import { PickedUpPage } from './picked-up.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickedUpPageRoutingModule
  ],
  declarations: [PickedUpPage]
})
export class PickedUpPageModule {}
