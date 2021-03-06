import { VIEWS } from '../../../types/index';
const { FORGOTTEN_PASSWORD } = VIEWS.AUTHENTICATION;

import { Functions } from '../../../../../modules/index';

const _SELECTED_DIAL_CODE = Functions._getCountryDetailWithCode(),
      initialState = {
        requestType: '',
        email: '',
        phone: {
          number: '',
          dialCode: _SELECTED_DIAL_CODE
        },
        countriesCodesModalVisibility: false,
        loading: false,
        connected: {
          status: true,
          content: ''
        }
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
        phone: {
          ...state.phone,
          number: action.payload.number || state.phone.number,
          dialCode: action.payload.dialCode || action.payload.dial_code || action.payload.dial || action.payload.code || state.phone.dialCode
        }
      };
      break;
    case FORGOTTEN_PASSWORD.SEND_RECOVERY_LINK:
      return state;
      break;
    case FORGOTTEN_PASSWORD.SET_COUNTRIES_CODES_MODAL_VISIBILITY:
      return {
        ...state,
        countriesCodesModalVisibility: action.payload
      };
      break;
    case FORGOTTEN_PASSWORD.SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.payload
      };
      break;
    case FORGOTTEN_PASSWORD.SET_CONNECTED_STATUS:
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
