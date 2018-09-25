import { LAYOUTS } from '../../types/index';
const { COUNTRIES_CODES_MODAL } = LAYOUTS;

const initialState = {
  visibility: false,
  offset: {
    from: 0,
    to: 9
  },
  limit: 10,
  restricted_data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COUNTRIES_CODES_MODAL.SET_MODAL_VISIBILITY:
      return {
        ...state,
        visibility: action.payload
      };
      break;[...action.payload]
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
        restricted_data: [...action.payload]
      };
      break;
    case COUNTRIES_CODES_MODAL.MERGE_DATA_WITH_CAROUSEL_RESTRICTED_DATA:
      return {
        ...state,
        restricted_data: [...state.restricted_data, ...action.payload]
      };
      break;

    default:
      return state;
  }
}
