import { LAYOUTS } from '../../../types/index';
const { WAREHOUSE_MODAL } = LAYOUTS;

const initialState = {
  name: '',
  appendedResource: {},
  appendWarehouseToResourceLoading: false,
  connected: {
    status: true,
    content: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WAREHOUSE_MODAL.RESET_MODAL:
      return initialState;
      break;
    case WAREHOUSE_MODAL.SET_WAREHOUSE_NAME:
      return {
        ...state,
        name: action.payload
      };
      break;
    case WAREHOUSE_MODAL.SET_ABSORBED_WAREHOUSE:
      return {
        ...state,
        appendedResource: action.payload
      };
      break;
    case WAREHOUSE_MODAL.APPEND_WAREHOUSE_TO_RESOURCE:
      return {
        ...state,
        appendedResource: action.payload
      };
      break;
    case WAREHOUSE_MODAL.SET_APPEND_WAREHOUSE_TO_RESOURCE_LOADING_STATUS:
      return {
        ...state,
        appendWarehouseToResourceLoading: action.payload
      };
      break;
    case WAREHOUSE_MODAL.SET_CONNECTED_STATUS:
      return {
        ...state,
        connected: {
          ...state.connected,
          status: action.payload.status,
          content: action.payload.content || ''
        }
      };
      break;

    default:
      return state;
  }
}
