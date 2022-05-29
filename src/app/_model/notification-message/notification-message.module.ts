import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationMessagePageRoutingModule } from './notification-message-routing.module';

import { NotificationMessagePage } from './notification-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationMessagePageRoutingModule
  ],
  declarations: [NotificationMessagePage]
})
export class NotificationMessagePageModule {}
