import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Platform, ToastController } from 'ionic-angular';
import { AngularFirestoreModule, AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, _getAngularFirestore, FIRESTORE_PROVIDERS } from 'angularfire2/firestore';
import { adjustRendered } from 'ionic-angular/components/virtual-scroll/virtual-util';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { DateTime } from 'ionic-angular/components/datetime/datetime';
import { FirebaseApp, AngularFireModule } from 'angularfire2';
import { firestore } from 'firebase/app';
import * as firebase from 'firebase';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { ChatroomPage } from '../chatroom/chatroom';
import { Keyboard } from '@ionic-native/keyboard';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { NativeAudio } from '@ionic-native/native-audio';
import { ActionSheetController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//declare var require: any
//@IonicPage()

declare var ApiAIPromises: any;
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;
  //chatscol: AngularFireDatabase<>;
  chats: Observable<any[]>;
 
shouldScrollDown;
mail: string;
scrollbottom: boolean = true;
mailuser;
chatroom;
roomname;
createroompassword;
info: any;
user: string;

message: string ='';

time: string = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
botverify: string;
botmess: string;
inianswer: String;
answer: String;
toast;

  constructor(public socialsharing: SocialSharing,public actionSheetCtrl: ActionSheetController,public nativeAudio: NativeAudio,public toastCtrl: ToastController,public keyboard: Keyboard,public ngZone: NgZone,public platform: Platform,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    
    this.nativeAudio.preloadSimple('uniqueId1','assets/sounds/FacebookPop.mp3')
      //this.user = this.navParams.get('user');
      //this.chatscol = this.db.collection('chats')
      this.mail = this.navParams.get('user');

      this.chatroom = this.navParams.get('createroom');

      this.createroompassword = this.navParams.get('createroompassword');

      this.roomname = "'/"+this.chatroom+"'";

      this.mailuser = this.mail.split("@");

      this.user = this.mailuser[0];

      console.log('user',this.user)
      console.log('roomname',this.roomname)
      this.scrollTo();

    this.chats = db.list(this.chatroom).valueChanges();

    
    platform.ready().then(() => {

      ApiAIPromises.init({
        clientAccessToken: "e8f9fa95afdb4b878ad2ad1ee628399d"
      })
      .then((result) =>  console.log(result))

        
    });

    ApiAIPromises.requestText({
      query: 'hi'
    })
    .then(({result: {fulfillment: {speech}}}) => {
       this.ngZone.run(()=> {
         this.inianswer = speech;
       });
    })

   

    setTimeout(() => {
      for (let i = 0; i < 100; i++) {
        this.chats[i] = i
      }
    })
    

    this.chats.subscribe((data)=>{
     
      if(this.shouldScrollDown == true){
       this.scrollTochat();
      }
    })

  }  
  

    
  sendmess(){

    if (this.message.length==0){
      this.message = 'Just bored to type!'
    }
    this.db.list(this.chatroom).push({
      user: this.user,
      message: this.message,
      password: this.createroompassword,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      });
     // this.keyboard.show();
      console.log('into bot if',this.message)
      if (this.message.slice(0, 1)=='/'){
        this.botmess = this.message.slice(1)
        ApiAIPromises.requestText({
          query: this.botmess
        })
        .then(({result: {fulfillment: {speech}}}) => {
           this.ngZone.run(()=> {
             this.answer = speech;

             this.db.list(this.chatroom).push({
              user: 'Bot',
              message: this.answer,
              password: this.createroompassword,
              time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
              });
              this.message='';
           });
           
        })
        
      }
      
  this.message='';
      
 // this.keyboard.show();
 // this.scrollTochat();
  this.nativeAudio.play('uniqueId1')
  
  }

  ionViewDidLoad() {
    this.content.scrollToBottom(0);
    this.db.list(this.chatroom).push({
      status: true,
      message: `${this.user} has Joined the chatroom`,
      password: this.createroompassword
      //timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      console.log('view load','chats page')
      
      this.content.ionScrollEnd.subscribe((data)=>{

        let dimensions = this.content.getContentDimensions();
  
        let scrollTop = this.content.scrollTop;
        let contentHeight = dimensions.contentHeight;
        let scrollHeight = dimensions.scrollHeight;
  
        if ( (scrollTop + contentHeight + 20) > scrollHeight) {
          this.shouldScrollDown = true;
          console.log('scroll if',this.shouldScrollDown)
         // this.showScrollButton = false;
        } else {
          this.shouldScrollDown = false;
          console.log('scroll else',this.shouldScrollDown)
         // this.showScrollButton = true;
        }
  
      });
  }

  ionViewWillLeave(){
    this.db.list(this.chatroom).push({
      status: true,
      message: `${this.user} has Left the chatroom`,
      password: this.createroompassword
      //timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  onViewDidEnter() {
    
    setTimeout(() => {
      this.content.scrollToBottom(300);//300ms animation speed
    });

}

scrollTo() {
  setTimeout(() => {
    this.content.scrollToBottom();
},1000);

}

scrollTochat() {
  setTimeout(() => {
    this.content.scrollToBottom();
},10);

}

presentToast(message: string) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

preventFocusChange(e) {
  e.preventDefault();
}


Invite() {
  
  this.socialsharing.shareWithOptions({
    message: `Hey Buddy! Please join our chatrrom ${this.chatroom} with Passcode - ${this.createroompassword}. Have Fun!`
  }).then(() => {
    console.log('Shared!');
  }).catch((err) => {
    console.log('Oops, something went wrong:', err);
  });

}
callFunction(){
  this.content.scrollToBottom(0)
}

// ngAfterViewInit() {
//   this.content.ionScrollStart.subscribe((res)=>{
//     console.log('scroll',res.deltaY)
//   });
//}
}
interface chats {
  user: string;
  message: string;
}
