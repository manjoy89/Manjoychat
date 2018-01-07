import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';
import { ChatroomPage} from '../pages/chatroom/chatroom'
import { ChatjoinPage} from '../pages/chatjoin/chatjoin'
import { ChatselectPage} from '../pages/chatselect/chatselect'
import { AffiliatePage } from '../pages/affiliate/affiliate';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AddzonePage } from '../pages/addzone/addzone';
import { AppfeedbackPage } from '../pages/appfeedback/appfeedback';
import { AboutPage } from '../pages/about/about';
@Component({
  templateUrl: 'app.html',
  providers: [Keyboard]
})
export class MyApp {
  rootPage:any = HomePage;

  @ViewChild(Nav) nav: Nav;

pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public push: Push) {
    platform.ready().then(() => {
      this.pushsetup();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
    });

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Affiliate Market', component: AffiliatePage },
      { title: 'Ad Zone', component: AddzonePage },
      { title: 'App Feedback', component: AppfeedbackPage },
      { title: 'About', component: AboutPage }
    //  { title: 'Join Room', component: ChatjoinPage }
    ];

    
  }

  


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  pushsetup(){

    const options: PushOptions = {
      android: {
        senderID: "312081840612",
        sound: false,
        icon: 'notification',
        clearBadge: true
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
      windows: {},
      browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
   };
   
   const pushObject: PushObject = this.push.init(options);
   
   
   pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
   
   pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
   
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}

