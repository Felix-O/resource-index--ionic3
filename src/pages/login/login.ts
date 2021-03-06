import { Component } from '@angular/core';
import { App, Platform, IonicPage, NavController, ViewController, LoadingController, ToastController, ToastOptions, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
//import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { GooglePlus } from '@ionic-native/google-plus';

//declare var window: any;

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  //providers: [GooglePlus]
})
export class LoginPage {

    authState: any = null;
    m1: any;
    m2: any;
    m3: any;
    email: string;
    password: string;
    loading: any;
    //user: Observable<firebase.User>;
    body: any;
    toastOptions: ToastOptions;

    constructor(
      private alertCtrl: AlertController,
      protected app: App,
      private afAuth: AngularFireAuth,
      public toast: ToastController,
      private googlePlus: GooglePlus,
      private platform: Platform,
      public viewCtrl: ViewController,
      public navCtrl: NavController,
      public authService: AuthProvider,
      public loadingCtrl: LoadingController) {
        //this.user = this.afAuth.authState;/**/
    }  // Returns true if user is logged in

    ionViewDidEnter(){
    }

    ionViewDidLoad() {
      this.logout();
    }

    showAlert(m1?, m2?, m3?) {
      m1 = m1 || "...";
      m2 = m2 || "";
      m3 = m3 || "";
      let alert = this.alertCtrl.create({
        title: 'Credentials',
        subTitle: m1 + " " + m2 + " " + m3,
        buttons: ['Dismiss']
      });
      alert.present();
      console.log(m1);
      console.log(m2);
      console.log(m3);
    }

    /*
    get authenticated(): boolean {
      return this.authState !== null;
    }

    // Returns current user data
    get currentUser(): any {
      return this.authenticated ? this.authState : null;
    }

    // Returns
    get currentUserObservable(): any {
      return this.afAuth.authState
    }

    // Returns current user UID
    get currentUserId(): string {
      return this.authenticated ? this.authState.uid : '';
    }

    // Anonymous User
    get currentUserAnonymous(): boolean {
      return this.authenticated ? this.authState.isAnonymous : false
    }

    // Returns current user display name or Guest
    get currentUserDisplayName(): string {
      if (!this.authState) { return 'Guest' }
      else if (this.currentUserAnonymous) { return 'Anonymous' }
      else { return this.authState['displayName'] || 'User without a Name' }
    }/**/

    googleLogin(){
      this.showLoader();
      if (this.platform.is('cordova')) {
        this.nativeGoogleLogin();
      } else {
          this.googleRedirect();
      }
    }

    async googlePopup(): Promise<void>{
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        //const credential =
        await this.afAuth.auth.signInWithPopup(provider);
      } catch (err) {
        this.m1 = err;
      }
    }

    googleRedirect() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        this.afAuth.auth.signInWithRedirect(provider);
      } catch (err) {
        this.m1 = err;
      }
    }

    async nativeGoogleLogin(): Promise<void> {
      try {
        const gplusUser = await this.googlePlus.login({
          'webClientId': '602320724221-45ne6ra24g7n2b9velck9dv94hlaqghp.apps.googleusercontent.com',
          'offline': true,
          'scopes': 'profile email'
        })
        return await this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
      } catch(err) {
        this.m1 = err;
      }
    }

    login(){
        this.showLoader();
        let credentials = {
            email: this.email,
            password: this.password
        };
        this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            //console.log(result);
            //this.app.getRootNav().setRoot('ProfilePage');
            this.reloadCurrentPage();
        }, (err) => {
            this.loading.dismiss();
            //console.log(err);
        });
    }

    checkAuthentication(){
      this.showLoader();
      //Check if already authenticated
      this.authService.checkAuthentication().then((res) => {
          console.log("Already authorized");
          //this.loading.dismiss();
          this.app.getRootNav().setRoot('ProfilePage');
          //this.close();
      }, (err) => {
          console.log("Not already authorized");
          //this.loading.dismiss();
      });
    }

    userObject(result){
      return this.body = {
        googleId: result.user.uid,
        googleProfilePic: result.user.photoURL,
        firstname: result.additionalUserInfo.profile.given_name,
        lastname: result.additionalUserInfo.profile.family_name,
        username: result.user.displayName,
        email: result.user.email,
        password: 'bust4all'
      };
    }

    toastA(message){
      this.toastOptions = {
        message: message,
        duration: 3000
      }
      return this.toast.create(this.toastOptions);
    }

    reloadCurrentPage(){
      this.app.getRootNav().setRoot(this.app.getRootNav().getActive().component);
      this.close();
    }

    launchSignup(){
        this.app.getRootNav().setRoot('RegisterPage');
        this.close();
    }

    logout(){
      return this.afAuth.auth.signOut();
    }

    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        this.loading.present();
    }

    close(){
      this.viewCtrl.dismiss();
    }

}
