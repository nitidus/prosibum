import { VIEWS } from '../../../types/index';
const { SIGNUP } = VIEWS.AUTHENTICATION;

const initialState = {
  firstName: '',
  lastName: '',
  userGroup: '',
  phoneNumber: '',
  email: '',
  password: '',
  userGroups: [],
  loading: false,
  connected: {
    status: true,
    content: ''
  }
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
    case SIGNUP.SET_USER_GROUP:
      return {
        ...state,
        userGroup: action.payload
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
    case SIGNUP.FETCH_AVAILABLE_USER_GROUPS:
      return {
        ...state,
        userGroups: action.payload
      };
      break;
    case SIGNUP.SUBSCRIBE_THE_USER:
      return state;
      break;
    case SIGNUP.SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.payload
      };
      break;
    case SIGNUP.SET_CONNECTED_STATUS:
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
