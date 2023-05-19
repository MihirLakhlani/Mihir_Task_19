// actions.js

export const signUp = (userData:any) => {
    return {
      type: 'SIGN_UP',
      payload: userData,
    };
  };
  
  export const login = (credentials:any) => {
    return {
      type: 'LOGIN',
      payload: credentials,
    };
  };
  
  export const logout = () => {
    return {
      type: 'LOGOUT',
    };
  };
  
  export const updateProfile = (updatedData:any) => {
    return {
      type: 'UPDATE_PROFILE',
      payload: updatedData,
    };
  };
  