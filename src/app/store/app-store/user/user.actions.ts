import { createAction, props } from '@ngrx/store';

export const loadUser = createAction(
  '[User] Load Users'
);

export const loadUserSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: any }>()
);

export const loadUserFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const signIn = createAction(
  '[User] Sign In'
);

export const signInSuccess = createAction(
  '[User] Sign In Success',
  props<{ data: any }>()
);

export const signInFailure = createAction(
  '[User] Sign In Failure',
  props<{ error: any }>()
);

export const signUp = createAction(
  '[User] Sign Up'
);

export const signUpSuccess = createAction(
  '[User] Sign Up Success',
  props<{ data: any }>()
);

export const signUpFailure = createAction(
  '[User] Sign Up Failure',
  props<{ error: any }>()
);

export const signOut = createAction(
  '[User] Sign Out'
);

export const signOutSuccess = createAction(
  '[User] Sign Out Success',
  props<{ data: any }>()
);

export const signOutFailure = createAction(
  '[User] Sign Out Failure',
  props<{ error: any }>()
);
