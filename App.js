import React, { Component } from 'react';
import { Linking } from 'react-native';

import DeepLinking from 'react-native-deep-linking';
import { Provider } from 'react-redux';
import getStore from './assets/flows/states/reducer';

import RootStack from './views/index';

import { name as appName } from './app.json';

const store = getStore();

store.subscribe(() => {
  console.log("Store updated.", store.getState());
})

export default class App extends Component<> {
  componentDidMount() {
    DeepLinking.addScheme(`${appName}://`);
    Linking.addEventListener('url', this.handleUrl);

    DeepLinking.addRoute('/test/:id/details', (response) => {
      //prosibum://join/villa/invite/enQtNTM4NzgyNjA
      console.log(response)
    });

    Linking.getInitialURL().then((url) => {
      if (url) {
        Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleUrl);
  }

  handleUrl = ({ url }) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  }

  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
