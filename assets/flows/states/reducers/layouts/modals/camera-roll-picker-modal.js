import { LAYOUTS } from '../../../types/index';
const { CAMERA_ROLL_PICKER_MODAL } = LAYOUTS;

const initialState = {
  groupTypes: [],
  currentGroupType: {},
  cameraRollItems: [],
  endCursor: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CAMERA_ROLL_PICKER_MODAL.SET_CAMERA_ROLL_GROUP_TYPES:
      return {
        ...state,
        groupTypes: action.payload
      };
      break;
    case CAMERA_ROLL_PICKER_MODAL.SET_CURRENT_CAMERA_ROLL_GROUP_TYPE:
      return {
        ...state,
        currentGroupType: action.payload
      };
      break;
    case CAMERA_ROLL_PICKER_MODAL.SET_CAMERA_ROLL_ITEMS:
      return {
        ...state,
        cameraRollItems: action.payload
      };
      break;
    case CAMERA_ROLL_PICKER_MODAL.APPEND_CAMERA_ROLL_ITEMS:
      return {
        ...state,
        cameraRollItems: [
          ...state.cameraRollItems,
          ...action.payload
        ]
      };
      break;
    case CAMERA_ROLL_PICKER_MODAL.SET_CAMERA_ROLL_END_CURSOR:
      return {
        ...state,
        endCursor: action.payload
      };
      break;
    case CAMERA_ROLL_PICKER_MODAL.MERGE_DATA_WITH_CAMERA_ROLL_ITEMS:
      return {
        ...state,
        cameraRollItems: [...state.cameraRollItems, ...action.payload]
      };
      break;

    default:
      return state;
  }
}
