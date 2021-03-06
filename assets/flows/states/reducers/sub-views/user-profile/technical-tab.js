import { SUB_VIEWS } from '../../../types/index';
const { TECHNICAL_TAB } = SUB_VIEWS.USER_PROFILE;

const initialState = {
        brandName: '',
        brandProfilePhoto: {},
        brandRole: '',
        brandRole: {},
        cameraRollPickerModalVisibility: false,
        brandRoles: [],
        loadingBrandRole: false,
        loading: false,
        connected: {
          status: true,
          content: ''
        }
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case TECHNICAL_TAB.SET_BRAND_NAME:
      return {
        ...state,
        brandName: action.payload
      };
      break;
    case TECHNICAL_TAB.SET_BRAND_PROFILE_PHOTO:
      return {
        ...state,
        brandProfilePhoto: action.payload
      };
      break;
    case TECHNICAL_TAB.SET_CAMERA_ROLL_PICKER_MODAL_VISIBILITY:
      return {
        ...state,
        cameraRollPickerModalVisibility: action.payload
      };
      break;
    case TECHNICAL_TAB.SET_BRAND_ROLE:
      return {
        ...state,
        brandRole: action.payload
      };
      break;
    case TECHNICAL_TAB.FETCH_AVAILABLE_BRAND_ROLES:
      return {
        ...state,
        brandRoles: action.payload
      };
      break;
    case TECHNICAL_TAB.SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.payload
      };
      break;
    case TECHNICAL_TAB.SET_BRAND_ROLE_LOADING_STATUS:
      return {
        ...state,
        loadingBrandRole: action.payload
      };
      break;
    case TECHNICAL_TAB.SET_CONNECTED_STATUS:
      return {
        ...state,
        connected: {
          ...state.connected,
          status: action.payload.status,
          content: action.payload.content || ''
        }
      };
      break;
    case TECHNICAL_TAB.EDIT_USER_TECHNICAL_DATA:
      return state;
      break;

    default:
      return state;
  }
}
