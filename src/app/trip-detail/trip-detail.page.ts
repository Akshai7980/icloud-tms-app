/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { CommonService } from '../_services/common.service';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.page.html',
  styleUrls: ['./trip-detail.page.scss'],
})
export class TripDetailPage implements OnInit {
  tripDetails: any = [];

  constructor(
    public common: CommonService
  ) {
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
