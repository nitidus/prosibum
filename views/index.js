import { createSwitchNavigator, createStackNavigator, StackNavigator } from 'react-navigation';

//Profile Screens
import Profile from './profile';

  //Technical Profile Subsets
  import Roles from './profile/account/technical/roles';

    //Roles Subsets
    import SelectedRole from './profile/account/technical/roles/selected-role';

//Dashboard Subsets
import Wallets from './dashboard/wallets';

  //Wallets Subsets
  import SelectedWallet from './dashboard/wallets/selected-wallet';

//Products Subsets

  //New Product Subsets
  import NewProductIdentity from './products/new-product-identity';
  import NewProductDescription from './products/new-product-description';
  import NewProductFeatures from './products/new-product-features';
  import NewProductPhotos from './products/new-product-photos';

  //New Fragment Subsets
  import NewFragmentDetection from './products/new-fragment-detection';
  import NewFragmentIdentity from './products/new-fragment-identity';
  import NewFragmentFeatures from './products/new-fragment-features';
  import NewFragmentPrices from './products/new-fragment-prices';
  import NewFragmentShippingMethods from './products/new-fragment-shipping-methods';

//Authentication Screens
import Login from './authentication/login';
import Signup from './authentication/signup';
import ForgottenPassword from './authentication/forgotten-password';
import VerifyPhoneNumber from './authentication/verify-phone-number';
import VerifyEmail from './authentication/verify-email';

//Authorization Screen
import Authorization from './authorization';

//Overseer Screen
import Overseer from './overseer';

const ProductsStack = createStackNavigator({
  NewFragmentDetection,
  NewFragmentIdentity,
  NewProductIdentity,
  NewProductDescription,
  NewFragmentFeatures,
  NewProductFeatures,
  NewProductPhotos,
  NewFragmentPrices,
  NewFragmentShippingMethods
}, {
  headerMode: 'none'
});

const RolesStack = createStackNavigator({
  Roles,
  SelectedRole
}, {
  headerMode: 'none'
});

const WalletsStack = createStackNavigator({
  Wallets,
  SelectedWallet
}, {
  headerMode: 'none'
});

const ProfileStack = createStackNavigator({
  Profile,
  RolesStack,
  WalletsStack,
  ProductsStack
}, {
  headerMode: 'none'
});

const OverseerStack = createStackNavigator({
  Overseer,
  ProfileStack: ProfileStack
}, {
  headerMode: 'none'
});

const AuthenticationStack = createStackNavigator({
  Login,
  Signup,
  ForgottenPassword,
  VerifyPhoneNumber,
  VerifyEmail
}, {
  headerMode: 'none'
});

const RootStack = createSwitchNavigator({
  OverseerStack,
  Authentication: AuthenticationStack,
  Authorization
}, {
  initialRouteName: 'Authorization',
  headerMode: 'none'
});

module.exports = RootStack;
