import { LAYOUTS } from '../../types/index';
const { PILOT } = LAYOUTS;

const initialState = {
  currentTab: '',
  tabs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PILOT.SET_CURRENT_TAB:
      return {
        ...state,
        currentTab: action.payload
      };
      break;
    case PILOT.SET_TABS:
      return {
        ...state,
        tabs: action.payload
      };
      break;

    default:
      return state;
  }
}
