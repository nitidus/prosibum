import { LAYOUTS } from '../../../types/index';
const { COUNTRIES_CODES_MODAL } = LAYOUTS;

const initialState = {
  visibility: false,
  currentIndex: 0,
  offset: {
    from: 0,
    to: 9
  },
  limit: 10,
  restrictedData: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COUNTRIES_CODES_MODAL.SET_MODAL_VISIBILITY:
      return {
        ...state,
        visibility: action.payload
      };
      break;
    case COUNTRIES_CODES_MODAL.SET_CAROUSEL_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.payload
      };
      break;
    case COUNTRIES_CODES_MODAL.SET_CAROUSEL_OFFSET:
      return {
        ...state,
        offset: {
          ...state.offset,
          from: action.payload.from || action.payload.start || state.offset.from,
          to: action.payload.to || action.payload.end || state.offset.to
        }
      };
      break;
    case COUNTRIES_CODES_MODAL.SET_CAROUSEL_LIMIT:
      return {
        ...state,
        limit: action.payload
      };
      break;
    case COUNTRIES_CODES_MODAL.SET_CAROUSEL_RESTRICTED_DATA:
      return {
        ...state,
        restrictedData: [...action.payload]
      };
      break;
    case COUNTRIES_CODES_MODAL.MERGE_DATA_WITH_CAROUSEL_RESTRICTED_DATA:
      return {
        ...state,
        restrictedData: [...state.restrictedData, ...action.payload]
      };
      break;

    default:
      return state;
  }
}
