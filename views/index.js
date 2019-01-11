import { createSwitchNavigator, createStackNavigator, StackNavigator } from 'react-navigation';

//Profile Screens
import Profile from './profile/profile';

  //Profile Subsets
  import Roles from './profile/profile/roles';

  //Dashboard Subsets
  import Wallets from './profile/dashboard/wallets';

//Authentication Screens
import Login from './authentication/login';
import Signup from './authentication/signup';
import ForgottenPassword from './authentication/forgotten-password';
import VerifyPhoneNumber from './authentication/verify-phone-number';

//Authorization Screen
import Authorization from './authorization';

//Overseer Screen
import Overseer from './overseer';

const ProfileStack = createStackNavigator({
  Profile,
  Roles,
  Wallets
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
  VerifyPhoneNumber
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
