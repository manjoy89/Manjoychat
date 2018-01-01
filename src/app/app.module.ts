import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Component, NgZone } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ViewChild } from '@angular/core/src/metadata/di';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat'
import { ChatroomPage } from '../pages/chatroom/chatroom'
import { ChatselectPage } from '../pages/chatselect/chatselect'
import { ChatjoinPage } from '../pages/chatjoin/chatjoin'
//import { Keyboard } from 'ionic-angular/platform/keyboard';
import { Keyboard } from '@ionic-native/keyboard';
import { IntroPage } from '../pages/intro/intro'
import { Vibration } from '@ionic-native/vibration';

const firebaseAuth = {
  apiKey: "AIzaSyCC3DoeFX6xJCzDZS36k_5iiPVBFYm_oHM",
  authDomain: "manjoychat.firebaseapp.com",
  databaseURL: "https://manjoychat.firebaseio.com",
  projectId: "manjoychat",
  storageBucket: "manjoychat.appspot.com",
  messagingSenderId: "312081840612"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatPage,
    ChatroomPage,
    ChatselectPage,
    ChatjoinPage,
    IntroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChatPage,
    ChatroomPage,
    ChatselectPage,
    ChatjoinPage,
    IntroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    Keyboard,
    Vibration,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
