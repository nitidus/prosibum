import React, { Component } from 'react';

import { Provider } from 'react-redux';
import getStore from './assets/flows/states/reducer';

import RootStack from './views/index';

import { name as appName } from './app.json';

const store = getStore();

store.subscribe(() => {
  console.log("Store updated.", store.getState());
})

export default class App extends Component<> {
  render() {
    return (
      <Provider
        store={store}>
          <RootStack />
      </Provider>
    );
  }
}
