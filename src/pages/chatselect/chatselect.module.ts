import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatselectPage } from './chatselect';

@NgModule({
  declarations: [
    ChatselectPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatselectPage),
  ],
})
export class ChatselectPageModule {}
