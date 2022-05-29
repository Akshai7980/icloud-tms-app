import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickedUpInnerPageRoutingModule } from './picked-up-inner-routing.module';

import { PickedUpInnerPage } from './picked-up-inner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickedUpInnerPageRoutingModule
  ],
  declarations: [PickedUpInnerPage]
})
export class PickedUpInnerPageModule {}
