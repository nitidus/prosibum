import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812)),
      _CONTAINER_DEPENDED_HEIGHT = (_IS_IPHONE_X)? {
        height: 80,
        paddingTop: 45,
        paddingBottom: 15,
        paddingHorizontal: 15
      }: {
        height: 50,
        paddingVertical: 15,
        paddingHorizontal: 15
      };

module.exports = StyleSheet.create({
  Container: {
    position: 'absolute',
    width: '100%',
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
    fontSize: 16,
    color: colors.single.romance
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
