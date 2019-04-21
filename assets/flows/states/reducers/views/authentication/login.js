import { VIEWS } from '../../../types/index';
const { LOGIN } = VIEWS.AUTHENTICATION;

const initialState = {
  language: {},
  token: '',
  password: '',
  loading: false,
  languagesModalVisibility: false,
  connected: {
    status: true,
    content: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
      break;
    case LOGIN.SET_TOKEN:
      return {
        ...state,
        token: action.payload
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
    case LOGIN.SET_LANGUAGES_MODAL_VISIBILITY:
      return {
        ...state,
        languagesModalVisibility: action.payload
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
