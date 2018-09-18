import React, { Component } from 'react';

import { View, Animated, Easing } from 'react-native';
import { DoubleBounce } from 'react-native-loader';

import { Global, Modules } from '../styles/index';
const Styles = Modules.Layouts.ActivityIndicator;

export const ActivityIndicator = (props) => {
  var attitude = {};

  const _DEFAULT_SIZE = 20;

  attitude.size = props.size || _DEFAULT_SIZE;

  attitude.color = props.color || Global.colors.single.mercury;

  return (
    <View
      style={Styles.Container}>
        <DoubleBounce
          size={attitude.size}
          color={attitude.color} />
    </View>
  )
}
