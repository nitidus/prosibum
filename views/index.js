import { createSwitchNavigator, createStackNavigator, StackNavigator } from 'react-navigation';

//Profile Screens
import Profile from './profile/profile';

  //Technical Profile Subsets
  import Roles from './profile/profile/technical/roles';

    //Roles Subsets
    import SelectedRole from './profile/profile/technical/roles/selected-role';

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

const RolesStack = createStackNavigator({
  Roles,
  SelectedRole
}, {
  headerMode: 'none'
});

const ProfileStack = createStackNavigator({
  Profile,
  RolesStack,
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
