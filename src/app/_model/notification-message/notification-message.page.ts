import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { CommonService } from '../../_services/common.service';
@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.page.html',
  styleUrls: ['./notification-message.page.scss'],
})
export class NotificationMessagePage implements OnInit {
  // Data passed in by componentProps
  @Input() userName: string;
  @Input() notificationNote: string;
  @Input() id: number;
  @Input() readStatus: number;

  constructor(
    private api: ApiService,
    public common: CommonService
    ) {}

  ngOnInit() {
  }

  ionViewWillLeave() {
    this.markAsRead();
  }

  markAsRead() {
    if (this.readStatus === 1) {
      this.api
        .getRequestWithParams('Mobile/MarkNotificationAsRead/', this.id)
        .subscribe(
          (res: any) => {
          },
          (err) => {
            const toastMsg = 'Something went wrong, Please try again later';
            const toastTime = 3000;
            this.common.presentToast(toastMsg, toastTime);
          }
        );
    }
  }
}
