//User Profile
import self from './profile/index.json';
  //User Profile datasets
  import technical_tab from './profile/account/technical/index.json';
    //Roles
    import roles from './profile/account/technical/roles/index.json';
      //Roles Subsets
      import selected_role from './profile/account/technical/roles/selected-role.json';

module.exports = {
  user_profile_sub_views: {
    roles_subsets: {
      selected_role
    },
    technical_tab,
    roles
  },
  self,
  roles,
  selected_role
};
