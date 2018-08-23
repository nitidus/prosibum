import React, { Component } from 'react';
import {
  View, Text, AsyncStorage
} from 'react-native';

export default class Authorization extends Component<{}> {
  constructor(props) {
    super(props);

    this._checkAuthority();
  }

  _checkAuthority = async () => {
    const userAuthorizationToken = await AsyncStorage.getItem('AuthorizationToken');

    this.props.navigation.navigate(userAuthorizationToken? 'Profile': 'Authentication')
  }

  render() {
    return (
      <View>
        <Text>Autherization!!!!!!!!!</Text>
      </View>
    )
  }
}
