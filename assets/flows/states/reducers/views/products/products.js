import { VIEWS } from '../../../types/index';
const { SELF } = VIEWS.PRODUCTS;

const initialState = {
        draftedItems: []
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case SELF.SET_DRAFTED_ITEMS:
      return {
        ...state,
        draftedItems: action.payload
      };
      break;

    default:
      return state;
  }
}
