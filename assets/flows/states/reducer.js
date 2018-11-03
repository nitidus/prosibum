import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';

/* Components Reducers */
import Segment from './reducers/components/segment';

/* Layouts Reducers */
import CountriesCodesModal from './reducers/layouts/countries-codes-modal';
import Toast from './reducers/layouts/toast';
import Pilot from './reducers/layouts/pilot';

/* Views Reducers */

//Authentication
import Login from './reducers/views/authentication/login';
import ForgottenPassword from './reducers/views/authentication/fogotten-password';
import Signup from './reducers/views/authentication/signup';
import VerifyPhoneNumber from './reducers/views/authentication/verify-phone-number';

//Profile
import UserProfile from './reducers/views/profile/user-profile';

export default () => {
  const reducer = combineReducers({
          Segment,
          Toast, CountriesCodesModal, Pilot,
          Login, ForgottenPassword, Signup, VerifyPhoneNumber,
          UserProfile
        }),
        middeware = applyMiddleware(logger);

  return createStore(reducer, {}, middeware)
}
