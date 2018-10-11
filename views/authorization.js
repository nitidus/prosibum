import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { ActivityIndicator } from '../assets/layouts/index';

import { Functions } from '../assets/modules/index';
const { Preparation } = Functions;

import { GLOBAL } from '../assets/flows/states/types/index';

export default class Authorization extends Component<{}> {
  constructor(props) {
    super(props);

    Preparation._prepareAuthority(this);
  }

  render() {
    return (<ActivityIndicator />);
  }
}
