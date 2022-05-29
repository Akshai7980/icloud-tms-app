/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable prefer-const */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ApiService } from '../_services/api.service';
import { CommonService } from '../_services/common.service';
import {
  DocumentScanner,
  DocumentScannerOptions,
} from '@ionic-native/document-scanner/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
@Component({
  selector: 'app-confirm-delivery',
  templateUrl: './confirm-delivery.page.html',
  styleUrls: ['./confirm-delivery.page.scss'],
})
export class ConfirmDeliveryPage implements OnInit {
  tripDetails: any = [];
  today: Date;
  selectedMedia: any = [];
  comments: string;
  base64textString: string;
  images: any = [];
  caminhoImg: any = [];

  constructor(
    private api: ApiService,
    public common: CommonService,
    private backgroundMode: BackgroundMode,
    private sanitizer: DomSanitizer,
    private webview: WebView,
    private file: File,
    private filePath: FilePath,
    private documentScanner: DocumentScanner
  ) {
    this.common.route.queryParams.subscribe((params) => {
      if (this.common.router.getCurrentNavigation().extras.state) {
        this.tripDetails =
          this.common.router.getCurrentNavigation().extras.state.trip;
        console.log('tripDetails:', this.tripDetails);
      }
    });
  }

  ngOnInit() {
    this.today = new Date();
    this.base64textString = '';
  }

  doSomething(event: any) {
    console.log('event:', event?.detail?.value);
    this.today = event?.detail?.value;
    this.common.modalCtrl.dismiss();
  }

  scanDoc() {
    if (this.common.platform.ready()) {
      if (this.common.platform.is('cordova')) {
        // this.backgroundMode.disable();
        const opts: DocumentScannerOptions = {
          sourceType: 1,
          fileName: 'myfile',
          quality: 2.0,
          returnBase64: false,
        };
        this.documentScanner.scanDoc(opts).then((res) => {
          // setTimeout(() => {
          //   this.backgroundMode.enable();
          // }, 500);
          console.log(res);
          if (this.common.platform.is('ios')) {
            const img = this.webview.convertFileSrc(res);
            const imageTraData = this.sanitizer.bypassSecurityTrustUrl(img);
            this.images.push(imageTraData);
            this.caminhoImg.push(res);
          } else {
            this.filePath.resolveNativePath(res).then((url) => {
              console.log('res:', res);
              console.log('url:', url);
              //Data = file:///storage/emulated/0/Pictures/ + nome da imagem
              this.filePath.resolveNativePath(res).then((data) => {
                console.log('data:', data);
                const filename = res.substring(res.lastIndexOf('/') + 1);
                console.log('filename:', filename);

                const path = res.substring(0, res.lastIndexOf('/') + 1);
                console.log('path:', path);

                this.file.readAsDataURL(path, filename).then((base64string) => {
                  console.log('base64string:', base64string);
                  const modifiedString = base64string.replace(
                    /^data:image\/[a-z]+;base64,/,
                    ''
                  );
                  console.log('modifiedString:', modifiedString);
                  this.base64textString = modifiedString;
                });
              });
            });
          }
        });
      } else {
        console.log('not cordova');
      }
    } else {
      console.log('not ready');
    }
  }

  gotoPage() {
    console.log('this.choosedFileToBase64[0]: ', this.base64textString);
    if (this.base64textString !== '') {
      this.common.simpleLoader();
      const params = {
        subSystemLoadId: this.tripDetails?.SubSystemLoadId,
        status: this.tripDetails?.Status,
        notes: this.comments,
        rate: this.tripDetails?.Rate,
        lstSubSystemloaduploadModel: [
          {
            mapNumber: 0,
            fileName: this.tripDetails?.SystemLoadNumber + '.jpeg',
            filePath: this.base64textString,
            fileType: 'image/jpeg',
            subSystemLoadId: this.tripDetails?.SubSystemLoadId,
            subSystemStatus: this.tripDetails?.Status,
            type: 0,
            createdDate: this.today,
          },
        ],
      };
      console.log('params:', params);
      this.api
        .postRequestWithParams('Mobile/UpdateSubLoadStatus', params)
        .subscribe(
          (res: any) => {
            console.log('res:', res);
            if (res.message === 'Record updated successfully') {
              this.common.dismissLoader();
              const toastMsg = 'Confirm Delivery document updated successfully';
              const toastTime = 1000;
              this.common.presentToast(toastMsg, toastTime);
              const navigationExtras: NavigationExtras = {
                state: {
                  trip: this.tripDetails,
                },
              };
              this.common.router.navigate(['/trip-status'], navigationExtras);
            } else {
              this.common.dismissLoader();
              console.log('error:', res.message);
            }
          },
          (err) => {
            this.common.dismissLoader();
            console.log('err:', err);
          }
        );
    } else {
      const alertHead = ' Failed !';
      const alertMessage = 'You must need to upload confirm delivery documents';
      this.common.presentAlert(alertHead, alertMessage);
    }
  }
}
