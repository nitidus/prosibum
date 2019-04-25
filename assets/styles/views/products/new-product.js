import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, I18nManager } from 'react-native';

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
    },
    _CUSTOM_DESCRIPTION_FEATURE = {
      height: 68,
      padding: 18
    },
    _CUSTOM_DESCRIPTION_FEATURE_TEXT = {
      fontSize: 16
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

    _CUSTOM_DESCRIPTION_FEATURE_TEXT.fontSize += 5;

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

  if (!I18nManager.isRTL){
    _CUSTOM_BRIEF_DETAIL_TITLE.fontWeight = 'bold';
    _CUSTOM_BRIEF_DETAIL_TITLE_SUFFIX.fontWeight = 'bold';
    _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontWeight = 'bold';
    _CUSTOM_BRIEF_DETAIL_ROW_TEXT.fontWeight = '500';
    _CUSTOM_DESCRIPTION_FEATURE_TEXT.fontWeight = 'bold';
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 162;

    _CUSTOM_PILOT_BUTTON.marginRight += 5;

    _CUSTOM_WAREHOUSE_ITEM_CONTAINER.height += 16;
fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    _CUSTOM_BRIEF_DETAIL_TITLE_CONTAINER.width -= 300;
    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 1;
    _CUSTOM_BRIEF_DETAIL_TITLE_SUFFIX.fontSize += 1;

    _CUSTOM_BRIEF_DETAIL_SUBTITLE.width -= 300;

    _CUSTOM_PHOTO_CONTAINER.height += 10;
    _CUSTOM_PRICE_CONTAINER.height += 10;
  }else{
    if (!_IS_IPHONE_X){
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
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
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
    direction: 'ltr',
    height: 'auto'
  },
  UnitsFeatureDetailItemContainer: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    alignItems: 'flex-start',
    height: 178,
    padding: 18
  },
  CustomizedFeatureDetailItemContainer: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    alignItems: 'flex-start',
    height: 100,
    marginHorizontal: _CUSTOM_CONTENT.marginHorizontal,
    padding: 18
  },
  DetailItemContainer: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    alignItems: 'flex-start'
  },
  DetailItemContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  DetailItemMasterInfoContent: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    justifyContent: 'center'
  },
  DetailItemMasterSubInfoContent: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    flexDirection: 'row',
    alignItems: 'center'
  },
  BriefDetailTitleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    ..._CUSTOM_BRIEF_DETAIL_TITLE_CONTAINER
  },
  BriefDetailTitle: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: 'left',
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_TITLE
  },
  BriefDetailTitleSuffix: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: 'left',
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_TITLE_SUFFIX
  },
  BriefDetailSubtitle: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: 'left',
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_SUBTITLE
  },
  BriefDetailRowContainer: {

  },
  BriefDetailRowText: {
    color: colors.single.romance,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    marginLeft: 15,
    ..._CUSTOM_BRIEF_DETAIL_ROW_TEXT
  },
  BriefDetailRowIcon: {

  },
  FeaturesContainer: {
    marginVertical: _CUSTOM_CONTENT.marginVertical
  },
  DescriptionFeature: {
    backgroundColor: colors.single.wildSand,
    marginHorizontal: _CUSTOM_CONTENT.marginHorizontal,
    ..._CUSTOM_DESCRIPTION_FEATURE
  },
  DescriptionFeatureText: {
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    ..._CUSTOM_DESCRIPTION_FEATURE_TEXT
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
  __Gobal_Icons_In_Pilot: {
    ..._CUSTOM___GLOBAL_ICONS_IN_PILOT
  }
});
