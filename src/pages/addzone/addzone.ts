import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { ActionSheetController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the AddzonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addzone',
  templateUrl: 'addzone.html',
})
export class AddzonePage {

itemsCollection: AngularFirestoreCollection<Items>; //Firestore collection
items: Observable<Items[]>; // read collection

  constructor(public socialSharing: SocialSharing,public actionSheetCtrl: ActionSheetController,public emailComposer: EmailComposer,public callNumber: CallNumber,public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore) {

    this.itemsCollection = this.afs.collection('Adzone'); //ref()
    this.items = this.itemsCollection.valueChanges()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddzonePage');
  }

  site(site: string){
    if(site!=''){
    window.open(site, '_system');
    }else{
      this.presentToast('Site details to be added soon!')
    }
  }

  phone(phone: string){
      if(phone!=''){
        this.callNumber.callNumber(phone, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
      }else{
        this.presentToast('Phone details to be added soon!')
      }
  }

  mail(mail: string){
    if(mail!=''){
      this.emailComposer.addAlias('gmail', 'com.google.android.gm');

// then use alias when sending email
      this.emailComposer.open({
      app: 'gmail',
      to:      mail,
      subject: 'Business Enquiry',
      });
    }else{
      this.presentToast('Mail details to be added soon!')
    }
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

presentActionSheet() {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Contact via',
    buttons: [
      {
        text: 'Phone',
        handler: () => {
        this.callNumber.callNumber("+919840566748", true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
          console.log('Destructive clicked');
        }
      },{
        text: 'Email',
        handler: () => {
          this.emailComposer.addAlias('gmail', 'com.google.android.gm');

          // then use alias when sending email
                this.emailComposer.open({
                app: 'gmail',
                to:      'manjoy89@gmail.com',
                subject: 'Advertise Enquiry',
                });
          console.log('Archive clicked');
        }
      }
    ]
  });
  actionSheet.present();
}
}
interface Items {
  name: string;
  title: string,
  description: string;
  image: string;
  phone: string;
  mail: string;
  site: string;
 }
