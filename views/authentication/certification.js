import React, { Component } from 'react';
import {
  StatusBar,
  View,
  TouchableHighlight,
  Text,
  Animated,
  Easing
} from 'react-native';

import {
  Global,
  Views
} from '../../assets/styles/index';

const Styles = Views.Authentication.Certification;

export default class Authentication extends Component<{}> {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {

  }

  componentWillMount() {

  }

  render() {
    return (
      <View style={Styles.Container}>
        <StatusBar hidden={true}/>

        <Text style={Styles.helloWorld}>Say hello to Prosibum!</Text>
      </View>
    )
  }
}
