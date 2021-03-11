import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import {State, initialState} from './user.state'



export const reducer = createReducer(
  initialState,

  on(UserActions.loadUser, state => state),
  on(UserActions.loadUserSuccess, (state, action) => state),
  on(UserActions.loadUserFailure, (state, action) => state),

);

