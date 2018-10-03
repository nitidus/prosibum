import { VIEWS } from '../../../types/index';
const { SIGNUP } = VIEWS.AUTHENTICATION;

import { Views as ViewsCMD } from '../../../commands';
const CMD = ViewsCMD.Authentication.Signup;

const mapStateToProps = (state) => {
  return {
    signup: state.Signup
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFirstName: (firstName) => {
      dispatch({
        type: SIGNUP.SET_FIRST_NAME,
        payload: firstName
      })
    },
    setLastName: (lastName) => {
      dispatch({
        type: SIGNUP.SET_LAST_NAME,
        payload: lastName
      })
    },
    setUserGroup: (userGroupID) => {
      dispatch({
        type: SIGNUP.SET_USER_GROUP,
        payload: userGroupID
      })
    },
    setPhoneNumber: (phoneNumber) => {
      dispatch({
        type: SIGNUP.SET_PHONE_NUMBER,
        payload: phoneNumber
      })
    },
    setEmail: (email) => {
      dispatch({
        type: SIGNUP.SET_EMAIL,
        payload: email
      })
    },
    setPassword: (password) => {
      dispatch({
        type: SIGNUP.SET_PASSWORD,
        payload: password
      })
    },
    fetchAvailableUserGroups: async (groupType) => CMD._getUserGroupsWithType(groupType, dispatch),
    subscribeTheUser: async (userDetail) => CMD._subscribeUserWithDetail(userDetail, dispatch),
    regenerateTheUserPhoneNumberValidationToken: async (validation) => CMD._regenerateValidationToken(validation, dispatch),
    setUserGroupLoadingStatus: (loadingStatus) => {
      dispatch({
        type: SIGNUP.SET_USER_GROUP_LOADING_STATUS,
        payload: loadingStatus
      })
    },
    setSubscribeLoadingStatus: (loadingStatus) => {
      dispatch({
        type: SIGNUP.SET_SUBSCRIBE_LOADING_STATUS,
        payload: loadingStatus
      })
    },
    setCountriesCodesModalVisibility: (visibilityStatus) => {
      dispatch({
        type: SIGNUP.SET_COUNTRIES_CODES_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    reinitilizeTheState: () => {
      dispatch({
        type: SIGNUP.REINITILIZE_THE_STATE
      })
    }
  };
}

const Signup = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = Signup;
