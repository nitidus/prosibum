import Signup from './authentication/signup';
import VerifyEmail from './authentication/verify-email';
import Login from './authentication/login';
import ForgottenPassword from './authentication/forgotten-password';
import ResetPassword from './authentication/reset-password';

const Authentication = {
  Signup,
  VerifyEmail,
  Login,
  ForgottenPassword,
  ResetPassword
};

module.exports = Authentication;
