import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { database } from 'firebase/app';
import 'rxjs/add/operator/map'
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the ChatjoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatjoin',
  templateUrl: 'chatjoin.html',
})
export class ChatjoinPage {

  base;
  
  //dataref: any;
  user: string;
  datalen: Number;
 
  @ViewChild('joinroom') joinroom;
  @ViewChild('joinroompassword') joinroompassword;

 

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public alertCtrl: AlertController, public toastCtrl: ToastController) {

    this.user = this.navParams.get('user');
    console.log('user',this.user)
  }

  joinroombtn(){


    this.base=this.db.list(this.joinroom.value).valueChanges();
    
    this.base.subscribe(res=>{
      this.datalen=res.length
      console.log('datalen',this.datalen)

      console.log('before if')
      console.log(this.datalen)
      if (this.datalen!==0){
        console.log('into if')
       
        var refe = firebase.database().ref(`/${this.joinroom.value}`);
        refe.orderByChild("password").limitToFirst(1).on("child_added", snapshot => {
          console.log('into snapshot')
          console.log(snapshot.val().password as string)
          if (this.joinroompassword.value == snapshot.val().password as string){
            console.log('working')
            this.navCtrl.push(ChatPage,{
              createroom: this.joinroom.value,
              createroompassword: this.joinroompassword.value,
              user: this.user
            })
          }else{
            console.log('not working');
            this.presentToast('Chatroom password Wrong!')
          }
           
        });

       this.base.unsubscribe();
      }else{
        this.showalert('Chat Room not Fount','Create a new one!');
        
      }
      
    });

  
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatjoinPage');
  }

  showalert(title: string, message: string){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
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
}
 