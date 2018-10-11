import { LAYOUTS } from '../../types/index';
const { TOAST } = LAYOUTS;

const mapStateToProps = (state) => {
  return {
    toast: state.Toast
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMessage: (message) => {
      dispatch({
        type: TOAST.SET_MESSAGE,
        payload: message
      })
    },
    setLinkText: (linkText) => {
      dispatch({
        type: TOAST.SET_LINK,
        payload: linkText
      })
    },
    setVisibility: (visibility) => {
      dispatch({
        type: TOAST.SET_VISIBILITY,
        payload: visibility
      })
    },
    setOnLinkPress: (onLinkPressEvent) => {
      dispatch({
        type: TOAST.SET_ON_LINK_PRESS,
        payload: onLinkPressEvent
      })
    }
  };
}

const Toast = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = Toast;
