import { LAYOUTS } from '../../types/index';
const { LANGUAGES_MODAL } = LAYOUTS;

const initialState = {
  visibility: false,
  selectedLanguage: 0,
  languages: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LANGUAGES_MODAL.RESET_MODAL:
      return {
        ...initialState
      };
      break;
    case LANGUAGES_MODAL.SET_MODAL_VISIBILITY:
      return {
        ...state,
        visibility: action.payload
      };
      break;
    case LANGUAGES_MODAL.SET_SELECTED_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.payload
      };
      break;
    case LANGUAGES_MODAL.SET_LANGUAGES:
      return {
        ...state,
        languages: [...action.payload]
      };
      break;

    default:
      return state;
  }
}
