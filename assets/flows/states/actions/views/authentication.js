import Login from './authentication/login';
import ForgottenPassword from './authentication/forgotten-password';
import Signup from './authentication/signup';
import VerifyEmail from './authentication/verify-email';
import ResetPassword from './authentication/reset-password';

const Authentication = {
  Login,
  ForgottenPassword,
  Signup,
  VerifyEmail,
  ResetPassword
};

module.exports = Authentication;
