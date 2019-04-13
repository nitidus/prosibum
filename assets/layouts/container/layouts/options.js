import React, { Component } from 'react';
import { View, Dimensions, Platform, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import Interactable from 'react-native-interactable';

import { Global, Modules } from '../../../styles/index';
import { Input } from '../../../components/index';
import { Icon } from '../../icon';
const Styles = Modules.Layouts.Options;

import { Functions } from '../../../modules/index';

export const Options = (props) => {
  var attitude = {},
      otherProps = {},
      CUSTOM_BUTTON_CONTAINER_STYLE = {};

  const _CONFIGS = {
    DEFAULT_NORMAL_HORIZONTAL_SNAP_POINT: 0,
    DEFAULT_LAUNCHED_HORIZONTAL_SNAP_POINT: -116,
    DEFAULT_NORMAL_BUTTON_WIDTH: 0,
    DEFAULT_LAUNCHED_BUTTON_WIDTH: 101,
    DEFAULT_NORMAL_BUTTON_HEIGHT: 0,
    DEFAULT_LAUNCHED_BUTTON_HEIGHT: Styles.ButtonContainer.height,
    DEFAULT_BUCKET_BUTTON_ICON_HEIGHT: 40
  };

  if ((typeof props.name != 'undefined') || (typeof props.title != 'undefined')){
    attitude.name = props.name || props.title;
  }

  if (typeof props.children != 'undefined'){
    attitude.children = [];

    if (Array.isArray(props.children)){
      attitude.children = attitude.children.concat(props.children);
    }else{
      attitude.children.push(props.children);
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
  }else{
    attitude.style = {};
  }

  otherProps.horizontalOnly = attitude.horizontalOnly = props.horizontalOnly || false;

  otherProps.verticalOnly = attitude.verticalOnly = props.verticalOnly || false;

  otherProps.snapPoints = attitude.snapPoints = props.snapPoints || [
    { x: _CONFIGS.DEFAULT_NORMAL_HORIZONTAL_SNAP_POINT },
    { x: _CONFIGS.DEFAULT_LAUNCHED_HORIZONTAL_SNAP_POINT }
  ];

  otherProps.boundaries = attitude.boundaries = props.boundaries || {
    left: _CONFIGS.DEFAULT_LAUNCHED_HORIZONTAL_SNAP_POINT,
    right: _CONFIGS.DEFAULT_NORMAL_HORIZONTAL_SNAP_POINT
  };

  otherProps.dragToss = attitude.dragToss = props.dragToss || 0.01;

  if (typeof props.onSnap != 'undefined'){
    otherProps.onSnap = attitude.onSnap = props.onSnap;
  }

  attitude.interpolation = props.interpolation || {
    inputRange: [_CONFIGS.DEFAULT_LAUNCHED_HORIZONTAL_SNAP_POINT, _CONFIGS.DEFAULT_NORMAL_HORIZONTAL_SNAP_POINT],
    outputRange: [_CONFIGS.DEFAULT_LAUNCHED_BUTTON_WIDTH, _CONFIGS.DEFAULT_NORMAL_BUTTON_WIDTH],
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  };

  if ((otherProps.horizontalOnly === true) && (otherProps.verticalOnly === true)) {
    otherProps.animatedValueX = attitude.animatedValueX = props.animatedValueX || (new Animated.Value(0));
    otherProps.animatedValueY = attitude.animatedValueY = props.animatedValueY || (new Animated.Value(0));

    CUSTOM_BUTTON_CONTAINER_STYLE.width = otherProps.animatedValueX.interpolate(attitude.interpolation);
    CUSTOM_BUTTON_CONTAINER_STYLE.height = otherProps.animatedValueY.interpolate(attitude.interpolation);
  }else if ((otherProps.horizontalOnly === true) && (otherProps.verticalOnly === false)) {
    otherProps.animatedValueX = attitude.animatedValueX = props.animatedValueX || (new Animated.Value(0));

    CUSTOM_BUTTON_CONTAINER_STYLE.width = otherProps.animatedValueX.interpolate(attitude.interpolation);
  }else if ((otherProps.horizontalOnly === false) && (otherProps.verticalOnly === true)) {
    otherProps.animatedValueY = attitude.animatedValueY = props.animatedValueY || (new Animated.Value(0));

    CUSTOM_BUTTON_CONTAINER_STYLE.height = otherProps.animatedValueY.interpolate(attitude.interpolation);
  }

  if ((typeof props.onPress != 'undefined') || (typeof props.onDeletePress != 'undefined') || (typeof props.deleteOnPress != 'undefined')){
    attitude.onPress = props.onPress || props.onDeletePress || props.deleteOnPress;
  }

  return (
    <View
      style={Styles.Container}>
        <Interactable.View
          {...otherProps}>
            {
              attitude.children.map((child, i) => {
                var childProps = {...child.props};

                const ultimateKey = Functions._generateNewUniqueObjectKey();

                childProps.key = childProps.name || ultimateKey;

                return React.cloneElement(child, childProps);
              })
            }
        </Interactable.View>

        <Animated.View
          style={[
            Styles.ButtonContainer,
            CUSTOM_BUTTON_CONTAINER_STYLE,
            attitude.style
          ]}>
            <Input
              type="button"
              gradient={Global.colors.pair.peroly}
              style={Styles.FullButtonContent}
              onPress={attitude.onPress}>
                <Icon
                  name="bucket"
                  height={_CONFIGS.DEFAULT_BUCKET_BUTTON_ICON_HEIGHT}
                  color={Global.colors.single.romance}/>
            </Input>
        </Animated.View>
    </View>
  );
}
