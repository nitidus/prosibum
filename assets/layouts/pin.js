import React, { Component } from 'react';
import { View, Text, Animated, Easing, Platform, I18nManager } from 'react-native';

import { BlurView } from 'react-native-blur';
import LinearGradient from 'react-native-linear-gradient';

import { Input } from '../components/index';
import { Icon } from '../layouts/icon';

import { Global, Modules } from '../styles/index';
const Styles = Modules.Layouts.Pin;

import { Functions } from '../modules/index';

export const Pin = (props) => {
  var attitude = {},
      otherProps = {};

  if (typeof props.key != 'undefined'){
    attitude.key = props.key;
  }else{
    if (typeof props.name != 'undefined'){
      attitude.key = props.name;
    }else{
      attitude.key = Functions._generateNewUniqueObjectKey()
    }
  }

  if ((typeof props.value != 'undefined') || (typeof props.title != 'undefined')){
    attitude.title = props.title || props.value;
  }

  if ((typeof props.subvalue != 'undefined') || (typeof props.subtitle != 'undefined')){
    attitude.subtitle = props.subtitle || props.subvalue;
  }

  if (typeof props.children != 'undefined'){
    attitude.children = [];

    if (Array.isArray(props.children)){
      attitude.children = attitude.children.concat(props.children);
    }else{
      attitude.children.push(props.children);
    }
  }

  if ((typeof props.name != 'undefined') || (typeof props.title != 'undefined')){
    attitude.name = props.name || props.title;
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

  if (typeof props.gradient != 'undefined'){
    attitude.gradient = props.gradient;
  }

  if ((typeof props.buttonGradient != 'undefined') || (typeof props.defaultGradient != 'undefined')){
    otherProps.gradient = attitude.buttonGradient = props.buttonGradient || Global.colors.pair.ongerine;
  }

  attitude.blurType = (typeof attitude.blurType == 'string')? Functions._convertTokenToKeyword(props.blurType): 'light';

  attitude.blurAmount = ((typeof attitude.blurAmount != 'undefined') && (!isNaN(attitude.blurAmount)) && (attitude.blurAmount > 0))? Functions._convertTokenToKeyword(props.blurAmount): 10;

  var _PIN_CONTENT;

  if (typeof attitude.children != 'undefined' && attitude.children.length > 0){
    _PIN_CONTENT = attitude.children.map((child) => {
      var childProps = {...child.props};

      const ultimateKey = Functions._generateNewUniqueObjectKey();

      childProps.key = childProps.name || ultimateKey;

      return React.cloneElement(child, childProps);
    });
  }else if ((typeof attitude.title != 'undefined') && (typeof attitude.subtitle != 'undefined')) {
    var _BLUR_VIEW_CONTAINER,
        _BUTTON_CONTENT;

    if (Platform.OS === 'ios'){
      _BLUR_VIEW_CONTAINER = (
        <BlurView
          style={Styles.BluredContainer}
          blurType={attitude.blurType}
          blurAmount={attitude.blurAmount} />
      );
    }

    if (typeof attitude.onPress != 'undefined'){
      _BUTTON_CONTENT = (
        <Input
          type="button"
          style={Styles.PinDefaultButtonNavigatorContainer}
          onPress={attitude.onPress}>
            <Icon
              name={`arrow ${((I18nManager.isRTL)? 'left': 'right')}`}
              {...otherProps} />
        </Input>
      );
    }

    _PIN_CONTENT = (
      <View
        style={Styles.PinContent}>
        <View
          style={Styles.PinDefaultContentItemContainer}>
          <Text
            style={Styles.PinTitle}>
            {attitude.title}
          </Text>
          <Text
            style={Styles.PinSubtitle}>
            {attitude.subtitle}
          </Text>
        </View>

        {_BUTTON_CONTENT}
      </View>
    );
  }

  if (typeof attitude.gradient != 'undefined'){
    const restructredRange = Object.keys(attitude.gradient).map((stepName) => {
      return attitude.gradient[stepName];
    });

    return (
      <View
        key={attitude.key}
        name={attitude.name}
        style={[
          Styles.Container,
          attitude.style
        ]}>
          <LinearGradient
            style={[
              Styles.GradientContainer,
              Styles.ContainerDefaultStyle
            ]}
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
            colors={restructredRange}>
              {_BLUR_VIEW_CONTAINER}

              {_PIN_CONTENT}
          </LinearGradient>
      </View>
    )
  }else{
    return (
      <View
        key={attitude.key}
        name={attitude.name}
        style={[
          Styles.Container,
          Styles.ContainerDefaultStyle,
          attitude.style
        ]}>
          {_BLUR_VIEW_CONTAINER}

          {_PIN_CONTENT}
      </View>
    )
  }
}
