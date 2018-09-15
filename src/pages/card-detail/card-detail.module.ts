import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { CardDetailPage } from './card-detail';

@NgModule({
  declarations: [
    CardDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CardDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    CardDetailPage
  ]
})
export class ItemDetailPageModule { }
