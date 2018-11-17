import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

import { Functions } from '../../../../modules/index';

import {
  colors, fonts
} from '../../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){

  }
}

module.exports = StyleSheet.create({
  ModalContainer: {
    paddingHorizontal: 0
  },
  CameraRollContainer: {
    flexDirection: 'row'
  },
  CameraRollItemContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
});
