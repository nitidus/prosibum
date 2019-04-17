import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';

/* Components Reducers */
import Segment from './reducers/components/segment';

/* Layouts Reducers */
import CountriesCodesModal from './reducers/layouts/countries-codes-modal';
import CameraRollPickerModal from './reducers/layouts/camera-roll-picker-modal';
import RoleModal from './reducers/layouts/role-modal';
import WalletModal from './reducers/layouts/wallet-modal';
import WarehouseModal from './reducers/layouts/warehouse-modal';
import ProductCategoriesModal from './reducers/layouts/product-categories-modal';
import ProductFeaturesModal from './reducers/layouts/product-features-modal';
import ProductUnitDependedModal from './reducers/layouts/product-unit-depended-modal';
import Toast from './reducers/layouts/toast';
import List from './reducers/layouts/list';

/* Views Reducers */

//Authentication
import Login from './reducers/views/authentication/login';
import ForgottenPassword from './reducers/views/authentication/fogotten-password';
import Signup from './reducers/views/authentication/signup';
import VerifyEmail from './reducers/views/authentication/verify-email';

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
import NewProduct from './reducers/views/products/new-product';

/* Sub Views Reducers */

//User Profile
import TechnicalTab from './reducers/sub-views/user-profile/technical-tab';

export default () => {
  const reducer = combineReducers({
          Segment,
          Toast, List, CountriesCodesModal, CameraRollPickerModal, RoleModal, WalletModal, WarehouseModal, ProductCategoriesModal, ProductFeaturesModal, ProductUnitDependedModal,
          Login, ForgottenPassword, Signup, VerifyEmail,
          Overseer, UserProfile,
            Roles, SelectedRole,
            Wallets, SelectedWallet,
            NewProduct,
          TechnicalTab
        }),
        middeware = applyMiddleware(logger);

  return createStore(reducer, {}, middeware)
}
