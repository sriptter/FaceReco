import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor( public alertCtrl: AlertController) { }

  async presentAlert(header ,subheader, message) {
    const alert =  await this.alertCtrl.create({
      header: header,
      subHeader: subheader,
      message: message,
      buttons: ['OK'],
      mode: 'ios',
    });
    alert.present();
  }
}
