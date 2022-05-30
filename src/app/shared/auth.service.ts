import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import {User} from '../models/user';


import {AlertController} from '@ionic/angular';
import {first} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RESPONSE_STATUS } from '../constants/responseStatus';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;
  profileData: any;

  user: User;
  isLogin = false;
  roleAs: string;
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public alertController: AlertController,
    private httpClient: HttpClient
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
        const displayName = this.userData.displayName;

      } else {
        localStorage.setItem('user', null);
        localStorage.setItem('displayName', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Login in with email/password
  signIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password).then((data: any) => {
      if (data && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    });
  }

  login(email: string, password: string) {
    const url = `${environment.apiUrl}/api/v1/users/login`;
    return this.httpClient.post(url, {
      email,
      password
    });
  }


  registerUser(userData: any ): Promise<any> {
    const url = `${environment.apiUrl}/api/v1/users/applicant/register`;
    return new Promise((resolve, reject) => {
      this.httpClient.post(url, userData).subscribe((res: any) => {
        if (res.status === RESPONSE_STATUS.SUCCESS && res.data) {
          resolve(res.data);
        } else {
          reject(res.message);
        }
      });
    });
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
          window.alert('Password reset email has been sent, please check your inbox.');
        }).catch((error) => {
          window.alert(error);
        });
  }

  // Returns true when user is looged in
   isLoggedIn() {
    return this.ngFireAuth.authState.pipe(first());
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
 /* GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }*/

  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
        .then((result) => {
          this.ngZone.run(() => {
            this.router.navigate(['home']);
          });
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error);
        });
  }

  // Store user in localStorage
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: { uid: any; photoURL: any; emailVerified: any; displayName: any; email: any } = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.clear();
      // TEMP SEND LOGGED OUT USER TO MAIN PAGE TO CLEAR STORAGE DURING DEV
      this.router.navigate(['']);
    });
  }

}
