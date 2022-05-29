    ------------------------------------------------------------------------------------------------------------------
    // if (this.comments !== '' && this.comments !== undefined && this.selectedMedia.length !== 0) {
    //   const headers = {
    //     "Content-Type": "application/json",
    //     accept: "text/plain",
    //     Authorization: "Bearer " + this.userToken,
    //   };
    //   const formData = new FormData();
    //     formData.append('subSystemLoadId', this.tripDetails?.SubSystemLoadId);
    //     formData.append('status', this.tripDetails?.Status);
    //     formData.append('notes', this.comments);
    //     formData.append('rate', this.tripDetails?.Rate);
    //     this.api.http.post('https://login.icloudtms.com/api/Mobile/UpdateSubLoadStatus',formData
    //     ,{ headers }).subscribe((res) => {
    //       console.log(res);
    //       if (res['status'] === true) {
    //         const toastMsg = 'Picked Up Details Uploaded Successfully';
    //         const toastTime = 3000;
    //         this.common.presentToast(toastMsg, toastTime);
    //         this.comments = '';
    //         this.selectedMedia = [];
    //       }
    //     }, err => {
    //       console.log('err',err);
    //     });
    //  } else {
    //   const alertHead = 'Failed';
    //   const alertMsg = 'You are trying to upload with <strong> Empty pick up documents </strong>';
    //   this.common.presentAlert(alertHead, alertMsg);
    //   this.comments = '';
    //   this.selectedMedia = [];
    //  }
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     trip: this.tripDetails
    //   }
    // };
    // this.common.router.navigate(['/picked-up-inner'], navigationExtras);

        ------------------------------------------------------------------------------------------------------------------

                    <!-- <span style="color: #4F4F4F;
                margin-left: 10px;
                font-size: small;">(Optional)</span> -->

                    ------------------------------------------------------------------------------------------------------------------

                                <!-- <img src="../../assets/icon/date.png" alt="" slot="start"> -->
                <!-- <ion-input placeholder="Write your comments here..."></ion-input> -->

                    ------------------------------------------------------------------------------------------------------------------

                                        <!-- <ion-datetime placeholder="Choose pick up date and time" (ionChange)="doSomething($event)"></ion-datetime> -->

    ------------------------------------------------------------------------------------------------------------------

                    <!-- <ion-item lines="none" style="--background: rgba(87, 15, 239, 0.1);
                      border-radius: 10px;">
                        <img src="../../assets/icon/date.png" alt="" slot="start"> -->
                        <!-- <ion-input type="time" placeholder="Choose Pick Up Time"></ion-input> -->
                        <!-- <ion-datetime placeholder="Choose Pick Up Time" displayFormat="hh-mm-A" (ionChange)="doSomething($event)"></ion-datetime> -->
                    <!-- </ion-item> -->

                        ------------------------------------------------------------------------------------------------------------------

                                <!-- <div> -->
            <!-- <p> Select Time </p> -->
            <!-- </div> -->

                ------------------------------------------------------------------------------------------------------------------

            <!-- <ion-item lines="none">
                <img src="../../assets/icon/eye-view.png" alt="">
                <p>View documents</p>
            </ion-item> -->

                ------------------------------------------------------------------------------------------------------------------

          <ion-input
            type="file"
            style="position: absolute; opacity: 0"
            accept="application/pdf"
            multiple="true"
          ></ion-input>

                          ------------------------------------------------------------------------------------------------------------------

                            // pickImage(sourceType) {
  //   const options: CameraOptions = {
  //     quality: 75,
  //     sourceType: sourceType,
  //     correctOrientation: true,
  //     // targetHeight: 200,
  //     // targetWidth: 200,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //   };

  //   this.camera.getPicture(options).then(
  //     async (imageData) => {
  //       this.userDocument = "data:image/jpeg;base64," + imageData;
  //       const base64Data = imageData;
  //       console.log("base64Data:", base64Data);
  //       // const base64 = await fetch(base64Data);
  //       // const base64Response = await fetch(`data:image/jpeg;base64,${base64Data}`);
  //       // const blob = await base64Response.blob();
  //     },
  //     (err) => {
  //       console.log("Error:", err);
  //       const toastMsg = " Something went wrong !";
  //       const toastTime = 1000;
  //       this.common.presentToast(toastMsg, toastTime);
  //     }
  //   );
  // }
                          ------------------------------------------------------------------------------------------------------------------

    //   const toBase64 = file => new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = error => reject(error);
  // });

  // async function Main() {
  //    const file = event.target.files[0];
  //    const result = await toBase64(file).catch(e => Error(e));
  //    console.log('result:',result);
  //    this.choosedFileToBase64[0] = result;

  //    if(result instanceof Error) {
  //       console.log('Error: ', result.message);
  //       return;
  //    }
  //   //  console.log(await toBase64(file));
  //   //  await this.choosedFileToBase64[0] == toBase64(file);
  // }

  // Main();

                            ------------------------------------------------------------------------------------------------------------------
    // const reader = new FileReader();
    // reader.onload = (e: any) => {
    //     const image = new Image();
    //     image.src = e.target.result;
    //     image.onload = rs => {
    //             const imgBase64Path = e.target.result;
    //             this.choosedFileToBase64 = imgBase64Path;
    //                  console.log('choosedFileToBase64:',this.choosedFileToBase64);
    //     };
    // };

    // reader.readAsDataURL(event.target.files[0]);

                            <!-- <ion-datetime placeholder="Choose pick up date and time" (ionChange)="doSomething($event)"></ion-datetime> -->


                    <!-- <ion-item lines="none" style="--background: rgba(87, 15, 239, 0.1);
                      border-radius: 10px;">
                        <img src="../../assets/icon/date.png" alt="" slot="start"> -->
                        <!-- <ion-input type="time" placeholder="Choose Pick Up Time"></ion-input> -->
                        <!-- <ion-datetime placeholder="Choose Pick Up Time" displayFormat="hh-mm-A" (ionChange)="doSomething($event)"></ion-datetime> -->
                    <!-- </ion-item> -->

                                <!-- <div> -->
            <!-- <p> Select Time </p> -->
            <!-- </div> -->


                <!-- <img src="../../assets/icon/date.png" alt="" slot="start"> -->
                <!-- <ion-input placeholder="Write your comments here..."></ion-input> -->


                    <!-- accept="application/pdf, image/png, image/jpeg" -->
                    <!-- <ion-input type="file" accept="image/*" capture style="position: absolute;
                    opacity: 0;" multiple="true" (change)="onChange($event)"></ion-input> -->


                <!-- <span style="color: #4F4F4F;
                margin-left: 10px;
                font-size: small;">(Optional)</span> -->

                                       <!-- <ion-icon name="close-circle-outline" style="float: right;
                         color: black;
                         font-size: 1.5rem;
                         position: relative;
                         bottom: 4px;"></ion-icon> -->

                                     <!-- <ion-item lines="none" (click)="route()">
                <img src="../../assets/icon/eye-view.png" alt="">
                <p>View documents</p>
            </ion-item> -->

                <!-- <ion-modal *ngIf="this.showLoader === true;" backdropDismiss="false" style="--width: 90%;
    --height: 50%;
    --border-radius: 10px;">
        <ng-template>
          <ion-content style="text-align: center;">
            <img src="../../assets/loader/truck-loader.gif" alt="" style="padding: 15px;">
            <h5 class="animate__animated animate__fadeInUp" style="color: #570FEF; font-family: 'Poppins_Regular';">
                Please wait while we upload your document ....</h5>
        </ion-content>
        </ng-template>
      </ion-modal> -->



        // pickImage(sourceType) {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     sourceType: sourceType,
  //     correctOrientation: true,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //   };

  //   this.camera.getPicture(options).then(async (imageData) => {

  //     this.base64textString = imageData;
  //     console.log('base64textString:',this.base64textString);
  //   }, (err) => {
  //     console.log('Error:',err);
  //   });
  // }

  // onChange(event: any) {
  //   console.log("event:", event);
  //   this.selectedMedia = event.target.files;
  //   console.log("selectedMedia:", this.selectedMedia);

  //   var files = event.target.files;
  //   var file = files[0];

  //   if (files && file) {
  //     var reader = new FileReader();

  //     reader.onload = this._handleReaderLoaded.bind(this);

  //     reader.readAsBinaryString(file);
  //   }

  // }

  // _handleReaderLoaded(readerEvt) {
  //   var binaryString = readerEvt.target.result;
  //   this.base64textString = btoa(binaryString);
  //   console.log(btoa(binaryString));
  //   console.log("base64textString:", this.base64textString);
  // }
