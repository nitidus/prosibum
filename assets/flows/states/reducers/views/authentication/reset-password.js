import { VIEWS } from '../../../types/index';
const { RESET_PASSWORD } = VIEWS.AUTHENTICATION;

const initialState = {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
        changeThePasswordLoading: false,
        connected: {
          status: true,
          content: ''
        }
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD.SET_OLD_PASSWORD:
      return {
        ...state,
        oldPassword: action.payload
      };
      break;
    case RESET_PASSWORD.SET_NEW_PASSWORD:
      return {
        ...state,
        newPassword: action.payload
      };
      break;
    case RESET_PASSWORD.SET_NEW_PASSWORD_CONFIRMATION:
      return {
        ...state,
        newPasswordConfirmation: action.payload
      };
      break;
    case RESET_PASSWORD.CHANGE_THE_PASSWORD:
      return state;
      break;
    case RESET_PASSWORD.CHANGE_THE_PASSWORD_LOADING_STATUS:
      return {
        ...state,
        changeThePasswordLoading: action.payload
      };
      break;
    case RESET_PASSWORD.SET_CONNECTED_STATUS:
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
