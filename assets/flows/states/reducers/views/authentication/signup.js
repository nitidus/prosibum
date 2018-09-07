import { VIEWS } from '../../../types/views';

const { SIGNUP } = VIEWS.AUTHENTICATION;

const initialState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  password: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP.SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload
      };
      break;
    case SIGNUP.SET_LAST_NAME:
      return {
        ...state,
        lastName: action.payload
      };
      break;
    case SIGNUP.SET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload
      };
      break;
    case SIGNUP.SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };
      break;
    case SIGNUP.SET_PASSWORD:
      return {
        ...state,
        password: action.payload
      };
      break;
    case SIGNUP.SUBSCRIBE_THE_USER:
      return state;
      break;

    default:
      return state;
  }
}
