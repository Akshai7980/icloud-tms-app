import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './_helper/auth.interceptor';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
// import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
// import { BackgroundGeolocation } from '@awesome-cordova-plugins/background-geolocation/ngx';
// import { IsDebug } from '@awesome-cordova-plugins/is-debug/ngx';
// import { LocationAccuracy } from '@awesome-cordova-plugins/location-accuracy/ngx';
import { Badge } from '@awesome-cordova-plugins/badge/ngx';
import { DocumentScanner } from '@ionic-native/document-scanner/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: '_iCloudTMS',
      driverOrder: [ Drivers.LocalStorage, Drivers.IndexedDB]
 })],
  providers: [
    authInterceptorProviders,
    DocumentScanner,
    AndroidPermissions,
    WebView,
    FilePath,
    File,
    Geolocation,
    SplashScreen,
    BackgroundMode,
    ScreenOrientation,
    Camera,
    Device,
    FCM,
    Badge,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
