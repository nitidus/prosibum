import user_profile from './profile/user-profile.json';
import dashboard from './profile/dashboard.json';

//User Profile datasets
import technical_tab from './profile/user-profile/technical-tab.json';
import roles from './profile/user-profile/roles.json';

//Dashboard datasets
import wallets from './profile/dashboard/wallets.json';

module.exports = {
  user_profile,
  dashboard,
  user_profile_sub_views: {
    technical_tab,
    roles
  },
  roles,
  dashboard_sub_views: {
    wallets
  },
  wallets
};
