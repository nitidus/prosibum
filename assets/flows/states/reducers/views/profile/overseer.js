import { VIEWS } from '../../../types/index';
const { OVERSEER } = VIEWS.PROFILE;

const initialState = {
        currentTab: '',
        tabs: []
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case OVERSEER.SET_BOTTOM_PILOT_TAB_BAR_CURRENT_TAB:
      return {
        ...state,
        currentTab: action.payload
      };
      break;
    case OVERSEER.SET_BOTTOM_PILOT_TAB_BAR_TABS:
      return {
        ...state,
        tabs: action.payload
      };
      break;

    default:
      return state;
  }
}
