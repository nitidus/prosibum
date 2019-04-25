import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, I18nManager } from 'react-native';

import { colors, fonts } from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_SCROLLABLE_CONTAINER = {
      marginHorizontal: 32
    },
    _CUSTOM_BUTTON_TITLE = {
      fontSize: 18
    },
    _CUSTOM_FOR_YOU_BUTTON = {
      marginRight: 15
    },
    _CUSTOM___GLOBAL_ICONS_IN_PILOT = {
      height: 23,
      width: 15
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_SCROLLABLE_CONTAINER.marginHorizontal = 202;

    _CUSTOM_BUTTON_TITLE.fontSize += 7;

    _CUSTOM___GLOBAL_ICONS_IN_PILOT.height += 10;
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.width += 10;
  }else{
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.height += 2;
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.width += 2;
  }

  if (!I18nManager.isRTL){
    _CUSTOM_BUTTON_TITLE.fontWeight = '500';
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_SCROLLABLE_CONTAINER.marginHorizontal = 162;

    _CUSTOM_FOR_YOU_BUTTON.marginRight += 5;
  }
}

module.exports = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.single.blackSqueeze,
    borderRadius: 5,
    overflow: 'hidden'
  },
  ScrollableContainer: {
    marginTop: 15,
    justifyContent: 'space-between'
  },
  GlobalMeasurements: {
    ..._CUSTOM_SCROLLABLE_CONTAINER
  },
  SingleInput: {
    marginBottom: 15,
    marginHorizontal: _CUSTOM_SCROLLABLE_CONTAINER.marginHorizontal
  },
  BrandRoleCarouselContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 15
  },
  BrandRoleCarouselErrorContainer: {
    width: width - (_CUSTOM_SCROLLABLE_CONTAINER.marginHorizontal * 2),
    marginHorizontal: _CUSTOM_SCROLLABLE_CONTAINER.marginHorizontal,
    backgroundColor: colors.single.carminePink
  },
  BrandRoleCarouselErrorContent: {
    color: colors.single.romance,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BUTTON_TITLE
  },
  QuickLink: {
    marginVertical: 38,
    alignItems: 'center'
  },
  SubmitInput: {
    marginHorizontal: _CUSTOM_SCROLLABLE_CONTAINER.marginHorizontal
  },
  ForYouButton: {
    ..._CUSTOM_FOR_YOU_BUTTON
  },
  __Gobal_Icons_In_Pilot: {
    ..._CUSTOM___GLOBAL_ICONS_IN_PILOT
  }
});
