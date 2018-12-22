import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import { Functions } from '../../../modules/index';

import { colors, fonts } from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_ADD_ROLE_BUTTON = {
      marginRight: 15
    },
    _CUSTOM___GLOBAL_ICONS_IN_PILOT = {
      height: 23,
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.height += 10;
  }else{
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.height += 2;
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_ADD_ROLE_BUTTON.marginRight += 5;
  }
}

module.exports = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.single.blackSqueeze,
    borderRadius: 5,
    overflow: 'hidden'
  },
  AddRoleButton: {
    ..._CUSTOM_ADD_ROLE_BUTTON
  },
  Content: {
    margin: 15
  },
  RoleItem: {
    height: 70,
    backgroundColor: colors.single.romance,
    shadowColor: colors.single.rangoonGreen,
    shadowOpacity: 0.15,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 15
    },
    marginBottom: 15
  },
  __Gobal_Icons_In_Pilot: {
    ..._CUSTOM___GLOBAL_ICONS_IN_PILOT
  }
});
