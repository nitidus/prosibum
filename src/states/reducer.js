import {createStore, compose as reduxCompose} from 'redux';
import {combineReducers, install} from 'redux-loop';

export default () => {
  const compose = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose;

  const reducer = combineReducers({});
  const enhancer = (compose)(install());

  return createStore(reducer, enhancer)
}
