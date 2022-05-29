import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationMessagePage } from './notification-message.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationMessagePageRoutingModule {}
