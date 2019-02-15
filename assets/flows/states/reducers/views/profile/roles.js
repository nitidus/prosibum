import { VIEWS } from '../../../types/index';
const { ROLES } = VIEWS.PROFILE;

const initialState = {
        selectedReferenceRole: {},
        currentTab: {},
        tabs: [],
        roles: [],
        rolesModalVisibility: false,
        loadingRolesType: false,
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
    case ROLES.SET_SELECTED_REFERENCE_ROLE:
      return {
        ...state,
        selectedReferenceRole: action.payload
      };
      break;
    case ROLES.RESET_SELECTED_REFERENCE_ROLE:
      return {
        ...state,
        selectedReferenceRole: initialState.selectedReferenceRole
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
            roles: action.payload
          };
          break;
    case ROLES.FETCH_AVAILABLE_ROLES_TYPE:
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
    case ROLES.SET_ROLES_TYPE_LOADING_STATUS:
          return {
            ...state,
            loadingRolesType: action.payload
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
