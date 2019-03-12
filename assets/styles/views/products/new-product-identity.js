import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import { colors, fonts } from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_CONTENT = {
      marginVertical: 15,
      marginHorizontal: 15
    },
    _CUSTOM_PILOT_BUTTON = {
      marginRight: 15
    },
    _CUSTOM_WAREHOUSE_ITEM_CONTAINER = {
      height: 102
    },
    _CUSTOM_BRIEF_DETAIL_TITLE = {
      fontSize: 26,
      width: ((width - (_CUSTOM_CONTENT.marginHorizontal * 2)) - 42),
      marginBottom: 5
    },
    _CUSTOM_BRIEF_DETAIL_SUBTITLE = {
      fontSize: 14,
      width: ((width - (_CUSTOM_CONTENT.marginHorizontal * 2)) - 42),
      marginBottom: 10
    },
    _CUSTOM___GLOBAL_ICONS_IN_PILOT = {
      height: 16
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 202;

    _CUSTOM___GLOBAL_ICONS_IN_PILOT.height += 10;

    _CUSTOM_WAREHOUSE_ITEM_CONTAINER.height += 48;

    _CUSTOM_BRIEF_DETAIL_TITLE.width -= 380;
    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 6;

    _CUSTOM_BRIEF_DETAIL_SUBTITLE.width -= 380;
    _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontSize += 4;
  }else{
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.height += 2;

    _CUSTOM_WAREHOUSE_ITEM_CONTAINER.height += 3;

    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 3;

    _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontSize += 1;
  }

  _CUSTOM_BRIEF_DETAIL_TITLE.fontWeight = 'bold';
  _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontWeight = 'bold';
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 162;

    _CUSTOM_PILOT_BUTTON.marginRight += 5;

    _CUSTOM_WAREHOUSE_ITEM_CONTAINER.height += 16;

    _CUSTOM_BRIEF_DETAIL_TITLE.width -= 300;
    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 1;

    _CUSTOM_BRIEF_DETAIL_SUBTITLE.width -= 300;
  }else{
    if (!_IS_IPHONE_X){
      _CUSTOM_CONTENT.marginTop
      _CUSTOM_WAREHOUSE_ITEM_CONTAINER.height += 1;
    }
  }
}

module.exports = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.single.blackSqueeze,
    borderRadius: 5,
    overflow: 'hidden'
  },
  Content: {
    ..._CUSTOM_CONTENT
  },
  MajorContent: {
    flex: 1,
    marginTop: _CUSTOM_CONTENT.marginVertical,
    marginBottom: (_IS_IPHONE_X)? _CUSTOM_CONTENT.marginVertical * 1.85: _CUSTOM_CONTENT.marginVertical
  },
  PilotButton: {
    ..._CUSTOM_PILOT_BUTTON
  },
  EmptyContent: {
    flex: 1,
    justifyContent: 'center'
  },
  EmptyContentLink: {
    alignItems: 'center'
  },
  RegularItemContainer: {
    marginHorizontal: _CUSTOM_CONTENT.marginHorizontal,
    marginBottom: _CUSTOM_CONTENT.marginVertical
  },
  WarehouseItemContainer: {
    ..._CUSTOM_WAREHOUSE_ITEM_CONTAINER,
    padding: 18
  },
  WarehouseErrorContainer: {
    backgroundColor: colors.single.carminePink
  },
  WarehouseErrorContent: {
    color: colors.single.romance
  },
  DetailItemMasterInfoContent: {
    justifyContent: 'center'
  },
  BriefDetailTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_TITLE
  },
  BriefDetailSubtitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_SUBTITLE
  },
  BottomPinnedContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
  LTR_ContentAlignment: {
    alignItems: 'flex-start'
  },
  RTL_ContentAlignment: {
    alignItems: 'flex-end'
  },
  __Gobal_Icons_In_Pilot: {
    ..._CUSTOM___GLOBAL_ICONS_IN_PILOT
  }
});
