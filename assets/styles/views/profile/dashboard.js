import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import { colors, fonts } from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _INNER_CONTENT = {};

if (width >= 1000 || height >= 1000){

}else{

}

module.exports = StyleSheet.create({
  MajorContainer: {
    flex: 1,
    backgroundColor: colors.single.rangoonGreen
  },
  Container: {
    flex: 1,
    shadowColor: colors.single.rangoonGreen,
    shadowOpacity: 0.15,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 30
    }
  },
  MajorContent: {
    flex: 1,
    backgroundColor: colors.single.blackSqueeze,
    borderRadius: 5,
    overflow: 'hidden'
  }
});
