import React, { Component } from 'react';
import {
  StatusBar, View, Text
} from 'react-native';

import { Navigation } from '../../assets/layouts/index';

export default class Dashboard extends Component<{}> {
  static navigationOptions = {
    header: props => <Navigation
    title="Dashboard"
    {...props} />
  };

  render() {
    return (
      <View>
        <StatusBar />

        <Text>Home!</Text>
      </View>
    )
  }
}
