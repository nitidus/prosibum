import { LAYOUTS } from '../../types/index';
const { LIST } = LAYOUTS;

const mapStateToProps = (state) => {
  return {
    list: state.List
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDataSource: (dataSource) => {
      dispatch({
        type: LIST.SET_LIST_DATA_SOURCE,
        payload: dataSource
      })
    },
    appendItemToDataSource: (item) => {
      dispatch({
        type: LIST.APPEND_ITEM_TO_LIST_DATA_SOURCE,
        payload: item
      })
    },
    setSelectedRow: (complexRow) => {
      dispatch({
        type: LIST.SET_SELECTED_ROW,
        payload: complexRow
      })
    },
    setSelectedPreviousRow: (row) => {
      dispatch({
        type: LIST.SET_SELECTED_PREVIOUS_ROW,
        payload: row
      })
    },
    setSelectedNewRow: (row) => {
      dispatch({
        type: LIST.SET_SELECTED_NEW_ROW,
        payload: row
      })
    },
    setTargetLeaf: (complexLeaf) => {
      dispatch({
        type: LIST.SET_TARGET_LEAF,
        payload: complexLeaf
      })
    },
    setTargetPreviousLeaf: (leaf) => {
      dispatch({
        type: LIST.SET_TARGET_PREVIOUS_LEAF,
        payload: leaf
      })
    },
    setTargetNewLeaf: (leaf) => {
      dispatch({
        type: LIST.SET_TARGET_NEW_LEAF,
        payload: leaf
      })
    },
    setCurrentDepth: (depth) => {
      dispatch({
        type: LIST.SET_SELECTED_ROW_DEPTH,
        payload: depth
      })
    }
  };
}

const List = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = List;
