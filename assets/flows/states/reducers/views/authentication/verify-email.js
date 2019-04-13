import { VIEWS } from '../../../types/index';
const { VERIFY_EMAIL } = VIEWS.AUTHENTICATION;

const initialState = {
        validationToken: '',
        verifyTheUserEmailAddressLoading: false,
        connected: {
          status: true,
          content: ''
        },
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_EMAIL.SET_VALIDATION_TOKEN:
      return {
        ...state,
        validationToken: action.payload
      };
      break;
    case VERIFY_EMAIL.SET_VERIFY_THE_USER_EMAIL_ADDRESS_LOADING_STATUS:
      return {
        ...state,
        verifyTheUserEmailAddressLoading: action.payload
      };
      break;
    case VERIFY_EMAIL.SET_CONNECTED_STATUS:
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
