import { VIEWS } from '../../../types/index';
const { SIGNUP } = VIEWS.AUTHENTICATION;

import { Functions } from '../../../../../modules/index';

const _SELECTED_DIAL_CODE = Functions._getCountryDetailWithCode(),
      initialState = {
        demandMode: '',
        firstName: '',
        lastName: '',
        phone: {
          number: '',
          dialCode: _SELECTED_DIAL_CODE
        },
        email: '',
        password: '',
        role: {},
        loadingRole: false,
        loadingSubscribe: false,
        connected: {
          status: true,
          content: ''
        },
        countriesCodesModalVisibility: false
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP.SET_DEMAND_MODE:
      return {
        ...state,
        demandMode: action.payload
      };
      break;
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
    case SIGNUP.SET_PHONE_NUMBER:
      return {
        ...state,
        phone: {
          ...state.phone,
          number: action.payload.number || state.phone.number,
          dialCode: action.payload.dialCode || action.payload.dial_code || action.payload.dial || action.payload.code || state.phone.dialCode
        }
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
    case SIGNUP.FETCH_AVAILABLE_ROLE_WITH_BRAND_AND_TOKEN:
      return {
        ...state,
        role: action.payload
      };
      break;
    case SIGNUP.SUBSCRIBE_THE_USER:
      return state;
      break;
    case SIGNUP.COMPLETE_THE_USER_REGISTRATION:
      return state;
      break;
    case SIGNUP.SET_SUBSCRIBE_LOADING_STATUS:
      return {
        ...state,
        loadingSubscribe: action.payload
      };
      break;
    case SIGNUP.SET_FETCH_AVAILABLE_ROLE_WITH_BRAND_AND_TOKEN_LOADING_STATUS:
      return {
        ...state,
        loadingRole: action.payload
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
    case SIGNUP.SET_COUNTRIES_CODES_MODAL_VISIBILITY:
      return {
        ...state,
        countriesCodesModalVisibility: action.payload
      };
      break;

    case SIGNUP.REINITILIZE_THE_STATE:
      return {
        ...initialState
      };
      break;
    case SIGNUP.REGENERATE_THE_USER_PHONE_NUMBER_VALIDATION_TOKEN:
      return state;
      break;

    default:
      return state;
  }
}
