import { VIEWS } from '../../../types/index';
const { VERIFY_PHONE_NUMBER } = VIEWS.AUTHENTICATION;

const initialState = {
        secretKey: '',
        validationToken: '',
        loadingFinalSubscribe: false,
        connected: {
          status: true,
          content: ''
        },
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_PHONE_NUMBER.SET_SECRET_KEY:
      return {
        ...state,
        secretKey: action.payload
      };
      break;
    case VERIFY_PHONE_NUMBER.SET_VALIDATION_TOKEN:
      return {
        ...state,
        validationToken: action.payload
      };
      break;
    case VERIFY_PHONE_NUMBER.SET_FINAL_SUBSCRIBE_LOADING_STATUS:
      return {
        ...state,
        loadingSubscribe: action.payload
      };
      break;
    case VERIFY_PHONE_NUMBER.SET_CONNECTED_STATUS:
      return {
        ...state,
        connected: {
          ...state.connected,
          status: action.payload.status,
          content: action.payload.content || ''
        }
      };
      break;
    case VERIFY_PHONE_NUMBER.VERIFY_THE_USER_PHONE_NUMBER:
      return state;
      break;
      
    default:
      return state;
  }
}
