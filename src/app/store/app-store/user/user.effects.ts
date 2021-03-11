import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as UserActions from './user.actions';



@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UserActions.loadUser),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => UserActions.loadUserSuccess({ data })),
          catchError(error => of(UserActions.loadUserFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
