import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';

/* Components Reducers */
import Segment from './reducers/components/segment';

/* Layouts Reducers */
import CountriesCodesModal from './reducers/layouts/countries-codes-modal';
import CameraRollPickerModal from './reducers/layouts/camera-roll-picker-modal';
import Toast from './reducers/layouts/toast';

/* Views Reducers */

//Authentication
import Login from './reducers/views/authentication/login';
import ForgottenPassword from './reducers/views/authentication/fogotten-password';
import Signup from './reducers/views/authentication/signup';
import VerifyPhoneNumber from './reducers/views/authentication/verify-phone-number';

//Profile
import UserProfile from './reducers/views/profile/user-profile';
import Roles from './reducers/views/profile/roles';

/* Sub Views Reducers */

//User Profile
import TechnicalTab from './reducers/sub-views/user-profile/technical-tab';

export default () => {
  const reducer = combineReducers({
          Segment,
          Toast, CountriesCodesModal, CameraRollPickerModal,
          Login, ForgottenPassword, Signup, VerifyPhoneNumber,
          UserProfile, Roles,
          TechnicalTab
        }),
        middeware = applyMiddleware(logger);

  return createStore(reducer, {}, middeware)
}
