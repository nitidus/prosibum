import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';

/* Components Reducers */
import Segment from './reducers/components/segment';

/* Layouts Reducers */
import CountriesCodesModal from './reducers/layouts/countries-codes-modal';
import CameraRollPickerModal from './reducers/layouts/camera-roll-picker-modal';
import RolesModal from './reducers/layouts/roles-modal';
import WalletModal from './reducers/layouts/wallet-modal';
import Toast from './reducers/layouts/toast';

/* Views Reducers */

//Authentication
import Login from './reducers/views/authentication/login';
import ForgottenPassword from './reducers/views/authentication/fogotten-password';
import Signup from './reducers/views/authentication/signup';
import VerifyPhoneNumber from './reducers/views/authentication/verify-phone-number';

//Profile
import Overseer from './reducers/views/profile/overseer';
import UserProfile from './reducers/views/profile/user-profile';
  //Account
  import Roles from './reducers/views/profile/account/roles';
  import SelectedRole from './reducers/views/profile/account/roles/selected-role';

//Dashboard

  //Wallets
  import Wallets from './reducers/views/dashboard/wallets';
  import SelectedWallet from './reducers/views/dashboard/wallets/selected-wallet';

//Products
import NewProductIdentity from './reducers/views/products/new-product-identity';

/* Sub Views Reducers */

//User Profile
import TechnicalTab from './reducers/sub-views/user-profile/technical-tab';

export default () => {
  const reducer = combineReducers({
          Segment,
          Toast, CountriesCodesModal, CameraRollPickerModal, RolesModal, WalletModal,
          Login, ForgottenPassword, Signup, VerifyPhoneNumber,
          Overseer, UserProfile,
            Roles, SelectedRole,
            Wallets, SelectedWallet,
            NewProductIdentity,
          TechnicalTab
        }),
        middeware = applyMiddleware(logger);

  return createStore(reducer, {}, middeware)
}
