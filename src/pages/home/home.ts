import { Component } from '@angular/core';
import { NavController, ToastController} from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { Title } from '@angular/platform-browser/src/browser/title';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { database, storage, auth } from 'firebase/app';
import 'rxjs/add/operator/map'
import { ChatroomPage } from '../chatroom/chatroom';
import { ChatselectPage } from '../chatselect/chatselect';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook'
import { FirebaseAuth } from 'firebase/auth'
import { Storage } from '@ionic/storage';
import { IntroPage } from '../intro/intro';
import { Vibration } from '@ionic-native/vibration';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

chats: Observable<any[]>;
  @ViewChild('user') user;
  @ViewChild('password') password;
  provider;
  sample;
  trimmed;
  
 
  constructor(public vibration: Vibration,public storage: Storage,public toastCtrl: ToastController,public facebook: Facebook, public alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public ref: AngularFireDatabase) {
   

  }
  
  Register(){
    this.fire.auth.createUserWithEmailAndPassword(this.user.value.trim(),this.password.value)
    .then( data =>{
     this.presentToast('Registration Successful! Have Fun');
     console.log('check in',this.user.value)
     //console.log('username',this.username)
     this.navCtrl.push(ChatselectPage,{
       user: this.user.value
     });
    })
    .catch(error =>{
      console.log(error.message)
      this.presentToast(error.message);
      this.vibration.vibrate(300);
    })
  }

  Login(){
    this.fire.auth.signInWithEmailAndPassword(this.user.value.trim(),this.password.value)
    .then( data =>{
      this.presentToast('Login Successful! Have Fun!');
      this.navCtrl.push(ChatselectPage,{
        user: this.user.value
        
      });
    })
    .catch (error =>{
      console.log(error)
      this.presentToast(error.message);
      this.vibration.vibrate(300);
    })
   
  }

 passwordreset(){
 //  this.emailAddress = this.user.value
 // this.fire.auth.sendPasswordResetEmail(this.emailAddress)
 
  var auth = firebase.auth();
  return auth.sendPasswordResetEmail(this.user.value)
    .then(() => console.log("email sent"))
    .catch((error) => console.log(error))
}  
      
  

  // showalert(title: string, message: string){
  //   let alert = this.alertCtrl.create({
  //     title: title,
  //     subTitle: message,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

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

ionViewDidLoad() {
  
  this.storage.get('intro-done').then(done => {
    if (!done) {
    //  this.storage.set('intro-done', true);
      this.navCtrl.setRoot(IntroPage);
    }
  });
}

}


