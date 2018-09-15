import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Item } from '../../models/item';
import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  cardItems: any;
  isDataAvailable: boolean = false;
  constructor(public navCtrl: NavController, public storage: Storage, public loadingCtrl: LoadingController,
    public modalCtrl: ModalController, public items: Items) {
  }

  ngOnInit() {
    this.items.query().subscribe((resp) => {
      this.isDataAvailable = true;
      this.cardItems = resp;
    }, (err) => {
      console.log(err);
    });
  }
  
  host() {
    let loading = this.loadingCtrl.create({
      content: 'This Feature is comming soon... Contact 8421353397 to host your own Tournament.',
      duration: 20000
    });
    loading.present();
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

   /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('CardDetailPage', {
      item: item
    });
  }
}
