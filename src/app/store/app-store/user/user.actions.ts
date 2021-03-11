import { UserInfo } from './../../../models/user-Info.model';
import { createAction, props } from '@ngrx/store';

export const loadUser = createAction('[User] Load Users');

export const loadUserSuccess = createAction(
  '[User] Load Users Success',
  props<{ response: any }>()
);

export const loadUserFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const signIn = createAction(
  '[User] Sign In',
  props<{ input: any }>()
);

export const signInSuccess = createAction(
  '[User] Sign In Success',
  props<{ response: UserInfo }>()
);

export const signInFailure = createAction(
  '[User] Sign In Failure',
  props<{ error: any }>()
);

export const signInViaSocial = createAction('[User] Sign In Via Social');

export const signInViaSocialSuccess = createAction(
  '[User] Sign In Via Social Success',
  props<{ response: UserInfo }>()
);

export const signInViaSocialFailure = createAction(
  '[User] Sign In Via Social Failure',
  props<{ error: any }>()
);

export const signUp = createAction(
  '[User] Sign Up',
  props<{ input: any }>()
);


export const signUpSuccess = createAction(
  '[User] Sign Up Success',
  props<{ response: UserInfo }>()
);

export const signUpFailure = createAction(
  '[User] Sign Up Failure',
  props<{ error: any }>()
);

export const signOut = createAction('[User] Sign Out');

export const signOutSuccess = createAction(
  '[User] Sign Out Success',
  props<{ response: any }>()
);

export const signOutFailure = createAction(
  '[User] Sign Out Failure',
  props<{ error: any }>()
);
