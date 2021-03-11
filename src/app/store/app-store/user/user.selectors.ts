import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.state';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const getUserToken = createSelector(selectUserState, (state) =>
  state ? state.token : null
);

export const getUser = createSelector(selectUserState, (state) =>
  state ? state.user : null
);

export const getLoggedIn = createSelector(selectUserState, (state) =>
  state ? state.token : null
);

export const getAuthProvidedBy = createSelector(selectUserState, (state) =>
  state ? state.authProvidedBy : null
);

export const getLastErrorMessage = createSelector(selectUserState, (state) =>
  state ? state.lastErrorMessage : null
);
