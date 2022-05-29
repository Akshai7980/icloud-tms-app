import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {

  constructor(private common: CommonService) { }

  ngOnInit() {
  }

  onChoose(type: string) {
    this.common.popOver.dismiss(type);
  }

}
