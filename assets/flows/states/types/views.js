export const VIEWS = {
  AUTHENTICATION: {
    LOGIN: {
      SET_EMAIL: 'AUTHENTICATION/LOGIN/SET_EMAIL',
      SET_PASSWORD: 'AUTHENTICATION/LOGIN/SET_PASSWORD',
      VERIFY_AUTHENTICATION: 'AUTHENTICATION/LOGIN/VERIFY_AUTHENTICATION'
    },
    FORGOTTEN_PASSWORD: {
      SET_REQUEST_TYPE: 'AUTHENTICATION/FORGOTTEN_PASSWORD/SET_REQUEST_TYPE',
      SET_EMAIL: 'AUTHENTICATION/FORGOTTEN_PASSWORD/SET_EMAIL',
      SET_PHONE_NUMBER: 'AUTHENTICATION/FORGOTTEN_PASSWORD/SET_PHONE_NUMBER',
      SEND_RECOVERY_LINK: 'AUTHENTICATION/FORGOTTEN_PASSWORD/SEND_RECOVERY_LINK'
    },
    SIGNUP: {
      SET_FIRST_NAME: 'AUTHENTICATION/SIGNUP/SET_FIRST_NAME',
      SET_LAST_NAME: 'AUTHENTICATION/SIGNUP/SET_LAST_NAME',
      SET_USER_GROUP: 'AUTHENTICATION/SIGNUP/SET_USER_GROUP',
      SET_PHONE_NUMBER: 'AUTHENTICATION/SIGNUP/SET_PHONE_NUMBER',
      SET_EMAIL: 'AUTHENTICATION/SIGNUP/SET_EMAIL',
      SET_PASSWORD: 'AUTHENTICATION/SIGNUP/SET_PASSWORD',
      FETCH_AVAILABLE_USER_GROUPS: 'AUTHENTICATION/SIGNUP/FETCH_AVAILABLE_USER_GROUPS',
      SUBSCRIBE_THE_USER: 'AUTHENTICATION/SIGNUP/SUBSCRIBE_THE_USER',
      SET_LOADING_STATUS: 'AUTHENTICATION/SIGNUP/SET_LOADING_STATUS'
    }
  }
};
