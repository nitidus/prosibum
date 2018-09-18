import React, { Component } from 'react';

import { View, Animated, Easing, Text } from 'react-native';

import { Global, Modules } from '../styles/index';
import { Link } from '../components/index';
const Styles = Modules.Layouts.Toast;

import { Functions } from '../modules/index';

export const Toast = (props) => {
  var attitude = {
        animations: {
          yPosition: new Animated.Value(-1 * Styles.Container.height)
        }
      },
      _CUSTOM_STYLE = {},
      _TOAST_CONTENT;

  attitude.animations

  attitude.message = props.message || props.messageContent || '';

  attitude.link = props.link || 'Retry';

  if ((typeof props.onPress != 'undefined') || (typeof props.onLinkPress != 'undefined') || (typeof props.onPressLink != 'undefined')){
    attitude.onPress = props.onPress || props.onLinkPress || props.onPressLink;
  }

  if ((typeof props.duration != 'undefined') || (typeof props.durationTime != 'undefined')){
    attitude.duration = props.duration || props.durationTime;
  }

  if ((typeof props.color != 'undefined') || (typeof props.backgroundColor != 'undefined')){
    attitude.color = props.color || props.backgroundColor;
  }

  attitude.launched = props.launched || props.triggered || props.visible || props.visibled || false;

  if (typeof attitude.duration != 'undefined'){
    Animated.timing(attitude.animations.yPosition, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear
    }).start();

    setTimeout(() => {
      Animated.timing(attitude.animations.yPosition, {
        toValue: -1 * Styles.Container.height,
        duration: 300,
        easing: Easing.linear
      }).start();
    }, attitude.duration);
  }else{
    if (attitude.launched){
      Animated.timing(attitude.animations.yPosition, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear
      }).start();
    }else{
      Animated.timing(attitude.animations.yPosition, {
        toValue: -1 * Styles.Container.height,
        duration: 300,
        easing: Easing.linear
      }).start();
    }
  }

  _CUSTOM_STYLE = {
    top: attitude.animations.yPosition,
    backgroundColor: attitude.color
  };

  if (typeof attitude.onPress != 'undefined'){
    const _ACTIVE_OPACITY = 0.7;

    _TOAST_CONTENT = <View
      style={Styles.Content}>
      <Text
        style={Styles.MessageText}>
          {attitude.message}
      </Text>
      <Link
        value={attitude.link}
        activeOpacity={_ACTIVE_OPACITY}
        style={[
          Styles.ToastLink,
          Styles.LTR_ToastLink
        ]}
        onPress={attitude.onPress} />
    </View>;
  }else{
    _TOAST_CONTENT = <Text
      style={Styles.MessageText}>
        {attitude.message}
    </Text>;
  }

  return (
    <Animated.View
      style={[
        Styles.Container,
        Styles.ErrorTypeContainer,
        _CUSTOM_STYLE
      ]}>
          {_TOAST_CONTENT}
    </Animated.View>
  )
}
