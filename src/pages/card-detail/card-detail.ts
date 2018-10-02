import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  button: string = 'Register';
  isRegistred: boolean = false;
  pendingPayment: boolean = false;
  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public storage: Storage, public user: User,
    public alertCtrl: AlertController) {
    this.item = navParams.get('item');
    if (this.item) {
      this.hasData = true;
      if(this.item.MatchUsers[0] && !this.item.MatchUsers[0].paymentVerified && !this.item.MatchUsers[0].paymentId) {
        this.button = 'Make Payment';
        this.pendingPayment = true;
      } else if (this.item.MatchUsers[0] && this.item.MatchUsers[0].paymentVerified && this.item.MatchUsers[0].paymentId) {
        this.button = 'Already Regestered';
        this.isRegistred = true;
      }
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
      matchId: match.id
    }).subscribe((resp) => {
      // this.navCtrl.push(MainPage);
      // window.open('' + resp, '_system', 'location=yes')
      this.user.paytm(resp).subscribe((pay) => {
        console.log(pay);
        
      })
      console.log('??????????????????');
      console.log(resp);
    }, (err) => {
      let alert = this.alertCtrl.create({ 
        title: 'Payment Failed',
        subTitle: err.error,
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
