import React, { Component } from 'react';

import { View, Text, Animated, Easing } from 'react-native';

import { Global, Modules } from '../styles/index';
const Styles = Modules.Components.Headline;

export const Headline = (props) => {
  var attitude = {};

  if ((typeof props.title != 'undefined') && (typeof props.subtitle != 'undefined')){
    attitude.title = props.title;
    attitude.subtitle = props.subtitle;
  }

  if (typeof props.key != 'undefined'){
    attitude.key = props.key;
  }else{
    if (typeof props.name != 'undefined'){
      attitude.key = props.name;
    }else{
      const today = new Date(),
            randomToken = Math.random();

      attitude.key = parseInt(today.getTime().toString() + (randomToken * Math.pow(10, randomToken.toString().length - 2)).toString());
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

  return (
    <View
      key={attitude.key}
      style={[
        Styles.Container,
        attitude.style
      ]}>
        <Text
          style={Styles.Title}>
            {attitude.title}
        </Text>
        <Text
          style={Styles.Subtitle}>
            {attitude.subtitle}
        </Text>
    </View>
  )
}
