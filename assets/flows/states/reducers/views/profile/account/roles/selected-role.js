import { VIEWS } from '../../../../../types/index';
const { SELECTED_ROLE } = VIEWS.PROFILE;

const initialState = {
        selectedReferenceRole: {},
        roles: [],
        rolesModalVisibility: false,
        loadingRoles: false,
        connected: {
          status: true,
          content: ''
        }
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_ROLE.RESET_SELECTED_ROLE:
      return initialState;
      break;
    case SELECTED_ROLE.SET_SELECTED_REFERENCE_ROLE:
      return {
        ...state,
        selectedReferenceRole: action.payload
      };
      break;
    case SELECTED_ROLE.RESET_SELECTED_REFERENCE_ROLE:
      return {
        ...state,
        selectedReferenceRole: initialState.selectedReferenceRole
      };
      break;
    case SELECTED_ROLE.SET_ROLES_MODAL_VISIBILITY:
      return {
        ...state,
        rolesModalVisibility: action.payload
      };
      break;
    case SELECTED_ROLE.FETCH_AVAILABLE_ROLES:
          return {
            ...state,
            roles: action.payload
          };
          break;
    case SELECTED_ROLE.SET_ROLES_LOADING_STATUS:
          return {
            ...state,
            loadingRoles: action.payload
          };
          break;
    case SELECTED_ROLE.SET_CONNECTED_STATUS:
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
