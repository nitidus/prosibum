import { createSwitchNavigator, createStackNavigator, StackNavigator } from 'react-navigation';

//Profile Screens
import Dashboard from './profile/dashboard';
import Profile from './profile/profile';

  //Profile Subsets
  import Roles from './profile/profile/roles';

//Authentication Screens
import Login from './authentication/login';
import Signup from './authentication/signup';
import ForgottenPassword from './authentication/forgotten-password';
import VerifyPhoneNumber from './authentication/verify-phone-number';

//Authorization Screen
import Authorization from './authorization';

const ProfileStack = createStackNavigator({
  // Dashboard,
  // Profile,
  Roles
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
  ProfileStack: ProfileStack,
  AuthenticationStack: AuthenticationStack,
  Authorization
}, {
  initialRouteName: 'Authorization',
  headerMode: 'none'
});

module.exports = RootStack;
