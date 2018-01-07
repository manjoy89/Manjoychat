import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


/**
 * Generated class for the AppfeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appfeedback',
  templateUrl: 'appfeedback.html',
})
export class AppfeedbackPage {

  name: string;
  message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public db: AngularFirestore, public toastCtrl: ToastController) {
  }

  submit(){
    if(this.name !='' && this.message !=''){
    this.db.collection("Feedback").add({
      name: this.name,
      message: this.message
    })
    .then(res=>{
      console.log(res)
      this.presentToast('Thanks for your valuable feedback')
    })
    .catch(error=>{
      console.log(error)
    })
  }else{
    this.presentToast('Name and Message cant be Blank!')
  }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppfeedbackPage');
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
