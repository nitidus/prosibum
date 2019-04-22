import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Global, Views } from '../../assets/styles/index';

import { Functions } from '../../assets/modules/index';

export const Messages = (props) => {
  var attitude = {};

  attitude.language = (typeof props.language != 'undefined')? Functions._convertTokenToKeyword(props.language.key): 'en';

  return (
    <View><Text>{props.sub}, {props.main} page.</Text></View>
  )
}
