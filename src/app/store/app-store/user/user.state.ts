export const userFeatureKey = 'user';

export interface State {
  token: string;
  user: object;
  loggedIn: boolean;
  authProvidedBy: string;
  lastErrorMessage: string;
}

export const initialState: State = {
  token: '',
  user: {},
  loggedIn: false,
  authProvidedBy: '',
  lastErrorMessage: '',
};
