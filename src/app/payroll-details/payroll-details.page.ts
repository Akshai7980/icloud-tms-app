import { Component } from '@angular/core';
import { CommonService } from '../_services/common.service';

@Component({
  selector: 'app-payroll-details',
  templateUrl: './payroll-details.page.html',
  styleUrls: ['./payroll-details.page.scss'],
})
export class PayrollDetailsPage {
  payRollDetails: any = [];

  constructor(public common: CommonService) {
    this.common.route.queryParams.subscribe((params) => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.payRollDetails =
          this.common.router.getCurrentNavigation().extras.state.payroll;
      }
    });
  }

}
