import React, { Component } from 'react';

import { View, Text, Animated, Easing } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Input } from './input';

import { Global, Modules } from '../styles/index';
const Styles = Modules.Components.Switch;

import { Functions } from '../modules/index';

export const Switch = (props) => {
  var attitude = {},
      togglerOtherProps = {},
      containerOtherProps = {};

  if (typeof props.value != 'undefined'){
    attitude.value = props.value;
  }

  if (typeof props.title != 'undefined'){
    attitude.title = props.title;
  }

  if (typeof props.subtitle != 'undefined'){
    attitude.subtitle = props.subtitle;
  }

  attitude.activeOpacity = props.activeOpacity || 0.7;

  if ((typeof props.containerStyle != 'undefined') || (typeof props.style != 'undefined')){
    attitude.containerStyle = props.containerStyle || props.style;

    if (typeof attitude.containerStyle == 'object' && Array.isArray(attitude.containerStyle)){
      attitude.containerStyle = attitude.containerStyle.reduce((total, item) => {
        return {
          ...total,
          ...item
        };
      })
    }
  }

  if (typeof props.titleStyle != 'undefined'){
    attitude.titleStyle = props.titleStyle;

    if (typeof attitude.titleStyle == 'object' && Array.isArray(attitude.titleStyle)){
      attitude.titleStyle = attitude.titleStyle.reduce((total, item) => {
        return {
          ...total,
          ...item
        };
      })
    }
  }

  if (typeof props.subtitleStyle != 'undefined'){
    attitude.subtitleStyle = props.subtitleStyle;

    if (typeof attitude.subtitleStyle == 'object' && Array.isArray(attitude.subtitleStyle)){
      attitude.subtitleStyle = attitude.subtitleStyle.reduce((total, item) => {
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

  if ((typeof props.onChange != 'undefined') || (typeof props.onValueChange != 'undefined')){
    attitude.onChange = props.onChange || props.onValueChange;
  }

  if (typeof props.gradient != 'undefined'){
    attitude.gradient = props.gradient;
  }

  if (typeof props.contentGradient != 'undefined'){
    attitude.contentGradient = props.contentGradient;
  }

  if (attitude.value === true){
    togglerOtherProps.gradient = attitude.contentGradient || Global.colors.pair.ongerine;
  }

  if (typeof attitude.gradient != 'undefined'){
    containerOtherProps.gradient = attitude.gradient;
  }

  let _SUBTITLE_CONTENT;

  if (typeof attitude.subtitle != 'undefined'){
    _SUBTITLE_CONTENT = (
      <View
        style={Styles.Content}>
          <Text
            style={[
              Styles.ContentSubtitle,
              attitude.subtitleStyle
            ]}>
              {attitude.subtitle}
          </Text>
      </View>
    );
  }

  return (
    <Input
      type="button"
      style={[
        Styles.Container,
        attitude.containerStyle
      ]}
      onPress={attitude.onChange}
      {...containerOtherProps}>
        <View
          style={Styles.Content}>
            <Input
              type="button"
              style={Styles.ToggleContent}
              onPress={attitude.onChange}
              {...togglerOtherProps}/>

            <Text
              style={[
                Styles.ContentTitle,
                attitude.titleStyle
              ]}>
                {attitude.title}
            </Text>
        </View>

        {_SUBTITLE_CONTENT}
    </Input>
  );
}
