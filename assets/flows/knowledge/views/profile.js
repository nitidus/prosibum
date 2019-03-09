import user_profile from './profile/user-profile.json';
import dashboard from './profile/dashboard.json';

//User Profile datasets
import technical_tab from './profile/user-profile/technical-tab.json';

import roles from './profile/user-profile/technical/roles.json';
  //Roles Subsets
  import selected_role from './profile/user-profile/technical/roles/selected-role.json';

//Dashboard datasets
import wallets from './profile/dashboard/wallets.json';
  //Wallets Subsets
  import selected_wallet from './profile/dashboard/wallets/selected-wallet.json';


module.exports = {
  user_profile,
  dashboard,
  user_profile_sub_views: {
    roles_subsets: {
      selected_role
    },
    technical_tab,
    roles
  },
  roles,
  selected_role,
  dashboard_sub_views: {
    wallets_subsets: {
      selected_wallet
    },
    wallets
  },
  selected_wallet,
  wallets
};
