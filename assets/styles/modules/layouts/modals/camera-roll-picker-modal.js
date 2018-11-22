import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

import { Functions } from '../../../../modules/index';

import {
  colors, fonts
} from '../../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_CAMERA_ROLL_CONTAINER = {
      height: 238
    },
    _CUSTOM_CAMERA_ROLL_ROW_CONTAINER = {
      height: 99,
      marginBottom: 19
    },
    _CUSTOM_CAMERA_ROLL_ITEM_CONTAINER = {
      width: 99,
      height: 99,
      marginRight: 19,
      borderRadius: 5
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CAMERA_ROLL_CONTAINER.height += 102;

    _CUSTOM_CAMERA_ROLL_ROW_CONTAINER.height += 38;
    _CUSTOM_CAMERA_ROLL_ROW_CONTAINER.marginBottom += 12;

    _CUSTOM_CAMERA_ROLL_ITEM_CONTAINER.width += 38;
    _CUSTOM_CAMERA_ROLL_ITEM_CONTAINER.height += 38;
    _CUSTOM_CAMERA_ROLL_ITEM_CONTAINER.borderRadius += 2;
    _CUSTOM_CAMERA_ROLL_ITEM_CONTAINER.marginRight += 12;
  }else{
    _CUSTOM_CAMERA_ROLL_CONTAINER.height += 10;

    _CUSTOM_CAMERA_ROLL_ROW_CONTAINER.height += 3;
    _CUSTOM_CAMERA_ROLL_ROW_CONTAINER.marginBottom += 3;

    _CUSTOM_CAMERA_ROLL_ITEM_CONTAINER.width += 3;
    _CUSTOM_CAMERA_ROLL_ITEM_CONTAINER.height += 3;
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CAMERA_ROLL_CONTAINER.height += 24;

    _CUSTOM_CAMERA_ROLL_ROW_CONTAINER.height += 6;
    _CUSTOM_CAMERA_ROLL_ROW_CONTAINER.marginBottom += 6;

    _CUSTOM_CAMERA_ROLL_ITEM_CONTAINER.width += 6;
    _CUSTOM_CAMERA_ROLL_ITEM_CONTAINER.height += 6;
    _CUSTOM_CAMERA_ROLL_ITEM_CONTAINER.marginRight += 6;
  }else{
    if (!_IS_IPHONE_X){
      _CUSTOM_CAMERA_ROLL_CONTAINER.height += 2;

      _CUSTOM_CAMERA_ROLL_ROW_CONTAINER.marginBottom += 2;
    }
  }
}

module.exports = StyleSheet.create({
  ModalContainer: {
    paddingHorizontal: 0,
    paddingBottom: 0
  },
  CameraRolliOSGroupTypesCarousel: {
    marginBottom: _CUSTOM_CAMERA_ROLL_ROW_CONTAINER.marginBottom
  },
  CameraRollMajorContainer: {
    alignItems: 'center'
  },
  CameraRollContainer: {
    ..._CUSTOM_CAMERA_ROLL_CONTAINER
  },
  CameraRollRowContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    ..._CUSTOM_CAMERA_ROLL_ROW_CONTAINER
  },
  CameraRollItemContainer: {
    overflow: 'hidden',
    ..._CUSTOM_CAMERA_ROLL_ITEM_CONTAINER
  },
  CameraRollItemContent: {
    flex: 1
  }
});
