import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  constructor(private common: CommonService, private token: TokenService) {}

  ngOnInit() {}

  userClicked(decision: string) {
    if (decision === 'YES') {
      this.common.navCtrl.navigateRoot('/login');
      this.token.clearStorage();
      this.common.modalCtrl.dismiss();
    } else {
      this.common.modalCtrl.dismiss();
    }
  }
}
