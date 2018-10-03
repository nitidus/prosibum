import { VIEWS } from '../../../types/index';
const { LOGIN } = VIEWS.AUTHENTICATION;

const initialState = {
  email: '',
  password: '',
  loading: false,
  connected: {
    status: true,
    content: ''
  }
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
    case LOGIN.SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.payload
      };
      break;
    case LOGIN.SET_CONNECTED_STATUS:
      return {
        ...state,
        connected: {
          ...state.connected,
          status: action.payload.status,
          content: action.payload.content || ''
        }
      };
      break;

    default:
      return state;
  }
}
