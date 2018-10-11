import { LAYOUTS } from '../../types/index';
const { TOAST } = LAYOUTS;

const initialState = {
  message: '',
  link: '',
  visibility: false,
  onPress: () => {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOAST.SET_MESSAGE:
      return {
        ...state,
        message: action.payload
      };
      break;
    case TOAST.SET_LINK:
      return {
        ...state,
        link: action.payload
      };
      break;
    case TOAST.SET_ON_LINK_PRESS:
      return {
        ...state,
        onPress: action.payload
      };
      break;
    case TOAST.SET_VISIBILITY:
      return {
        ...state,
        visibility: action.payload
      };
      break;

    default:
      return state;
  }
}
