import { VIEWS } from '../../../types/index';
const { USER_PROFILE } = VIEWS.PROFILE;

const initialState = {
        currentTab: {},
        tabs: []
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE.SET_PILOT_CURRENT_TAB:
      return {
        ...state,
        currentTab: action.payload
      };
      break;
    case USER_PROFILE.SET_PILOT_TABS:
      return {
        ...state,
        tabs: action.payload
      };
      break;

    default:
      return state;
  }
}
