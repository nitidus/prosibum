import { LAYOUTS } from '../../types/index';
const { COUNTRIES_CODES_MODAL } = LAYOUTS;

const mapStateToProps = (state) => {
  return {
    countriesCodesModal: state.CountriesCodesModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModalVisibility: (visibility) => {
      dispatch({
        type: COUNTRIES_CODES_MODAL.SET_MODAL_VISIBILITY,
        payload: visibility
      })
    },
    setCarouselCurrentIndex: (currentIndex) => {
      dispatch({
        type: COUNTRIES_CODES_MODAL.SET_CAROUSEL_CURRENT_INDEX,
        payload: currentIndex
      })
    },
    setCarouselOffset: (offset) => {
      dispatch({
        type: COUNTRIES_CODES_MODAL.SET_CAROUSEL_OFFSET,
        payload: offset
      })
    },
    setCarouselLimit: (limit) => {
      dispatch({
        type: COUNTRIES_CODES_MODAL.SET_CAROUSEL_LIMIT,
        payload: limit
      })
    },
    setCarouselRestrictedData: (data) => {
      dispatch({
        type: COUNTRIES_CODES_MODAL.SET_CAROUSEL_RESTRICTED_DATA,
        payload: data
      })
    },
    mergeDataWithCarouselRestrictedData: (data) => {
      dispatch({
        type: COUNTRIES_CODES_MODAL.MERGE_DATA_WITH_CAROUSEL_RESTRICTED_DATA,
        payload: data
      })
    }
  };
}

const CountriesCodesModal = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = CountriesCodesModal;
