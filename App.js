import React, { Component } from 'react';
import { Provider } from 'react-redux';
import getStore from './assets/flows/states/reducer';
import {
  createSwitchNavigator,
  createStackNavigator
} from 'react-navigation';

import {
  HomeScreen,
  AuthenticationScreen,
  AuthorizationScreen
} from './views/index'

const store = getStore();

const ProfileStack = createStackNavigator({
  Home: HomeScreen
});

const AuthenticationStack = createStackNavigator({
  Authentication: AuthenticationScreen
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

type Props = {};

// function setHeadline(payload){
//   return {
//     type: 'HEADLINE/SET',
//     payload
//   }
// }
// store.dispatch(setHeadline({title: 'help', subtitle: 'me'}))
console.log(store.getState('COMPONENTS'))

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
