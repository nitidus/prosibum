import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';

import Reducers from './reducers';

export default () => {
  const reducer = combineReducers(Reducers),
        middeware = applyMiddleware(logger);

  return createStore(reducer, {}, middeware)
}
