import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

import { Functions } from '../../../modules/index';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

if (Platform.OS === 'ios'){
  if (width >= 1000 || height >= 1000){

  }
}else{
  if (width >= 1000 || height >= 1000){

  }
}

module.exports = StyleSheet.create({
  Container: {
    flex: 1
  },
  ButtonContainer: {
    position: 'absolute',
    height: 64,
    right: 15,
    borderRadius: 5,
    overflow: 'hidden'
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
