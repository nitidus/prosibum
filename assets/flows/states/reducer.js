import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';

import Segment from './reducers/components/segment';

export default () => {
  const reducer = combineReducers({
          Segment
        }),
        middeware = applyMiddleware(logger);

  return createStore(reducer, {}, middeware)
}
