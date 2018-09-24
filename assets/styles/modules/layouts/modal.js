import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

import { Functions } from '../../../modules/index';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812)),
      _MODAL_CONTENT_DEPENDED_PADDING = (_IS_IPHONE_X)? {
        paddingHorizontal: 19,
        paddingTop: 10,
        paddingBottom: 30
      }: {
        paddingHorizontal: 19,
        paddingTop: 10,
        paddingBottom: 15
      };

module.exports = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  BottomModal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  ModalContent: {
    backgroundColor: Functions._convertHexColorToRGBA(colors.single.romance, 0.9),
    ..._MODAL_CONTENT_DEPENDED_PADDING
  },
  ModalContentBlurOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  ModalIndicator: {
    marginBottom: 21,
    alignSelf: 'center'
  }
});
