import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import {
  map,
  catchError,
  filter,
  take,
  switchMap,
  mergeMap,
  exhaustMap,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  isLoggedIn = localStorage.getItem('user') !== null;
  constructor(public firebaseAuth: AngularFireAuth) {}

  signIn(email: string, password: string): Observable<any> {
    return from(
      this.firebaseAuth.signInWithEmailAndPassword(email, password)
    ).pipe(
      switchMap((userCred) =>
        this.getToken().pipe(
          take(1),
          map((token) => {
            this.isLoggedIn = true;
            localStorage.setItem('user', JSON.stringify(userCred.user));
            localStorage.setItem(
              'userToken',
              JSON.stringify({ token: token, expire: '99999999' })
            );
          }),
          catchError((err) => of({ error: err }))
        )
      )
    );
  }

  signInViaGoogle(): Observable<any> {
    return from(
      this.firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    ).pipe(
      switchMap(() =>
        from(
          this.firebaseAuth.signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
          )
        ).pipe(
          switchMap((userCred) =>
            this.getToken().pipe(
              take(1),
              map((token) => {
                this.isLoggedIn = true;
                localStorage.setItem('user', JSON.stringify(userCred.user));
                localStorage.setItem(
                  'userToken',
                  JSON.stringify({ token: token, expire: '99999999' })
                );
              }),
              catchError((err) => of({ error: err }))
            )
          )
        )
      )
    );
  }

  signUp(email: string, password: string, name: string): Observable<any> {
    return from(
      this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      switchMap((userCred) =>
        from(this.updateUserDisplayName(name)).pipe(
          switchMap(() =>
            this.getToken().pipe(
              take(1),
              map((token) => {
                this.isLoggedIn = true;
                localStorage.setItem('user', JSON.stringify(userCred.user));
                localStorage.setItem(
                  'userToken',
                  JSON.stringify({ token: token, expire: '99999999' })
                );
              }),
              catchError((err) => of({ error: err }))
            )
          )
        )
      )
    );
  }

  signOut(): Observable<any> {
    return from(this.firebaseAuth.signOut()).pipe(
      map(() => {
        this.isLoggedIn = false;
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
      }),
      catchError((err) => of({ error: err }))
    );
  }

  private updateUserDisplayName(name: string): Observable<any> {
    return this.getCurrentUser().pipe(
      exhaustMap((user: firebase.User) =>
        from(user.updateProfile({ displayName: name })).pipe(
          catchError((err) => of({ error: err }))
        )
      )
    );
  }

  getCurrentUser(): Observable<any> {
    return from(this.firebaseAuth.currentUser);
  }

  getToken(): Observable<any> {
    return this.firebaseAuth.idToken;
  }

  getAuthProvider(): Observable<string> {
    return this.getCurrentUser().pipe(
      filter((user) => user !== null),
      map((user) => user.providerData[0].providerId)
    );
  }
}
