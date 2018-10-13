import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CONTAINER_DEPENDED_HEIGHT = {
      height: 50,
      paddingVertical: 15,
      paddingHorizontal: 15
    },
    _CUSTOM_MESSAGE_TEXT = {
      fontSize: 16
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CONTAINER_DEPENDED_HEIGHT.height += 15;
    _CONTAINER_DEPENDED_HEIGHT.paddingTop += 45;
    _CONTAINER_DEPENDED_HEIGHT.paddingBottom += 15;
    _CONTAINER_DEPENDED_HEIGHT.paddingHorizontal += 15;

    _CUSTOM_MESSAGE_TEXT.fontSize += 6;
  }

  _CUSTOM_MESSAGE_TEXT.fontWeight = '400';
}else{
  if (_IS_IPHONE_X){
    _CONTAINER_DEPENDED_HEIGHT.height += 30;
    _CONTAINER_DEPENDED_HEIGHT.paddingTop += 45;
    _CONTAINER_DEPENDED_HEIGHT.paddingBottom += 15;
    _CONTAINER_DEPENDED_HEIGHT.paddingHorizontal += 15;
  }
}

module.exports = StyleSheet.create({
  Container: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    ..._CONTAINER_DEPENDED_HEIGHT
  },
  Content: {
    flexDirection: 'row'
  },
  ErrorTypeContainer: {
    backgroundColor: colors.single.lavenderGray
  },
  MessageText: {
    fontFamily: fonts.sanFrancisco.textBold,
    color: colors.single.romance,
    ..._CUSTOM_MESSAGE_TEXT
  },
  ToastLink: {
    alignSelf: 'flex-end',
    color: colors.single.romance
  },
  RTL_ToastLink: {
    marginRight: 15
  },
  LTR_ToastLink: {
    marginLeft: 15
  }
});
