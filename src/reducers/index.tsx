// reducers/index.js

import { combineReducers } from 'redux';

// Define the state types for each reducer
type SignUpState = any; // Update with the actual state type for signUpReducer
type LoginState = any; // Update with the actual state type for loginReducer

const signUpReducer = (state: SignUpState | null = null, action: any) => {
  switch (action.type) {
    case 'SIGN_UP':
        console.log('Received user data:', action.payload);

      return action.payload;
      case 'UPDATE_PROFILE':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const loginReducer = (state: LoginState | null = null, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null; // Set the state to null when logging out
    default:
      return state;
  }
};

// Combine the reducers
const rootReducer = combineReducers({
  signUpData: signUpReducer,
  loggedInUser: loginReducer,
});

// Define the RootState type by combining the state types of your reducers
type RootState = ReturnType<typeof rootReducer>;

// Export the state types and RootState
export type { SignUpState, LoginState, RootState };
export default rootReducer;
