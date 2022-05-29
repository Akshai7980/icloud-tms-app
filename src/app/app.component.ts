/* eslint-disable @typescript-eslint/dot-notation */
import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { TokenService } from './_services/token.service';
import { ModalController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { LogoutPage } from './_model/logout/logout.page';
// import { BackgroundGeolocation } from '@awesome-cordova-plugins/background-geolocation/ngx';
// import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userDetails: any = [];
  public appPages = [
    {
      title: 'Dashboard',
      url: '/tabs/tab3',
      img: '../assets/side-menu/dashboard-menu.svg',
    },
    {
      title: 'Trip',
      url: '/tabs/tab1',
      img: '../assets/side-menu/trips-menu.svg',
    },
    {
      title: 'Payroll',
      url: '/tabs/tab4',
      img: '../assets/side-menu/payroll-menu.svg',
    },
    {
      title: 'Profile',
      url: '/tabs/tab5',
      img: '../assets/side-menu/profile-menu.svg',
    },
    {
      title: 'Notification',
      url: '/tabs/tab2',
      img: '../assets/side-menu/bell-menu.svg',
    },
    {
      title: 'Support',
      url: '/support',
      img: '../assets/side-menu/support-menu.svg',
    },
    {
      title: 'Logout',
      url: '/logout',
      img: '../assets/side-menu/logout-menu.svg',
    },
  ];
  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private token: TokenService,
    private storage: Storage,
    private modalController: ModalController,
    // private backgroundGeolocation: BackgroundGeolocation,
    public menu: MenuController,
    public router: Router
  ) // private splashScreen: SplashScreen
  {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.checkUserDetails();
      if (this.platform.is('cordova')) {
        this.platform.pause.subscribe(() => {
          console.log('App is in background');
        });
        this.platform.resume.subscribe(() => {
          window['paused'] = 0;
          console.log('App is in foreground');
        });
      } else {
        console.log('Web view');
      }
    });
  }

  checkUserDetails() {
    this.storage
      .get('USER_DETAILS')
      .then(async (val) => {
        if (val === null) {
          this.navCtrl.navigateRoot('/login');
        } else {
          this.navCtrl.navigateRoot('/tabs/tab3');
          this.userDetails = val;
          console.log('userDetails:', this.userDetails);
          this.token.saveToken(this.userDetails.token);
          this.token.setStorage('USER_TOKEN', this.userDetails.token);
        }
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }

  openPage(i: any) {
    if (this.appPages[i]?.title === 'Logout') {
      console.log('logout clicked');
      this.presentLogoutModal();
    } else {
      const route = this.appPages[i].url;
      const navigationExtras: NavigationExtras = {
        state: {
          userInfo: this.userDetails,
        },
      };
      this.router.navigate([route], navigationExtras);
    }
  }

  async presentLogoutModal() {
    const modal = await this.modalController.create({
      component: LogoutPage,
      cssClass: 'logout-modal',
    });
    return await modal.present();
  }

  doRefresh(event: any) {
    this.token.storage.get('USER_DETAILS').then((val) => {
      this.userDetails = val;
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ionWillOpen(event: any) {
    this.token.storage.get('USER_DETAILS').then((val) => {
      this.userDetails = val;
    });
  }
}
