/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ApiService } from '../_services/api.service';
import { CommonService } from '../_services/common.service';
import { PayrollPopoverPage } from '../_popover/payroll-sort/payroll-popover.page';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  userDetails: any = [];
  payRolls: any = [];
  skeleton: any = [];
  searchTerm: string;
  searchControl: FormControl;
  searching: boolean;
  payrollStatus: number;

  constructor(
    private api: ApiService,
    public common: CommonService,
    private token: TokenService
  ) {
    this.searchControl = new FormControl();
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.skeleton.length = 10;
    this.payrollStatus = 0;

    this.searchControl.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((search) => {
        this.searching = false;
        this.setFilteredItems(search);
      });
  }

  getUserDetails() {
    this.token.storage.get('USER_DETAILS').then((val) => {
      this.userDetails = val;
      if (val) {
        this.getPayrolls();
      }
    });
  }

  doRefresh(event: any) {
    this.getPayrolls();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  getPayrolls() {
    const params = {
      searchValue: '',
      status: this.payrollStatus,
      driverId: this.userDetails?.driverId,
      companyId: this.userDetails?.companyId,
    };
    this.api.postRequestWithParams('Mobile/GetAllPayroll', params).subscribe(
      (res: any) => {
        if (res.success === true) {
          this.payRolls = res?.lstModel;
        }
      },
      (err) => {
        const toastMsg = 'Something went wrong, Please try again later';
        const toastTime = 3000;
        this.common.presentToast(toastMsg, toastTime);
      }
    );
  }
  gotoPage(payRollDetails: any) {
    const navigationExtras: NavigationExtras = {
      state: {
        payroll: payRollDetails,
      },
    };
    this.common.router.navigate(['/payroll-details'], navigationExtras);
  }

  async presentPopover(ev: any) {
    const popover = await this.common.popOver.create({
      component: PayrollPopoverPage,
      cssClass: 'days-sort-popover',
      event: ev,
      translucent: true,
    });
    popover.onDidDismiss().then((result) => {
      if (result?.data === 'All') {
        this.payrollStatus = 0;
        this.getPayrolls();
      } else if (result?.data === 'Paid') {
        this.payrollStatus = 3;
        this.getPayrolls();
      } else if (result?.data === 'Pending') {
        this.payrollStatus = 1;
        this.getPayrolls();
      }
    });

    return await popover.present();
  }

  searchInput(event: any) {
    this.searching = true;
    const val = event.target.value;
    if (!val || !val.trim()) {
      this.getPayrolls();
    } else {
      if (
        event.detail.inputType === 'deleteContentBackward' &&
        event.target.value !== ''
      ) {
        this.getPayrolls();
      } else {
        this.searchTerm = val;
      }
    }
  }

  setFilteredItems(search) {
    this.payRolls = this.filterItem(search);
  }

  filterItem(searchTerm) {
    return this.payRolls.filter((item) => {
      return (
        item.PayLoadNumber.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    });
  }
}
