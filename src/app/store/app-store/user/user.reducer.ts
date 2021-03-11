import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import {State, initialState, userFeatureKey} from './user.state'



export const reducer = createReducer(
  initialState,

  on(UserActions.signInViaSocialSuccess, (state, {response}) =>  ({
    ...state,
    token: response.token,
    user: response.user,
    authProvidedBy: response.authProvidedBy,
    signedIn: true,
  })),
  on(UserActions.signInViaSocialFailure, (state, {error}) =>  ({
    ...state,
    token: '',
    user: {},
    authProvidedBy: '',
    signedIn: false,
    lastErrorMessage:error.message
  })),
  on(UserActions.signInSuccess, (state, {response}) =>  ({
    ...state,
    token: response.token,
    user: response.user,
    authProvidedBy: response.authProvidedBy,
    signedIn: true,
  })),
  on(UserActions.signInFailure, (state, {error}) =>  ({
    ...state,
    token: '',
    user: {},
    authProvidedBy: '',
    signedIn: false,
    lastErrorMessage:error.message
  })),
  on(UserActions.signUpSuccess, (state, {response}) =>  ({
    ...state,
    token: response.token,
    user: response.user,
    authProvidedBy: response.authProvidedBy,
    signedIn: true,
  })),
  on(UserActions.signUpFailure, (state, {error}) =>  ({
    ...state,
    token: '',
    user: {},
    authProvidedBy: '',
    signedIn: false,
    lastErrorMessage:error.message
  })),
  on(UserActions.signOutSuccess, (state, {response}) =>  ({
    ...state,
    token: '',
    user: {},
    authProvidedBy: '',
    signedIn: false,
  })),
  on(UserActions.signOutFailure, (state, {error}) =>  ({
    ...state,
    lastErrorMessage:error.message
  })),
);

