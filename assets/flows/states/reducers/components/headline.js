// import { loop } from 'redux-loop';
// import { handleActions } from 'redux-actions';
// import { COMPONENTS } from '../../types/components';
//
// const { HEADLINE } = COMPONENTS;
//
// const initialState = {
//   title: '',
//   subtitle: ''
// };
//
// export default (state = initialState, action) => {
//   switch (action.type) {
//     case HEADLINE.SET:
//       return { ...state,
//         title: action.payload.title,
//         subtitle: action.payload.subtitle
//       };
//       /*
//       Object.assign({}, state, {
//         title: action.payload.title,
//         subtitle: action.payload.subtitle
//       })
//       */
//       break;
//
//     default:
//       return state;
//   }
// }
