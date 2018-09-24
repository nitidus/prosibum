import React, { Component } from 'react';
import { Provider } from 'react-redux';
import getStore from './assets/flows/states/reducer';
import { createSwitchNavigator, createStackNavigator, StackNavigator } from 'react-navigation';

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

const AuthenticationStack = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    ForgottenPassword: ForgottenPasswordScreen
  },
  {
    headerMode: 'none'
  }
);

const RootStack = createSwitchNavigator(
  {
    Profile: ProfileStack,
    Authentication: AuthenticationStack,
    Authorization: AuthorizationScreen
  },
  {
    initialRouteName: 'Authorization',
    headerMode: 'none'
  }
);

export default class App extends Component<> {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
