import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Observable, of, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLoggedIn = localStorage.getItem('user') !== null;
  constructor(public firebaseAuth: AngularFireAuth) {}

  async singIn(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      })
      .catch((error) => {
        this.isLoggedIn = false;
        console.error(error.message);
      });
  }
  async singUp(email: string, password: string, name: string) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.updateUserDisplayName(name);
        this.isLoggedIn = true;
      })
      .catch((error) => {
        this.isLoggedIn = false;
        console.error(error.message);
      });
  }
  async logOut() {
    await this.firebaseAuth
      .signOut()
      .then((res) => {
        this.isLoggedIn = false;
        localStorage.removeItem('user');
      })
      .catch((error) => {
        this.isLoggedIn = true;
        console.error(error.message);
      });
  }

  async createUserViaGoogle() {
    await this.firebaseAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      })
      .catch((error) => {
        this.isLoggedIn = false;
        console.error(error.message);
      });
  }

  async updateUserDisplayName(name: string) {
    let user = firebase.auth().currentUser;
    await user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  getCurrentUser() {
    return this.isLoggedIn ? JSON.parse(localStorage.getItem('user')) : null;
  }
  getCurrentUserRemote() {
    return this.firebaseAuth.currentUser;
  }
}
