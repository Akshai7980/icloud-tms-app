/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { ModalController } from '@ionic/angular';
import { NotificationMessagePage } from '../_model/notification-message/notification-message.page';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonService } from '../_services/common.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  notifications: any = [];
  skeleton: any = [];
  searchTerm: string;
  searchControl: FormControl;
  searching: boolean;

  constructor(
    private api: ApiService,
    private modalController: ModalController,
    public common: CommonService
  ) {
    this.searchControl = new FormControl();
  }

  ngOnInit(): void {
    this.getAllNotifications();
    this.skeleton.length = 8;

    this.searchControl.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((search) => {
        this.searching = false;
        this.setFilteredItems(search);
      });
  }

  doRefresh(event: any) {
    this.getAllNotifications();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  searchInput(event: any) {
    this.searching = true;
    const val = event.target.value;
    if (!val || !val.trim()) {
      this.getAllNotifications();
    } else {
      if (
        event.detail.inputType === 'deleteContentBackward' &&
        event.target.value !== ''
      ) {
        this.getAllNotifications();
      } else {
        this.searchTerm = val;
      }
    }
  }

  getAllNotifications() {
    this.api.getRequest('Mobile/GetNotifications').subscribe(
      (res: any) => {
        if (res.message === 'Success') {
          this.notifications = res?.lstModel;
        }
      },
      (err) => {
        const toastMsg = 'Something went wrong, Please try again later';
        const toastTime = 3000;
        this.common.presentToast(toastMsg, toastTime);
      }
    );
  }

  setFilteredItems(search) {
    this.notifications = this.filterNotifications(search);
  }

  filterNotifications(searchTerm) {
    return this.notifications.filter((n) => {
      return n?.notes?.toLowerCase().indexOf(searchTerm?.toLowerCase()) > -1;
    });
  }

  async presentNotificationModal(notification: any) {
    const modal = await this.modalController.create({
      component: NotificationMessagePage,
      cssClass: 'notification-modal',
      componentProps: {
        userName: notification?.userName,
        notificationNote: notification?.notes,
        id: notification?.trackId,
        readStatus: notification?.readStatus,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data?.role === 'backdrop') {
        if (notification?.readStatus === 1) {
          this.getAllNotifications();
        }
      }
    });

    return await modal.present();
  }
}
