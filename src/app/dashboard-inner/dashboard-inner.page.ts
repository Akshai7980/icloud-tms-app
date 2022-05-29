import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { PopoverController } from '@ionic/angular';
import { DaysSortPage } from '../_popover/days-sort/days-sort.page';
import { CommonService } from '../_services/common.service';
import { TokenService } from '../_services/token.service';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-dashboard-inner',
  templateUrl: './dashboard-inner.page.html',
  styleUrls: ['./dashboard-inner.page.scss'],
})
export class DashboardInnerPage implements OnInit {
  @ViewChild('payrollDetail') private payrollDetail: ElementRef;
  @ViewChild('payrollConsolidate') private payrollConsolidate: ElementRef;
  @ViewChild('payrollGrouped') private payrollGrouped: ElementRef;
  consolidate: Chart<'doughnut', number[], string>;
  detailChart: Chart<'doughnut', number[], string>;
  grouped: Chart<'doughnut', number[], string>;
  segment: string;
  fromDate: string;
  toDate: string;
  constructor(
    public popoverController: PopoverController,
    public common: CommonService,
    private token: TokenService,
    private api: ApiService,
  ) {}

  ngOnInit() {
    this.segment = 'payroll-detail';
    this.getPayrollDetails();
  }

  getPayrollDetails() {
    console.log('getPayrollDetails');
    const params = {
      searchValue: '',
      currentPage: 0,
      skip: 0,
      itemsPerPage: 0,
      totalItems: 0,
      status: 0,
      subStatus: 0,
      type: 0,
      entityId: 0,
      secondEntityId: 0,
      fromDate: '2022-01-31T00:00:00.000Z',
      toDate: '2022-12-31T00:00:00.000Z',
      sortOrder: 'yearly',
      sortBy: 'yearly',
  };
    this.api.postRequestWithParams('Mobile/GetPayrollReport', params).subscribe((res: any) => {
      console.log('res:',res);
    }, (err) => {
      console.log('err:',err);
    });
  }

  ionViewWillEnter() {
    this.doughnutChartMethod();
  }

  segmentChanged(event, segment) {
    console.log('segment:', segment);
    if (segment === 'payroll-detail') {
      setTimeout(() => {
        this.doughnutChartMethod();
      }, 150);
    } else if (segment === 'payroll-consolidate') {
      setTimeout(() => {
        this.payrollConsolidateChart();
      }, 150);
    } else if (segment === 'payroll-grouped-status') {
      setTimeout(() => {
        this.payrollGroupedChart();
      }, 150);
    }
  }

  doughnutChartMethod() {
    this.detailChart = new Chart(this.payrollDetail.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [50, 50],
            backgroundColor: ['#570FEF', '#001AFF1A'],
          },
        ],
      },
    });
  }
  payrollConsolidateChart() {
    this.consolidate = new Chart(this.payrollConsolidate.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [50, 50],
            backgroundColor: ['#0A5C49', '#001AFF1A'],
          },
        ],
      },
    });
  }
  payrollGroupedChart() {
    this.grouped = new Chart(this.payrollGrouped.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [50, 30, 20],
            backgroundColor: ['#FFBB0B', '#152BED', '#001AFF1A'],
          },
        ],
      },
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: DaysSortPage,
      cssClass: 'days-sort-popover',
      event: ev,
      translucent: true,
    });
    popover.onDidDismiss().then((result) => {
      console.log(result?.data);
    });

    return await popover.present();
  }

  onDateChoose(event: any) {
    console.log('event:', event.detail.value);
  }

  doSomething(event: any, type: string) {
    console.log('event:', event.detail.value);
    if (type === 'FROM') {
      this.fromDate = event.detail.value;
      this.common.modalCtrl.dismiss();
    } else {
      this.toDate = event.detail.value;
      this.common.modalCtrl.dismiss();
    }

    if ((this.fromDate && this.toDate) !== undefined) {
      console.log('both valid');
      if (this.fromDate === this.toDate) {
        console.log('same date');
        const alertHead = 'Failed !';
        const alertMessage = 'You are not allowed to choose same dates';
        this.common.presentAlert(alertHead, alertMessage);
        this.fromDate = '';
        this.toDate = '';
      } else {
        console.log('different date');
      }
    }
  }
}
