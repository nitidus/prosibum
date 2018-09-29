import Dashboard from './profile/dashboard';

import Login from './authentication/login';
import Signup from './authentication/signup';
import ForgottenPassword from './authentication/forgotten-password';
import VerifyPhoneNumber from './authentication/verify-phone-number';

import Authorization from './authorization';

module.exports = {
  DashboardScreen: Dashboard,
  LoginScreen: Login,
  SignupScreen: Signup,
  ForgottenPasswordScreen: ForgottenPassword,
  VerifyPhoneNumberScreen: VerifyPhoneNumber,
  AuthorizationScreen: Authorization
};
