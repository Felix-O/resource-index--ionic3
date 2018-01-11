import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { MapProvider } from '../../providers/map/map';
import { IndexProvider } from '../../providers/index/index';
import { PopoverController } from 'ionic-angular';

//declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //@ViewChild('map') mapRef: ElementRef;
  //gMap: any;
  userData = [];

  constructor(/**/
    public popoverCtrl: PopoverController/**/,
    public navCtrl: NavController/**/,
    //public mapPvdr: MapProvider/**/,
    public indexPvdr: IndexProvider/**/) {

  }

  ionViewDidLoad(){
      //this.mapPvdr.showMap(this.mapRef.nativeElement);
      //this.showMap();
      this.indexPvdr.getUsers().then((data) => {
        this.userData = data;
        //console.log(res.json());
      });
  }

  goToLogin(){
  }

  goToUser(userID, firstname, lastname, username){
    this.navCtrl.setRoot('UserPage', { uid: userID, fn: firstname, ln: lastname, un: username });
  }

  presentPopover(ev){
    let popover = this.popoverCtrl.create('PopoverPage');
    popover.present({ev: ev});
  }

}
