import { VIEWS } from '../../../types/index';
const { LOGIN } = VIEWS.AUTHENTICATION;

const initialState = {
  email: '',
  password: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };
      break;
    case LOGIN.SET_PASSWORD:
      return {
        ...state,
        password: action.payload
      };
      break;
    case LOGIN.VERIFY_AUTHENTICATION:
      return state;
      break;

    default:
      return state;
  }
}
