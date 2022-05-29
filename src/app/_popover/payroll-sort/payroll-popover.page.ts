import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-payroll-popover',
  templateUrl: './payroll-popover.page.html',
  styleUrls: ['./payroll-popover.page.scss'],
})
export class PayrollPopoverPage implements OnInit {

  constructor(private common: CommonService) { }

  ngOnInit() {
  }

  onChoose(type: string) {
    this.common.popOver.dismiss(type);
  }

}
