import { VIEWS } from '../../../types/index';
const { SELF } = VIEWS.DASHBOARD;

const initialState = {
        overallDetail: {},
        loadingOverallDetail: false,
        connected: {
          status: true,
          content: ''
        }
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case SELF.FETCH_CURRENT_USER_OVERALL_DETAIL:
      return {
        ...state,
        overallDetail: action.payload
      };
      break;
    case SELF.SET_OVERALL_DETAIL_LOADING_STATUS:
      return {
        ...state,
        loadingOverallDetail: action.payload
      };
      break;
    case SELF.SET_CONNECTED_STATUS:
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
