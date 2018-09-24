import { LAYOUTS } from '../../types/index';
const { MODAL } = LAYOUTS;

const initialState = {
  visibility: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MODAL.SET_MODAL_VISIBILITY:
      return {
        ...state,
        visibility: action.payload
      };
      break;

    default:
      return state;
  }
}
