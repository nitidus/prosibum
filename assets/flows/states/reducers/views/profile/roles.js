import { VIEWS } from '../../../types/index';
const { ROLES } = VIEWS.PROFILE;

const initialState = {
        currentTab: {},
        tabs: [],
        rolesModalVisibility: false,
        loadingRoles: false,
        connected: {
          status: true,
          content: ''
        }
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case ROLES.SET_PILOT_CURRENT_TAB:
      return {
        ...state,
        currentTab: action.payload
      };
      break;
    case ROLES.SET_PILOT_TABS:
      return {
        ...state,
        tabs: action.payload
      };
      break;
    case ROLES.SET_ROLES_MODAL_VISIBILITY:
      return {
        ...state,
        rolesModalVisibility: action.payload
      };
      break;
    case ROLES.FETCH_AVAILABLE_ROLES:
          return {
            ...state,
            tabs: action.payload
          };
          break;
    case ROLES.SET_ROLES_LOADING_STATUS:
          return {
            ...state,
            loadingRoles: action.payload
          };
          break;
    case ROLES.SET_CONNECTED_STATUS:
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
