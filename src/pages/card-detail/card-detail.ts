import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Items } from '../../providers';
declare var Instamojo;

@IonicPage()
@Component({
  selector: 'page-card-detail',
  templateUrl: 'card-detail.html'
})
export class CardDetailPage {
  item: any;
  hasData: boolean = false;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items, public storage: Storage) {
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

  apply() {
    Instamojo.configure({
      handlers: {
        onOpen: function() {},
        onClose: function() {
          location.reload();
        },
        onSuccess: function(response) {
          console.log(response);
        },
        onFailure: function(response) {
          console.log(response);
        }
      }
    });
    Instamojo.open('https://www.instamojo.com/@jaydevthomke/?ref=onb_tasks');
  }
}
