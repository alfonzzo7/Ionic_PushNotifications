import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Injectable()
export class PushNotificationsProvider {

  constructor(private oneSignal: OneSignal,
              private plataform: Platform,
              private alertCtrl: AlertController) {
    console.log('Hello PushNotificationsProvider Provider');
  }

  init_notifications(){
    if(this.plataform.is("cordova")){
      this.oneSignal.startInit('0a784c31-55aa-47de-8821-cf5af3bfe7e4', '463565385531');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
       // do something when notification is received
       console.log("Notificación recibida");
      });

      this.oneSignal.handleNotificationOpened().subscribe((jsonData) => {
        // do something when a notification is opened
        console.log("Notificación abierta");
        let alert = this.alertCtrl.create({
          title: jsonData.notification.payload.title,
          subTitle: jsonData.notification.payload.body,
          buttons: ['OK']
        });
        alert.present();
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      });

      this.oneSignal.endInit();
    }else{
      console.log("OneSignal no funciona en Chrome");
    }


  }

}
