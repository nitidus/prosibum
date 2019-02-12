import { LAYOUTS } from '../../types/index';
const { ROLES_MODAL } = LAYOUTS;

const initialState = {
  roles: [],
  currentRole: {},
  email: '',
  appendRolesToResources: false,
  cardinalityLoading: false,
  appendedResources: [],
  cardinal: {},
  connected: {
    status: true,
    content: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROLES_MODAL.SET_ROLES:
      return {
        ...state,
        roles: action.payload
      };
      break;
    case ROLES_MODAL.SET_CURRENT_ROLE:
      return {
        ...state,
        currentRole: action.payload
      };
      break;
    case ROLES_MODAL.SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };
      break;
    case ROLES_MODAL.APPEND_ROLES_TO_RESOURCE:
      return {
        ...state,
        appendedResources: action.payload
      };
      break;
    case ROLES_MODAL.FETCH_CARDINALITY:
      return {
        ...state,
        cardinal: action.payload
      };
      break;
    case ROLES_MODAL.SET_CARDINALITY_LOADING_STATUS:
      return {
        ...state,
        cardinalityLoading: action.payload
      };
      break;
    case ROLES_MODAL.SET_APPEND_ROLES_TO_RESOURCE_LOADING_STATUS:
      return {
        ...state,
        appendRolesToResources: action.payload
      };
      break;
    case ROLES_MODAL.SET_CONNECTED_STATUS:
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
