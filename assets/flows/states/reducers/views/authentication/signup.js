import { VIEWS } from '../../../types/index';
const { SIGNUP } = VIEWS.AUTHENTICATION;

import { countries } from '../../../../knowledge/countries.json';

const _SELECTED_DIAL_CODE = countries.find((country) => {
        if (country.code == 'US'){
          return country;
        }
      }),
      initialState = {
        firstName: '',
        lastName: '',
        userGroup: '',
        phone: {
          number: '',
          dial_code: _SELECTED_DIAL_CODE
        },
        email: '',
        password: '',
        userGroups: [],
        loading: false,
        connected: {
          status: true,
          content: ''
        },
        countries_codes_modal_visibility: false
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
        phone: {
          ...state.phone,
          number: action.payload.number || state.phone.number,
          dial_code: action.payload.dial_code || action.payload.dial || action.payload.code || state.phone.dial_code
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
    case SIGNUP.SET_COUNTRIES_CODES_MODAL_VISIBILITY:
      return {
        ...state,
        countries_codes_modal_visibility: action.payload
      };
      break;

    default:
      return state;
  }
}
