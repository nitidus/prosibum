import React, { Component } from 'react';
import {
  View, Text
} from 'react-native';

export default class Dashboard extends Component<{}> {
  static navigationOptions = {
    title: 'Dashboard',
    headerTitleStyle: {
      fontSize: 32
    }
  };

  render() {
    return (
      <View>
        <Text>Home!</Text>
      </View>
    )
  }
}
