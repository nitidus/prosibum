import React, { Component } from 'react';
import { View, Text, Linking, Platform } from 'react-native';

import DeepLinking from 'react-native-deep-linking';

import { ActivityIndicator } from '../assets/layouts/index';

import { Functions } from '../assets/modules/index';
const { Preparation } = Functions;

import { GLOBAL } from '../assets/flows/states/types/index';

import { name as appName } from '../app.json';

export default class Authorization extends Component<{}> {
  async _handleURL({ url }) {
    const _IS_URL_SUPPORTED = await Linking.canOpenURL(url);

    if (_IS_URL_SUPPORTED){
      DeepLinking.evaluateUrl(url);
    }
  }

  async componentDidMount() {
    const { props: { navigation } } = this,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings();

    DeepLinking.addScheme(`${appName}://`);

    Linking.addEventListener('url', this._handleURL);

    DeepLinking.addRoute('/join/:brand_name/invite/:target_token', (response) => {
      navigation.navigate('Signup', {
        brandName: response.brand_name,
        targetToken: response.target_token
      });
    });

    DeepLinking.addRoute('/verify/:target_token', (response) => {
      navigation.navigate('VerifyEmail', {
        targetToken: response.target_token
      });
    });

    const _URL = await Linking.getInitialURL();

    if (_URL !== null){
      Linking.openURL(_URL);
    }else{
      Preparation._prepareAuthority(this);
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleUrl);
  }

  render() {
    return (<ActivityIndicator />);
  }
}
