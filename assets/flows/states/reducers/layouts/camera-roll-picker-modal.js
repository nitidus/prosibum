import { LAYOUTS } from '../../types/index';
const { CAMERA_ROLL_PICKER_MODAL } = LAYOUTS;

const initialState = {
  groupTypes: [
    'Album',
    'All',
    'Event',
    'Faces',
    'Library',
    'PhotoStream',
    'SavedPhotos'
  ],
  currentGroupType: 'All',
  cameraRollItems: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CAMERA_ROLL_PICKER_MODAL.SET_CAMERA_ROLL_GROUP_TYPE:
      return {
        ...state,
        currentGroupType: action.payload
      };
      break;
    case CAMERA_ROLL_PICKER_MODAL.SET_CAMERA_ROLL_ITEMS:
      return {
        ...state,
        cameraRollItems: [...action.payload]
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
