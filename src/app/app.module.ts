
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { HttpServiceService} from 'src/app/services/http/http-service.service';
import { ToastService} from 'src/app/services/http/toast/toast.service';
import { AlertService} from 'src/app/services/http/alert/alert.service';
import { CustomerService } from 'src/services/customers-service';
import { FormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot({mode: 'ios'}),
      AppRoutingModule,
      HttpClientModule,
      IonicStorageModule.forRoot(),
      FormsModule,

    ],
  providers: [
    StatusBar,
    SplashScreen,
    CustomerService,
    HttpServiceService,
    AlertService,
    ToastService,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
