import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Injectable()
export class LoginService {

  user: Observable<firebase.User>;
  
    constructor(public afAuth: AngularFireAuth) {
      this.user = afAuth.authState;
    }
  
    loginFB() {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
  
    logout() {
      this.afAuth.auth.signOut();
    }

}
export interface Usuario
{
key: string;
photo: string;
rutas: {};
};
