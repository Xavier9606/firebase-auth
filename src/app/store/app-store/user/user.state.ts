export const userFeatureKey = 'user';

export interface State {
  token: string;
  user: any;
  signedIn: boolean;
  authProvidedBy: string;
  lastErrorMessage: any;
}

export const initialState: State = {
  token: '',
  user: {},
  signedIn: false,
  authProvidedBy: '',
  lastErrorMessage: null,
};
