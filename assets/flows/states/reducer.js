import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';

/* Components Reducers */
import Segment from './reducers/components/segment';

/* Layouts Reducers */
import CountriesCodesModal from './reducers/layouts/countries-codes-modal';

/* Views Reducers */
import Login from './reducers/views/authentication/login';
import ForgottenPassword from './reducers/views/authentication/fogotten-password';
import Signup from './reducers/views/authentication/signup';

export default () => {
  const reducer = combineReducers({
          Segment,
          CountriesCodesModal,
          Login, ForgottenPassword, Signup
        }),
        middeware = applyMiddleware(logger);

  return createStore(reducer, {}, middeware)
}
