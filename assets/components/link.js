import React, { Component } from 'react';

import { TouchableOpacity, Text, Animated, Easing } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Global, Modules } from '../styles/index';
const Styles = Modules.Components.Link;

import { Functions } from '../modules/index';

export const Link = (props) => {
  var attitude = {};

  if (typeof props.value != 'undefined'){
    attitude.value = props.value;
  }

  attitude.activeOpacity = props.activeOpacity || 0.2;

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

  if (typeof props.children != 'undefined'){
    attitude.children = [];

    if (Array.isArray(props.children)){
      attitude.children = attitude.children.concat(props.children);
    }else{
      attitude.children.push(props.children);
    }
  }

  if ((typeof props.onPress != 'undefined') || (typeof props.onLinkPress != 'undefined') || (typeof props.linkOnPress != 'undefined')){
    attitude.onPress = props.onPress || props.onLinkPress || props.linkOnPress;
  }

  var linkContent;

  if (typeof attitude.children != 'undefined' && attitude.children.length > 0){
    linkContent = attitude.children.map((child) => {
      var childProps = {...child.props};

      const ultimateKey = Functions._generateNewUniqueObjectKey();

      childProps.key = childProps.name || ultimateKey;

      return React.cloneElement(child, childProps);
    });
  }else if (typeof attitude.value != 'undefined') {
    linkContent = <Text
      style={[
        Styles.TextInputLink,
        attitude.style
      ]}>
        {attitude.value}
    </Text>;
  }

  return (
    <TouchableOpacity
      style={attitude.containerStyle}
      onPress={attitude.onPress}
      activeOpacity={attitude.activeOpacity}>
        {linkContent}
    </TouchableOpacity>
  );
}
