import { LAYOUTS } from '../../types/index';
const { PRODUCT_UNITS_DEPENDED_MODAL } = LAYOUTS;

const initialState = {
  selectedUnit: {},
  units: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_UNITS_DEPENDED_MODAL.RESET_MODAL:
      return initialState;
      break;
    case PRODUCT_UNITS_DEPENDED_MODAL.SET_SELECTED_UNIT:
      return {
        ...state,
        selectedUnit: action.payload
      };
      break;
    case PRODUCT_UNITS_DEPENDED_MODAL.SET_UNITS:
      return {
        ...state,
        units: action.payload
      };
      break;

    default:
      return state;
  }
}
