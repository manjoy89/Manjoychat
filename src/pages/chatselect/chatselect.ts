import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ChatroomPage } from '../chatroom/chatroom'
import { ChatjoinPage } from '../chatjoin/chatjoin'
import { SuperTabsModule } from 'ionic2-super-tabs';
import { ChatroomdeletePage } from '../chatroomdelete/chatroomdelete';


/**
 * Generated class for the ChatselectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatselect',
  templateUrl: 'chatselect.html',
})
export class ChatselectPage {
  valueforngif=true;
  user: string;
  chatroomPage = ChatroomPage;
  chatjoinPage = ChatjoinPage;
  chatroomdeletePage = ChatroomdeletePage;
  chatroomParams;
  chatjoinParams;
  chatroomdeleteParams;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.user = this.navParams.get('user');
    this.chatroomParams={
      user: this.user
    }
    this.chatjoinParams={
      user: this.user
    }
    this.chatroomdeleteParams={
      user: this.user
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatselectPage');
    
  }

 

}
