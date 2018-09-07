import { COMPONENTS } from '../../types/components';
const { SEGMENT } = COMPONENTS;

const mapStateToProps = (state) => {
  return {
    segment: state.Segment
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setChildrenVisibility: (childrenVisibility) => {
      dispatch({
        type: SEGMENT.SET_CHILDREN_VISIBILITY,
        payload: childrenVisibility
      })
    }
  };
}

const Segment = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = Segment;
