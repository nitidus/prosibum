import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

import {
  colors, fonts
} from '../../global';

let { width, height } = Dimensions.get('window');

module.exports = StyleSheet.create({
  DualSegmentContainer: {

  },
  DualSegmentTabs: {
    flexDirection: 'row'
  },
  DualSegmentContents: {
    marginTop: 15
  },
  DualSegmentTabContainer: {
    borderRadius: 5,
    height: 59,
    alignItems: 'center',
    justifyContent: 'center'
  },
  DualSegmentTabInnerContent: {
    width: ( width / 2 ) - ( 32 + 7.5 )
  },
  DisableDualSegmentTabInnerContent: {
    backgroundColor: colors.single.wildSand
  },
  DualSegmentTabInnerContentTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 18
  }
});
