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
  selector: 'page-chatroom',
  templateUrl: 'chatroom.html',
})
export class ChatroomPage {

 
  base;
  basedel;
  dataref: Observable<any[]>;
  //dataref: any;
  user: string;
  datalen: Number;
  @ViewChild('createroom') createroom;
  @ViewChild('createroompassword') createroompassword;

  
  constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public alertCtrl: AlertController) {


    this.user = this.navParams.get('user');
    
    console.log('username',this.user);
    //this.dataref = this.ref.list('chats').valueChanges();

  
  }

  
  createroombtn(){

    if(this.createroom.value !=''){

    this.base=this.db.list(this.createroom.value.trim()).valueChanges();

    
    
    this.base.subscribe(res=>{
      this.datalen=res.length
      console.log('datalen',this.datalen)

      console.log('before if')
      console.log(this.datalen)
      if (this.datalen==0){

        if(this.createroompassword.value !='' && this.createroom.value !=''){
          this.navCtrl.push(ChatPage,{
          createroom: this.createroom.value.trim(),
          createroompassword: this.createroompassword.value,
          user: this.user
        })
        this.presentToast('Chatroom Created Successfully! Have Fun!');
       //here was unsubscribe
      }else{
        console.log('not working')
        this.presentToast('Ensure proper Chatroom Name and Password!');
      }
      }else{
        this.presentToast('Chatroom Already present! Create a New room or Join existing!');
        
      }
      this.base.unsubscribe();
    });

  }else{
    this.presentToast('Chatroom Name cant be Blank');
  }
  
  }

  ionViewDidLoad() {
  
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

 

}

