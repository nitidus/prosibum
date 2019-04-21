import React, { Component } from 'react';

import { View, Animated, Easing, Text } from 'react-native';

import { connect } from 'react-redux';

import { Global, Modules } from '../styles/index';
import { Link } from '../components/index';
const Styles = Modules.Layouts.Toast;

import { Functions } from '../modules/index';

import { Layouts as LayoutsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.Toast;

const Toast = (props) => {
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

  if ((attitude.message != '') && (attitude.message !== props.toast.message)){
    props.setVisibility(attitude.launched);
    props.setMessage(attitude.message);

    if (attitude.onPress !== props.toast.onPress){
      props.setOnLinkPress(attitude.onPress);
    }

    if (attitude.link !== props.toast.link){
      props.setLinkText(attitude.link);
    }
  }

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
    if (props.toast.visibility){
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
          {props.toast.message}
      </Text>
      <Link
        value={props.toast.link}
        activeOpacity={_ACTIVE_OPACITY}
        style={Styles.ToastLink}
        onPress={props.toast.onPress} />
    </View>;
  }else{
    _TOAST_CONTENT = <Text
      style={Styles.MessageText}>
        {props.toast.message}
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

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
