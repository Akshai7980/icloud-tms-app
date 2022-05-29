import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-days-sort',
  templateUrl: './days-sort.page.html',
  styleUrls: ['./days-sort.page.scss'],
})
export class DaysSortPage implements OnInit {

  constructor(private common: CommonService) { }

  ngOnInit() {
  }

  onChoose(type: string) {
    this.common.popOver.dismiss(type);
  }

}
