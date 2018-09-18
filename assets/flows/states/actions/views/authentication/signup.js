import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { SIGNUP } = VIEWS.AUTHENTICATION;

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
    fetchAvailableUserGroups: (group_type) => {
      dispatch({
        type: SIGNUP.SET_LOADING_STATUS,
        payload: true
      })

      axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/usergroups/type/${group_type}`)
        .then((response) => {
          if (response.status === 200){
            const _FINAL_RESPONSE = response.data;

            if (_FINAL_RESPONSE.meta.code === 200){
              const _DATA = _FINAL_RESPONSE.data;

              dispatch({
                type: SIGNUP.FETCH_AVAILABLE_USER_GROUPS,
                payload: _DATA
              })

              dispatch({
                type: SIGNUP.SET_USER_GROUP,
                payload: _DATA[0]
              })

              dispatch({
                type: SIGNUP.SET_LOADING_STATUS,
                payload: false
              })

              dispatch({
                type: SIGNUP.SET_CONNECTED_STATUS,
                payload: {
                  status: true
                }
              })
            }else{
              dispatch({
                type: SIGNUP.SET_LOADING_STATUS,
                payload: false
              })

              dispatch({
                type: SIGNUP.SET_CONNECTED_STATUS,
                payload: {
                  status: false,
                  content: _FINAL_RESPONSE.meta.error_message
                }
              })
            }
          }
        })
        .catch((error) => {
          if (error){
            const _ERROR_MESSAGE = error.message || error.request._response;

            dispatch({
              type: SIGNUP.SET_LOADING_STATUS,
              payload: false
            })

            dispatch({
              type: SIGNUP.SET_CONNECTED_STATUS,
              payload: {
                status: false,
                content: _ERROR_MESSAGE
              }
            })
          }
        });
    },
    subscribeTheUser: () => {
      dispatch({
        type: SIGNUP.SUBSCRIBE_THE_USERN
      })
    },
    setLoadingStatus: (loadingStatus) => {
      dispatch({
        type: SIGNUP.SET_LOADING_STATUS,
        payload: loadingStatus
      })
    }
  };
}

const Signup = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = Signup;
