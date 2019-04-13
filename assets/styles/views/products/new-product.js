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
    _CUSTOM_BRIEF_DETAIL_TITLE_CONTAINER = {
      width: ((width - (_CUSTOM_CONTENT.marginHorizontal * 2)) - 42),
      marginBottom: 5
    },
    _CUSTOM_BRIEF_DETAIL_TITLE = {
      fontSize: 26
    },
    _CUSTOM_BRIEF_DETAIL_TITLE_SUFFIX = {
      fontSize: 14,
      marginLeft: 5,
      marginBottom: 3
    },
    _CUSTOM_BRIEF_DETAIL_SUBTITLE = {
      fontSize: 14,
      width: ((width - (_CUSTOM_CONTENT.marginHorizontal * 2)) - 42),
      marginBottom: 10
    },
    _CUSTOM___GLOBAL_ICONS_IN_PILOT = {
      height: 23,
      width: 15
    },
    _CUSTOM_BRIEF_DETAIL_ROW_TEXT = {
      fontSize: 14
    },
    _CUSTOM_PHOTO_CONTAINER = {
      height: 144
    },
    _CUSTOM_PRICE_CONTAINER = {
      height: 180
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 202;

    _CUSTOM___GLOBAL_ICONS_IN_PILOT.height += 10;
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.width += 10;

    _CUSTOM_WAREHOUSE_ITEM_CONTAINER.height += 48;

    _CUSTOM_BRIEF_DETAIL_TITLE_CONTAINER.width -= 380;
    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 6;
    _CUSTOM_BRIEF_DETAIL_TITLE_SUFFIX.fontSize += 6;

    _CUSTOM_BRIEF_DETAIL_SUBTITLE.width -= 380;
    _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontSize += 4;
    _CUSTOM_BRIEF_DETAIL_ROW_TEXT.fontSize += 3;

    _CUSTOM_PHOTO_CONTAINER.height += 38;
    _CUSTOM_PRICE_CONTAINER.height += 38;
  }else{
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.height += 2;
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.width += 2;

    _CUSTOM_WAREHOUSE_ITEM_CONTAINER.height += 3;

    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 3;
    _CUSTOM_BRIEF_DETAIL_TITLE_SUFFIX.fontSize += 3;

    _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontSize += 1;

    _CUSTOM_PHOTO_CONTAINER.height += 4;
    _CUSTOM_PRICE_CONTAINER.height += 4;
  }

  _CUSTOM_BRIEF_DETAIL_TITLE.fontWeight = 'bold';
  _CUSTOM_BRIEF_DETAIL_TITLE_SUFFIX.fontWeight = 'bold';
  _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontWeight = 'bold';
  _CUSTOM_BRIEF_DETAIL_ROW_TEXT.fontWeight = '500';
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 162;

    _CUSTOM_PILOT_BUTTON.marginRight += 5;

    _CUSTOM_WAREHOUSE_ITEM_CONTAINER.height += 16;

    _CUSTOM_BRIEF_DETAIL_TITLE_CONTAINER.width -= 300;
    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 1;
    _CUSTOM_BRIEF_DETAIL_TITLE_SUFFIX.fontSize += 1;

    _CUSTOM_BRIEF_DETAIL_SUBTITLE.width -= 300;

    _CUSTOM_PHOTO_CONTAINER.height += 10;
    _CUSTOM_PRICE_CONTAINER.height += 10;
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
  DetailContainer: {
    height: 'auto'
  },
  UnitsFeatureDetailItemContainer: {
    height: 178,
    padding: 18
  },
  CustomizedFeatureDetailItemContainer: {
    height: 100,
    marginHorizontal: _CUSTOM_CONTENT.marginHorizontal,
    padding: 18
  },
  DetailItemContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  DetailItemMasterInfoContent: {
    justifyContent: 'center'
  },
  DetailItemMasterSubInfoContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  BriefDetailTitleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    ..._CUSTOM_BRIEF_DETAIL_TITLE_CONTAINER
  },
  BriefDetailTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_TITLE
  },
  BriefDetailTitleSuffix: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_TITLE_SUFFIX
  },
  BriefDetailSubtitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_SUBTITLE
  },
  BriefDetailRowContainer: {

  },
  BriefDetailRowText: {
    color: colors.single.romance,
    fontFamily: fonts.sanFrancisco.textBold,
    marginLeft: 15,
    ..._CUSTOM_BRIEF_DETAIL_ROW_TEXT
  },
  BriefDetailRowIcon: {

  },
  FeaturesContainer: {
    marginVertical: _CUSTOM_CONTENT.marginVertical
  },
  DescriptionFeature: {
    height: 68,
    backgroundColor: colors.single.wildSand,
    marginHorizontal: _CUSTOM_CONTENT.marginHorizontal,
    padding: 18
  },
  DescriptionFeatureText: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 16
  },
  PhotoContainer: {
    ..._CUSTOM_PHOTO_CONTAINER
  },
  PriceContainer: {
    ..._CUSTOM_PRICE_CONTAINER
  },
  BottomPinnedContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    bottom: (_IS_IPHONE_X)? _CUSTOM_CONTENT.marginVertical * 1.85: _CUSTOM_CONTENT.marginVertical
  },
  Center_TextAlignment: {
    textAlign: 'center'
  },
  Center_ContentAlignment: {
    alignItems: 'center'
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
