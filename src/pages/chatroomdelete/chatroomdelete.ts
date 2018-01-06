import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Navbar, ViewController, ToastController} from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { ChatPage } from '../chat/chat';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { database } from 'firebase/app';
import 'rxjs/add/operator/map'
import { HomePage} from '../home/home';




/**
 * Generated class for the ChatroomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatroomdelete',
  templateUrl: 'chatroomdelete.html',
})
export class ChatroomdeletePage {

 
 
  basedel;
  //dataref: Observable<any[]>;
  //dataref: any;
  user: string;
  datalen: Number;
  @ViewChild('deleteroom') deleteroom;
  @ViewChild('deleteroompassword') deleteroompassword;

  
  constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public alertCtrl: AlertController) {


    this.user = this.navParams.get('user');
    
    console.log('username',this.user);
    //this.dataref = this.ref.list('chats').valueChanges();

  
  }

  deleteroombtn(){

    if(this.deleteroom.value !=''){
    this.basedel=this.db.list(this.deleteroom.value.trim()).valueChanges();
    
    this.basedel.subscribe(data=>{
      this.datalen=data.length

      if (this.datalen!==0){
       
        var refedel = firebase.database().ref(`/${this.deleteroom.value.trim()}`);
        refedel.orderByChild("password").limitToFirst(1).on("child_added", snapshot => {
          console.log('snapshot',snapshot)
          if (this.deleteroompassword.value == snapshot.val().password as string){

            refedel.remove();
            this.presentToast('Chat Room deleted Successfully');
            console.log('deleted')
            refedel.off();
          }else{
            this.presentToast('Chat Room password wrong!');
            refedel.off();
            
          }
          
          
         });

      }else{
        this.presentToast('Chat Room not Fount! Ensure the room name or create a new one!');
       
      }
      this.basedel.unsubscribe();
    });

  }else{
    this.presentToast('Room name cant be empty!');
  }
  
  }


  ionViewDidLoad() {
  console.log('into roomdelete page')
  }

  ionViewWillLeave(){
    
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
  
    toast.present();
  }
  eventHandler(keyCode){
    if(keyCode==13){
    this.deleteroombtn();
    }
  }
}

