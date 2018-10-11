import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_DUAL_SEGMENT_TAB_CONTAINER = {
      borderRadius: 5,
      height: 59
    },
    _CUSTOM_DUAL_SEGMENT_TAB_INNER_CONTENT_TITLE = {
      fontSize: 18
    },
    _CUSTOM_DUAL_SEGMENT_TAB_INNER_CONTENT = {
      width: ( width / 2 ) - ( 32 + 7.5 )
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_DUAL_SEGMENT_TAB_CONTAINER.height += 20;
    _CUSTOM_DUAL_SEGMENT_TAB_CONTAINER.borderRadius += 2;

    _CUSTOM_DUAL_SEGMENT_TAB_INNER_CONTENT.width = ( width / 2 ) - ( 202 + 7.5 );

    _CUSTOM_DUAL_SEGMENT_TAB_INNER_CONTENT_TITLE.fontSize += 7;
  }

  _CUSTOM_DUAL_SEGMENT_TAB_INNER_CONTENT_TITLE.fontWeight = '500';
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_DUAL_SEGMENT_TAB_INNER_CONTENT.width = ( width / 2 ) - ( 162 + 7.5 );
  }
}

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
    alignItems: 'center',
    justifyContent: 'center',
    ..._CUSTOM_DUAL_SEGMENT_TAB_CONTAINER
  },
  DualSegmentTabInnerContent: {
    ..._CUSTOM_DUAL_SEGMENT_TAB_INNER_CONTENT
  },
  DisableDualSegmentTabInnerContent: {
    backgroundColor: colors.single.wildSand
  },
  DualSegmentTabInnerContentTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    ..._CUSTOM_DUAL_SEGMENT_TAB_INNER_CONTENT_TITLE
  }
});
