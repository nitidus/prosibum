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
import VerifyPhoneNumber from './reducers/views/authentication/verify-phone-number';

export default () => {
  const reducer = combineReducers({
          Segment,
          CountriesCodesModal,
          Login, ForgottenPassword, Signup, VerifyPhoneNumber
        }),
        middeware = applyMiddleware(logger);

  return createStore(reducer, {}, middeware)
}
