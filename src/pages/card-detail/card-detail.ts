import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Items, User } from '../../providers';
declare var Instamojo;

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
    console.log('>>>>>>>>>>>>>>>>>>>>');
    console.log(match.entryFee);
    window.open("http://google.com",'_system', 'location=no');
    
    Instamojo.configure({
      handlers: {
        onOpen: function() {},
        onClose: function(resp) {
          console.log(this);
          
        },
        onSuccess: function(response) {
          
        },
        onFailure: function(response) {
          console.log('////////////////////////');
          console.log(response);
          console.log(this);
          
          this.user.verifypayment({
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
    });
    Instamojo.open('https://www.instamojo.com/@jaydevthomke?amount=' + match.entryFee + '&&purpose=Match' );
  }
}
