import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public storage: Storage,public navCtrl: NavController, public navParams: NavParams) {
   
  }

  navHome() {
    this.navCtrl.setRoot(HomePage);
  }

  datachanged(e:any){
    console.log(e);
    console.log(e.checked);
    if(e) {
      this.storage.set('intro-done', true);
    }
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

}
