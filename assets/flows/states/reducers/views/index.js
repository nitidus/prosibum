import Authentication from './authentication';
import Dashboard from './dashboard';
import Products from './products';
import Profile from './profile';

module.exports = {
  ...Authentication,
  ...Dashboard,
  ...Products,
  ...Profile
};
