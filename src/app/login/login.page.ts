import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../_services/api.service';
import { CommonService } from '../_services/common.service';
import { TokenService } from '../_services/token.service';
import * as sha512 from 'js-sha512';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showLoader: boolean;
  isChecked: boolean;
  showPassword: boolean;
  pushNotification: any = [];

  constructor(
    private androidPermissions: AndroidPermissions,
    private formBuilder: FormBuilder,
    private common: CommonService,
    private token: TokenService,
    private api: ApiService,
    private fcm: FCM
  ) {}

  ngOnInit(): void {
    this.showLoader = false;
    this.showPassword = true;
    this.loginFormValidator();
    this.common.menu.swipeGesture(false);
    this.fetchCheckedUserDetails();
    if (this.common.platform.is('cordova')) {
      this.getToken();
      this.subscribePushNotification();
      this.fetchAndroidPermission();
    } else {
      console.log('web');
    }
  }

  loginFormValidator() {
    this.loginForm = this.formBuilder.group({
      userName: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      otp: [''],
      capchaValue: [''],
      userType: [0],
      mobileFCMToken: [null],
    });
  }

  fetchAndroidPermission() {
    this.androidPermissions
      .checkPermission(this.androidPermissions.PERMISSION.CAMERA)
      .then(
        (result) => console.log('Has permission?', result.hasPermission),
        (err) =>
          this.androidPermissions.requestPermissions([
            this.androidPermissions.PERMISSION.CAMERA,
            this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
            this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE,
            this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
          ])
      );
  }

  subscribePushNotification() {
    this.fcm.onNotification().subscribe(
      (data) => {
        if (data.wasTapped) {
          console.log('Received in background');
        } else {
          console.log('Received in foreground');
        }
      },
      (err) => {
        console.log('Error:', err);
      }
    );

    this.fcm.onTokenRefresh().subscribe(
      (token) => {
        console.log('token:', token);
        // Register your new token in your back-end if you want
        // backend.registerToken(token);
      },
      (err) => {
        console.log('Error:', err);
      }
    );
  }

  getToken() {
      this.fcm
        .getToken()
        .then((token) => {
          console.log('token:', token);
          this.loginForm.value.mobileFCMToken = token;
          this.loginForm.get('mobileFCMToken').setValue(token);
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        })
        .catch((err) => {
          console.log('Error:', err);
        });
  }

  onPasswordInput(event: any) {
    this.sha512(event?.detail?.value);
  }

  sha512(password: string) {
    const hash2 = sha512.sha512(password);
    this.loginForm.value.password = hash2;
  }

  loginSubmit() {
    if (this.loginForm.valid) {
      console.log('loginForm:', this.loginForm.value);
      this.showLoader = true;
      this.api
        .postRequestForLogin(
          'Auth/authenticatedriver',
          JSON.stringify(this.loginForm.value)
        )
        .subscribe(
          (res: any) => {
            console.log('res:', res);
            if (res?.success === true) {
              if (res?.message === 'Wrong UserName/Password') {
                this.showLoader = false;
                const alertHead = 'Failed!';
                const alertMessage =
                  'Invalid login credentials, Wrong UserName/Password';
                this.common.presentAlert(alertHead, alertMessage);
              } else {
                this.showLoader = false;
                this.common.navCtrl.navigateRoot('/tabs/tab3');
                console.log('token:', res?.model?.token);
                this.token.saveToken(res?.model?.token);
                this.token.saveUser(res?.model);
                this.token.setStorage('USER_DETAILS', res?.model);
                this.token.setStorage('USER_TOKEN', res?.model?.token);
              }
            } else {
              console.log('failed');
              const toastMsg = 'Something went wrong, Please try again later';
              const toastTime = 3000;
              this.common.presentToast(toastMsg, toastTime);
            }
          },
          (err) => {
            this.showLoader = false;
            console.log('Error:', err);
            const toastMsg = 'Something went wrong, Please try again later';
            const toastTime = 3000;
            this.common.presentToast(toastMsg, toastTime);
          }
        );
    } else {
      const alertHead = 'Failed!';
      const alertMessage =
        'Please enter valid details and <strong>password must contain 6 digits.</strong>';
      this.common.presentAlert(alertHead, alertMessage);
      console.log('not valid');
    }
  }

  onCheckRemember(event: any) {
    if (this.loginForm.valid) {
      if (event.detail.checked === true) {
        const msg = 'Your Email and Password is stored successfully.';
        const time = 2000;
        this.token
          .setStorage('USER_DETAILS_CHECKED', this.loginForm.value)
          .catch((err) => {
            console.log('Error', err);
            console.log('User Email and Password securely stored in device');
          });
        this.common.presentToast(msg, time);
      }
    } else {
      const msg = 'Please enter valid details and then click checkbox';
      const time = 2000;
      this.common.presentToast(msg, time);
      this.isChecked = false;
    }
  }

  fetchCheckedUserDetails() {
    this.token.storage
      .get('USER_DETAILS_CHECKED')
      .then((val) => {
        console.log('Value', val);
        if (!val) {
          console.log('No User Details Stored');
        } else {
          this.loginForm.get('userName').setValue(val.userName);
          this.loginForm.get('password').setValue(val.password);
          const msg =
            'We found your stored Email and Password, would you like to continue with that';
          const time = 2000;
          this.common.presentToast(msg, time);
        }
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }
}
