import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatjoinPage } from './chatjoin';

@NgModule({
  declarations: [
    ChatjoinPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatjoinPage),
  ],
})
export class ChatjoinPageModule {}
