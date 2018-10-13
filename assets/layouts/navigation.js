import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';

import { Link } from '../components/index';
import { Icon } from '../layouts/icon';
import { Global, Modules } from '../styles/index';
const Styles = Modules.Layouts.Navigation;

import { Functions } from '../modules/index';

export const Navigation = (props) => {
  const { navigation } = props;

  var _LEFT_SIDE_CONTENT, _RIGHT_SIDE_CONTENT;

  _LEFT_SIDE_CONTENT = <Link
    onPress={() => {
      alert('ok')
    }}>
      <Icon
        name="for-you" />
  </Link>;

  return (
    <View
      style={Styles.Container}>
        {_LEFT_SIDE_CONTENT}

        <Text
          style={Styles.HeaderTitle}>
            {props.title}
        </Text>

        {_RIGHT_SIDE_CONTENT}
    </View>
  )
}
