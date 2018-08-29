import { createStore, compose as reduxCompose } from 'redux';
import { combineReducers, install } from 'redux-loop';

// import COMPONENTS from './reducers/components';

export default () => {
  const compose = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose;

  const reducer = combineReducers({});
  const enhancer = (compose)(install());

  return createStore(reducer, enhancer)
}
