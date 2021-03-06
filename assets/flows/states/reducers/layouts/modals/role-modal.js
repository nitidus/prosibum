import { LAYOUTS } from '../../../types/index';
const { ROLE_MODAL } = LAYOUTS;

const initialState = {
  reference: {},
  roles: [],
  currentRole: {},
  email: '',
  appendRolesToResources: false,
  cardinalityLoading: false,
  loadingRolesType: false,
  appendedResources: [],
  cardinal: {},
  connected: {
    status: true,
    content: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROLE_MODAL.RESET_MODAL:
      return initialState;
      break;
    case ROLE_MODAL.SET_REFERENCE:
      return {
        ...state,
        reference: action.payload
      };
      break;
    case ROLE_MODAL.SET_ROLES:
      return {
        ...state,
        roles: action.payload
      };
      break;
    case ROLE_MODAL.SET_CURRENT_ROLE:
      return {
        ...state,
        currentRole: action.payload
      };
      break;
    case ROLE_MODAL.SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };
      break;
    case ROLE_MODAL.APPEND_ROLES_TO_RESOURCE:
      return {
        ...state,
        appendedResources: action.payload
      };
      break;
    case ROLE_MODAL.FETCH_CARDINALITY:
      return {
        ...state,
        cardinal: action.payload
      };
      break;
    case ROLE_MODAL.FETCH_AVAILABLE_ROLES_TYPE:
      return {
        ...state,
        roles: action.payload
      };
      break;
    case ROLE_MODAL.SET_ROLES_TYPE_LOADING_STATUS:
      return {
        ...state,
        loadingRolesType: action.payload
      };
      break;
    case ROLE_MODAL.SET_CARDINALITY_LOADING_STATUS:
      return {
        ...state,
        cardinalityLoading: action.payload
      };
      break;
    case ROLE_MODAL.SET_APPEND_ROLES_TO_RESOURCE_LOADING_STATUS:
      return {
        ...state,
        appendRolesToResources: action.payload
      };
      break;
    case ROLE_MODAL.SET_CONNECTED_STATUS:
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
