import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { CommonService } from '../_services/common.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  contactInfo: any = [];

  constructor(
    private api: ApiService,
     public common: CommonService
     ) {}

  ngOnInit() {
    this.getContactInfo();
  }

  getContactInfo() {
    this.api.getRequest('Mobile/GetContactInfo').subscribe(
      (res: any) => {
        if (res.message === 'Success') {
          this.contactInfo = res?.lstModel;
        }
      },
      (err) => {
        const toastMsg = 'Something went wrong, Please try again later';
        const toastTime = 3000;
        this.common.presentToast(toastMsg, toastTime);
      }
    );
  }
}
