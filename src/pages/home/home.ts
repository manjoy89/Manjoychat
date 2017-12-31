import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
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




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

chats: Observable<any[]>;
  @ViewChild('user') user;
  @ViewChild('password') password;
  provider;
  trimmed;
  
 
  constructor(public facebook: Facebook, public alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public ref: AngularFireDatabase) {
   
    
  }


  
  Register(){
    this.fire.auth.createUserWithEmailAndPassword(this.user.value,this.password.value)
    .then( data =>{
     this.showalert('Registeration Successfully','Enter Chatroom and have Fun!');
     console.log('check in',this.user.value)
     //console.log('username',this.username)
     this.navCtrl.push(ChatselectPage,{
       user: this.user.value
     });
    })
    .catch(error =>{
      this.showalert('Registeration Failed','Ensure proper data');
    })
  }

  Login(){
    this.fire.auth.signInWithEmailAndPassword(this.user.value,this.password.value)
    .then( data =>{
      this.showalert('LoggedIn Successfully','Enter Chatroom and have Fun!');
      this.navCtrl.push(ChatselectPage,{
        user: this.user.value
      });
    })
    .catch (error =>{
      this.showalert('Login Failed','Ensure That You have registered');
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
      
  

  showalert(title: string, message: string){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}




