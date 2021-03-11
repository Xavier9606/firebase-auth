import { UserInfo } from './../../../models/user-Info.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  exhaustMap,
  switchMap,
  mergeMap,
  take,
  tap,
} from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import * as UserActions from './user.actions';
import { FirebaseService } from 'src/app/services/firebase.service';
import { State, initialState } from './user.state';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  // loadUsers$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(UserActions.loadUser),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map((response) => UserActions.loadUserSuccess({ response })),
  //         catchError((error) => of(UserActions.loadUserFailure({ error })))
  //       )
  //     )
  //   );
  // });

  signInViaGoogle$ = createEffect(
    (): Observable<any> =>
      this.actions$.pipe(
        ofType(UserActions.signInViaSocial),
        exhaustMap((action) =>
          this.firebaseService.signInViaGoogle().pipe(
            take(1),
            map((response) => UserActions.signInViaSocialSuccess({ response })),
            catchError((err) =>
              of(UserActions.signInViaSocialFailure({ error: err }))
            )
          )
        )
      )
  );

  // signInViaGoogleSuccess$ = createEffect(
  //   (): Observable<any> =>
  //     this.actions$.pipe(
  //       ofType(UserActions.signInViaSocialSuccess),
  //       tap(() => {this.router.navigate(['/home'])})
  //     )
  // );

  signIn$ = createEffect(
    (): Observable<any> =>
      this.actions$.pipe(
        ofType(UserActions.signIn),
        exhaustMap((action) =>
          this.firebaseService
            .signIn(action.input.email, action.input.password)
            .pipe(
              take(1),
              map((response) => UserActions.signInSuccess({ response })),
              catchError((err) => of(UserActions.signInFailure({ error: err })))
            )
        )
      )
  );

  signUp$ = createEffect(
    (): Observable<any> =>
      this.actions$.pipe(
        ofType(UserActions.signUp),
        exhaustMap((action) =>
          this.firebaseService
            .signUp(
              action.input.email,
              action.input.password,
              action.input.name
            )
            .pipe(
              take(1),
              map((response) => UserActions.signUpSuccess({ response })),
              catchError((err) => of(UserActions.signUpFailure({ error: err })))
            )
        )
      )
  );

  signOut$ = createEffect(
    (): Observable<any> =>
      this.actions$.pipe(
        ofType(UserActions.signOut),
        exhaustMap((action) =>
          this.firebaseService.signOut().pipe(
            take(1),
            map((response) => UserActions.signOutSuccess({ response })),
            catchError((err) => of(UserActions.signOutFailure({ error: err })))
          )
        )
      )
  );

  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}
}
