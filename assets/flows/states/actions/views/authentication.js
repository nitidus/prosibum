import Login from './authentication/login';
import ForgottenPassword from './authentication/forgotten-password';
import Signup from './authentication/signup';
import VerifyPhoneNumber from './authentication/verify-phone-number';
import VerifyEmail from './authentication/verify-email';

const Authentication = {
  Login,
  ForgottenPassword,
  Signup,
  VerifyPhoneNumber,
  VerifyEmail
};

module.exports = Authentication;
