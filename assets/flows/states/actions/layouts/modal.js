import { LAYOUTS } from '../../types/index';
const { MODAL } = LAYOUTS;

const mapStateToProps = (state) => {
  return {
    modal: state.Modal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModalVisibility: (visibility) => {
      dispatch({
        type: MODAL.SET_MODAL_VISIBILITY,
        payload: visibility
      })
    }
  };
}

const Modal = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = Modal;
