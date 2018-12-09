import { LAYOUTS } from '../../types/index';
const { CAMERA_ROLL_PICKER_MODAL } = LAYOUTS;

const mapStateToProps = (state) => {
  return {
    cameraRollPickerModal: state.CameraRollPickerModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCameraRollGroupTypes: (data) => {
      dispatch({
        type: CAMERA_ROLL_PICKER_MODAL.SET_CAMERA_ROLL_GROUP_TYPES,
        payload: data
      })
    },
    setCurrentCameraRollGroupType: (groupType) => {
      dispatch({
        type: CAMERA_ROLL_PICKER_MODAL.SET_CURRENT_CAMERA_ROLL_GROUP_TYPE,
        payload: groupType
      })
    },
    setCameraRollItems: (data) => {
      dispatch({
        type: CAMERA_ROLL_PICKER_MODAL.SET_CAMERA_ROLL_ITEMS,
        payload: data
      })
    },
    mergeDataWithCameraRollItems: (data) => {
      dispatch({
        type: CAMERA_ROLL_PICKER_MODAL.MERGE_DATA_WITH_CAMERA_ROLL_ITEMS,
        payload: data
      })
    }
  };
}

const CameraRollPickerModal = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = CameraRollPickerModal;
