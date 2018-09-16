import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular/umd';
import { Storage } from '@ionic/storage';

import { Items, User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-card-detail',
  templateUrl: 'card-detail.html'
})
export class CardDetailPage {
  item: any;
  hasData: boolean = false;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public storage: Storage, public user: User,
    public alertCtrl: AlertController) {
    this.item = navParams.get('item');
    if (this.item) {
      this.hasData = true;
    }
  }

  ionViewCanEnter(): any {
    // here we can either return true or false
    // depending on if we want to leave this view
    return new Promise((resolve, reject) => {
      return this.storage.get('_token').then((value) => {
        if (value) {
          return resolve();
        } else {
          return reject();
        }
      });
    });
  }

  apply(match) {
    this.user.participate({
      matchId: match.id,
      payment: match.entryFee
    }).subscribe((resp) => {
      // this.navCtrl.push(MainPage);
      // location.reload();
      console.log('??????????????????');
      console.log(resp);
    }, (err) => {
      let alert = this.alertCtrl.create({
        title: 'Payment Failed',
        subTitle: err.data,
        buttons: [{
          text: 'OK',
          handler: () => {
            // location.reload();
          }
        }]
      });
      alert.present();
    });
  }
}
