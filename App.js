import React, { Component } from 'react';
import { Provider } from 'react-redux';
import getStore from './assets/flows/states/reducer';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import {
 DashboardScreen,
 LoginScreen, SignupScreen, ForgottenPasswordScreen,
 AuthorizationScreen
 } from './views/index'

const store = getStore();

store.subscribe(() => {
  console.log("Store updated!", store.getState());
})

const ProfileStack = createStackNavigator({
  Dashboard: DashboardScreen
});

const AuthenticationStack = createStackNavigator({
  Login: LoginScreen,
  Signup: SignupScreen,
  ForgottenPassword: ForgottenPasswordScreen
});

const RootStack = createSwitchNavigator(
  {
    Authorization: AuthorizationScreen,
    Profile: ProfileStack,
    Authentication: AuthenticationStack
  },
  {
    initialRouteName: 'Authorization'
  }
);

// function setHeadline(payload){
//   return {
//     type: 'HEADLINE/SET',
//     payload
//   }
// }
// store.dispatch(setHeadline({title: 'help', subtitle: 'me'}))

export default class App extends Component<> {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
