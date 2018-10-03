import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Functions } from '../assets/modules/index';
const { Prototypes } = Functions;

import { GLOBAL } from '../assets/flows/states/types/index';

export default class Authorization extends Component<{}> {
  constructor(props) {
    super(props);

    this._checkAuthority();
  }

  async _checkAuthority() {
    const { props } = this,
          { navigation } = props,
          _DID_TOKEN_CREATED = await Prototypes._retrieveDataWithKey(GLOBAL.STORAGE.AUTH);

    navigation.navigate(_DID_TOKEN_CREATED? 'Profile': 'Authentication');
  }

  render() {
    return (
      <View>
        <Text>Authorization.</Text>
      </View>
    )
  }
}
