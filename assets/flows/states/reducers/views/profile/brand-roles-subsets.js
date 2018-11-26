import { VIEWS } from '../../../types/index';
const { BRAND_ROLES_SUBSETS } = VIEWS.PROFILE;

const initialState = {
        currentTab: {},
        tabs: [],
        loadingBrandRole: false,
        connected: {
          status: true,
          content: ''
        }
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case BRAND_ROLES_SUBSETS.SET_PILOT_CURRENT_TAB:
      return {
        ...state,
        currentTab: action.payload
      };
      break;
    case BRAND_ROLES_SUBSETS.SET_PILOT_TABS:
      return {
        ...state,
        tabs: action.payload
      };
      break;
    case BRAND_ROLES_SUBSETS.FETCH_AVAILABLE_BRAND_ROLES:
          return {
            ...state,
            tabs: action.payload
          };
          break;
    case BRAND_ROLES_SUBSETS.SET_BRAND_ROLE_LOADING_STATUS:
          return {
            ...state,
            loadingBrandRole: action.payload
          };
          break;
    case BRAND_ROLES_SUBSETS.SET_CONNECTED_STATUS:
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
