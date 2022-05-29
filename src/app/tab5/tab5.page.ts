import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_services/common.service';
import { LanguagePage } from '../_popover/language/language.page';
import { TokenService } from '../_services/token.service';
@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  profileDetails: any = [];
  userDetails: any = [];

  constructor(
    public common: CommonService,
    private token: TokenService
    ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.token.storage.get('USER_DETAILS').then((val) => {
      this.userDetails = val;
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.common.popOver.create({
      component: LanguagePage,
      cssClass: 'days-sort-popover',
      event: ev,
      translucent: true,
    });
    popover.onDidDismiss().then((result) => {
      console.log(result?.data);
    });

    return await popover.present();
  }
}
