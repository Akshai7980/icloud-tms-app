import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ApiService } from '../_services/api.service';
import { CommonService } from '../_services/common.service';

@Component({
  selector: 'app-picked-up-inner',
  templateUrl: './picked-up-inner.page.html',
  styleUrls: ['./picked-up-inner.page.scss'],
})
export class PickedUpInnerPage implements OnInit {
  tripDetails: any = [];

  constructor(private api: ApiService, public common: CommonService) {
    this.common.route.queryParams.subscribe((params) => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.tripDetails =
          this.common.router.getCurrentNavigation().extras.state.trip;
        console.log("tripDetails:", this.tripDetails);
      }
    });
   }

  ngOnInit() {
  }

  gotoPage(page: string) {
    const p = page;
    const navigationExtras: NavigationExtras = {
      state: {
        trip: this.tripDetails
      }
    };
    this.common.router.navigate([p], navigationExtras);
  }

}
