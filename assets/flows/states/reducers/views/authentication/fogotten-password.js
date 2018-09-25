import { VIEWS } from '../../../types/index';
const { FORGOTTEN_PASSWORD } = VIEWS.AUTHENTICATION;

import { Functions } from '../../../../../modules/index';

const _SELECTED_DIAL_CODE = Functions._getCountryDetailWithCode(),
      initialState = {
        requestType: '',
        email: '',
        phone: {
          number: '',
          dial_code: _SELECTED_DIAL_CODE
        },
        countries_codes_modal_visibility: false
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
          dial_code: action.payload.dial_code || action.payload.dial || action.payload.code || state.phone.dial_code
        }
      };
      break;
    case FORGOTTEN_PASSWORD.SEND_RECOVERY_LINK:
      return state;
      break;
    case FORGOTTEN_PASSWORD.SET_COUNTRIES_CODES_MODAL_VISIBILITY:
      return {
        ...state,
        countries_codes_modal_visibility: action.payload
      };
      break;

    default:
      return state;
  }
}
