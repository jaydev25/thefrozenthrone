import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Items, User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  cardItems: any;
  isDataAvailable: boolean = false;
  constructor(public navCtrl: NavController, public storage: Storage, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, public user: User) {
  }
  

  ngOnInit() {
    console.log('////////////////////////////////////');
    this.user.profile().subscribe((resp) => {
      console.log(resp);
      
      this.isDataAvailable = true;
      this.cardItems = resp;
    }, (err) => {
      console.log(err);
    });
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
}
