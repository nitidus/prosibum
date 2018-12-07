import { LAYOUTS } from '../../types/index';
const { ROLES_MODAL } = LAYOUTS;


const initialState = {
  roles: [],
  currentRole: '',
  roleCount: 1
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
    case ROLES_MODAL.SET_ROLES_COUNT:
      return {
        ...state,
        roleCount: action.payload
      };
      break;

    default:
      return state;
  }
}
