import user_profile from './profile/user-profile.json';
import dashboard from './profile/dashboard.json';

//User Profile datasets
import technical_tab from './profile/user-profile/technical-tab.json';
import roles from './profile/user-profile/technical/roles.json';

//Roles Subsets
import selectedRole from './profile/user-profile/technical/roles/selected-role.json';

//Dashboard datasets
import wallets from './profile/dashboard/wallets.json';

module.exports = {
  user_profile,
  dashboard,
  user_profile_sub_views: {
    roles_subsets: {
      selectedRole
    },
    technical_tab,
    roles
  },
  roles,
  selectedRole,
  dashboard_sub_views: {
    wallets
  },
  wallets
};
