import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions, I18nManager } from 'react-native';

import { Functions } from '../../../modules/index';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_CONTENT = {
      marginVertical: 15,
      marginHorizontal: 15
    },
    _CUSTOM_BUTTON_CONTAINER = {};

_CUSTOM_BUTTON_CONTAINER[((I18nManager.isRTL)? 'left': 'right')] = 15;

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 202;
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 162;
  }
}

module.exports = StyleSheet.create({
  Container: {
    flex: 1
  },
  Content: {
    ..._CUSTOM_CONTENT
  },
  ButtonContainer: {
    position: 'absolute',
    height: 64,
    borderRadius: 5,
    overflow: 'hidden',
    ..._CUSTOM_BUTTON_CONTAINER
  },
  FullButtonContent: {
    height: '100%',
    width: '100%'
  },
  VerticalHalfButtonContent: {
    height: '45%',
    width: '100%'
  },
  HorizontalHalfButtonContent: {
    height: '100%',
    width: '45%'
  }
});
