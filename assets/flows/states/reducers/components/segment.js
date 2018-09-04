import { COMPONENTS } from '../../types/components';

const { SEGMENT } = COMPONENTS;

const initialState = {
  childrenVisibility: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEGMENT.SET_CHILDREN_VISIBILITY:
      return {
        ...state,
        childrenVisibility: [...action.payload]
      };
      break;

    default:
      return state;
  }
}
