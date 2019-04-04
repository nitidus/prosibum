import { LAYOUTS } from '../../types/index';
const { LIST } = LAYOUTS;

const initialState = {
  dataSource: [],
  selectedRow: {
    previous: {},
    new: {}
  },
  targetLeaf: {
    previous: {},
    new: {}
  },
  currentDepth: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST.RESET_LIST:
      return initialState;
      break;
    case LIST.SET_LIST_DATA_SOURCE:
      return {
        ...state,
        dataSource: action.payload
      };
      break;
    case LIST.APPEND_ITEM_TO_LIST_DATA_SOURCE:
      return {
        ...state,
        dataSource: [
          ...state.dataSource,
          action.payload
        ]
      };
      break;
    case LIST.SET_SELECTED_ROW:
      return {
        ...state,
        selectedRow: {
          ...state.selectedRow,
          previous: action.payload.previous,
          new: action.payload.new
        }
      };
      break;
    case LIST.SET_SELECTED_PREVIOUS_ROW:
      return {
        ...state,
        selectedRow: {
          ...state.selectedRow,
          previous: action.payload
        }
      };
      break;
    case LIST.SET_SELECTED_NEW_ROW:
      return {
        ...state,
        selectedRow: {
          ...state.selectedRow,
          new: action.payload
        }
      };
      break;
    case LIST.SET_TARGET_LEAF:
      return {
        ...state,
        targetLeaf: {
          ...state.selectedRow,
          previous: action.payload.previous,
          new: action.payload.new
        }
      };
      break;
    case LIST.SET_TARGET_PREVIOUS_LEAF:
      return {
        ...state,
        targetLeaf: {
          ...state.selectedRow,
          previous: action.payload
        }
      };
      break;
    case LIST.SET_TARGET_NEW_LEAF:
      return {
        ...state,
        targetLeaf: {
          ...state.selectedRow,
          new: action.payload
        }
      };
      break;
    case LIST.SET_SELECTED_ROW_DEPTH:
      return {
        ...state,
        currentDepth: action.payload
      };
      break;

    default:
      return state;
  }
}
