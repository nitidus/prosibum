import React, { Component } from 'react';
import {
  View, Text, AsyncStorage
} from 'react-native';

export default class Authorization extends Component<{}> {
  constructor(props) {
    super(props);

    this._checkAuthority();
  }

  async _checkAuthority() {
    const { navigation } = this.props,
          userAuthorizationToken = await AsyncStorage.getItem('AuthorizationToken');

    navigation.navigate(userAuthorizationToken? 'Profile': 'Authentication');
  }

  render() {
    return (
      <View>
        <Text>Authorization!!!!!!!!!</Text>
      </View>
    )
  }
}
