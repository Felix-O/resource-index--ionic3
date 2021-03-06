import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';
import { IndexProvider } from '../../providers/index/index';
import { AuthProvider } from '../../providers/auth/auth';
import { PopoverPage } from '../../pages/popover/popover';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  segment: 'user/:un'
})
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  loggedIn: boolean;
  userID: any;
  firstname: any;
  lastname: any;
  username: any;
  email: any;
  role: any;
  userData: any;
  profileData: any;

  constructor(
    protected app: App,
    public authService: AuthProvider,
    public indexPvdr: IndexProvider,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public navParams: NavParams) {
      this.authService.storedUser().then((value) => {
        if(value){
          this.loggedIn = true;
          this.profileData = value;
          //console.log(this.profileData);
        }
        else{
          this.loggedIn = false;
        }
      });
  }

  ionViewDidLoad() {
    this.username = this.navParams.get('un');
    //console.log(this.username);
    /**/
    this.indexPvdr.getUser(this.username).then( data => {
      this.userData = data[0];
      //console.log(this.userData);
      this.userID = this.userData._id;
      this.firstname = this.userData.firstname;
      this.lastname = this.userData.lastname;
      this.email = this.userData.email;
      this.role = this.userData.role;
    });/**/
  }

  presentPopover(ev){
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ev: ev});
  }/**/

}
