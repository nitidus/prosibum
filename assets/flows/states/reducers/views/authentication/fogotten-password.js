import { VIEWS } from '../../../types/index';
const { FORGOTTEN_PASSWORD } = VIEWS.AUTHENTICATION;

const initialState = {
  requestType: '',
  email: '',
  phoneNumber: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FORGOTTEN_PASSWORD.SET_REQUEST_TYPE:
      return {
        ...state,
        requestType: action.payload
      };
      break;
    case FORGOTTEN_PASSWORD.SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };
      break;
    case FORGOTTEN_PASSWORD.SET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload
      };
      break;
    case FORGOTTEN_PASSWORD.SEND_RECOVERY_LINK:
      return state;
      break;

    default:
      return state;
  }
}
