import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


/**
 * Generated class for the AffiliatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-affiliate',
  templateUrl: 'affiliate.html',
})
export class AffiliatePage {

itemsCollection: AngularFirestoreCollection<Items>; //Firestore collection
items: Observable<Items[]>; // read collection

  constructor(public afs: AngularFirestore,public navCtrl: NavController, public navParams: NavParams) {

    this.itemsCollection = this.afs.collection('Affiliate'); //ref()
    this.items = this.itemsCollection.valueChanges()

    this.items.subscribe((data)=>{
      console.log('data',data)
    })
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AffiliatePage');
  }

  Buy(url: string){

    window.open(url, '_system');
  }

}
interface Items {
  image: string;
  url: string;
 }
