import { VIEWS } from '../../../types/index';
const { OVERSEER } = VIEWS.PROFILE;

const initialState = {
        language: {},
        currentTopTab: {},
        topTabs: [],
        currentBottomTab: {},
        bottomTabs: [],
        currentUserDetail: {}
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case OVERSEER.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
      break;
    case OVERSEER.SET_TOP_PILOT_BAR_CURRENT_TAB:
      return {
        ...state,
        currentTopTab: action.payload
      };
      break;
    case OVERSEER.SET_TOP_PILOT_BAR_TABS:
      return {
        ...state,
        topTabs: action.payload
      };
      break;
    case OVERSEER.SET_BOTTOM_PILOT_TAB_BAR_CURRENT_TAB:
      return {
        ...state,
        currentBottomTab: action.payload
      };
      break;
    case OVERSEER.SET_BOTTOM_PILOT_TAB_BAR_TABS:
      return {
        ...state,
        bottomTabs: action.payload
      };
      break;
    case OVERSEER.SET_CURRENT_USER_DETAIL:
      return {
        ...state,
        currentUserDetail: action.payload
      };
      break;

    default:
      return state;
  }
}
