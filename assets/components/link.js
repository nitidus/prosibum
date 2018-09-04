import React, { Component } from 'react';

import { TouchableOpacity, Text, Animated, Easing } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Global, Modules } from '../styles/index';

const Styles = Modules.Components.Link;

export const Link = (props) => {
  var attitude = {};

  if (typeof props.value != 'undefined'){
    attitude.value = props.value;
  }

  if (typeof props.containerStyle != 'undefined'){
    attitude.containerStyle = props.containerStyle;

    if (typeof attitude.containerStyle == 'object' && Array.isArray(attitude.containerStyle)){
      attitude.containerStyle = attitude.containerStyle.reduce((total, item) => {
        return {
          ...total,
          ...item
        };
      })
    }
  }

  if (typeof props.style != 'undefined'){
    attitude.style = props.style;

    if (typeof attitude.style == 'object' && Array.isArray(attitude.style)){
      attitude.style = attitude.style.reduce((total, item) => {
        return {
          ...total,
          ...item
        };
      })
    }
  }

  if ((typeof props.onPress != 'undefined') || (typeof props.onLinkPress != 'undefined') || (typeof props.linkOnPress != 'undefined')){
    attitude.onPress = props.onPress || props.onLinkPress || props.linkOnPress;
  }

  return (
    <TouchableOpacity
      style={attitude.containerStyle}
      onPress={attitude.onPress}>
        <Text
          style={[
            Styles.TextInputLink,
            attitude.style
          ]}>
            {attitude.value}
        </Text>
    </TouchableOpacity>
  );
}
