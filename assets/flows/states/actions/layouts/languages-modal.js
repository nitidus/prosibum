import { LAYOUTS } from '../../types/index';
const { LANGUAGES_MODAL } = LAYOUTS;

const mapStateToProps = (state) => {
  return {
    languagesModal: state.LanguagesModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetModal: () => {
      dispatch({
        type: LANGUAGES_MODAL.RESET_MODAL
      })
    },
    setModalVisibility: (visibility) => {
      dispatch({
        type: LANGUAGES_MODAL.SET_MODAL_VISIBILITY,
        payload: visibility
      })
    },
    setSelectedLanguage: (language) => {
      dispatch({
        type: LANGUAGES_MODAL.SET_SELECTED_LANGUAGE,
        payload: language
      })
    },
    setLanguages: (languages) => {
      dispatch({
        type: LANGUAGES_MODAL.SET_LANGUAGES,
        payload: languages
      })
    }
  };
}

const LanguagesModal = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = LanguagesModal;
