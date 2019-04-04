import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import { colors, fonts } from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _INNER_CONTENT = {},
    _CUSTOM_FOR_YOU_BUTTON = {
      marginRight: 15
    },
    _CUSTOM___GLOBAL_ICONS_IN_PILOT = {
      height: 23,
      width: 15
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.height += 10;
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.width += 10;
  }else{
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.height += 2;
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.width += 2;
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_FOR_YOU_BUTTON.marginRight += 5;
  }
}

module.exports = StyleSheet.create({
  MajorContainer: {
    flex: 1,
    backgroundColor: colors.single.rangoonGreen
  },
  ContainerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 5,
    overflow: 'hidden'
  },
  ContainerOverlayContent: {
    flex: 1
  },
  Container: {
    flex: 1,
    shadowColor: colors.single.rangoonGreen
  },
  MajorContent: {
    flex: 1,
    backgroundColor: colors.single.blackSqueeze,
    borderRadius: 5,
    overflow: 'hidden'
  },
  ForYouButton: {
    ..._CUSTOM_FOR_YOU_BUTTON
  },
  __Gobal_Icons_In_Pilot: {
    ..._CUSTOM___GLOBAL_ICONS_IN_PILOT
  }
});
