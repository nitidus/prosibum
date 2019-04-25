import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, I18nManager } from 'react-native';

import { Functions } from '../../../../modules/index';

import { colors, fonts } from '../../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_CONTENT = {
      marginVertical: 15,
      marginHorizontal: 15
    },
    _CUSTOM_TRANSACTION_ITEM_CONTAINER = {
      height: 184
    },
    _TRANSACTION_CONTAINER_DIRECTION = {
      marginHorizontal: 15
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
    _CUSTOM_BRIEF_DETAIL_ROW_TEXT = {
      fontSize: 14
    },
    _CUSTOM___GLOBAL_ICONS_IN_PILOT = {
      height: 23,
      width: 15
    },
    _CUSTOM___GLOBAL_ICONS_IN_ROLE = {
      height: 32
    },
    _CUSTOM_TRANSACTION_PIN = {
      marginBottom: _CUSTOM_CONTENT.marginHorizontal * 2
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.height += 10;
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.width += 10;

    _CUSTOM_CONTENT.marginHorizontal = 202;

    _CUSTOM_TRANSACTION_ITEM_CONTAINER.height += 48;

    _CUSTOM___GLOBAL_ICONS_IN_ROLE.height += 14;

    _TRANSACTION_CONTAINER_DIRECTION.marginHorizontal += 5;

    _CUSTOM_BRIEF_DETAIL_TITLE.width -= 380;
    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 6;

    _CUSTOM_BRIEF_DETAIL_SUBTITLE.width -= 380;
    _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontSize += 4;

    _CUSTOM_BRIEF_DETAIL_ROW_TEXT.fontSize += 4;

    _CUSTOM_TRANSACTION_PIN.marginBottom = 15;
  }else{
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.height += 2;
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.width += 2;

    _CUSTOM_TRANSACTION_ITEM_CONTAINER.height += 3;

    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 3;

    _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontSize += 1;

    _CUSTOM_BRIEF_DETAIL_ROW_TEXT.fontSize += 1;

    _CUSTOM_TRANSACTION_PIN.marginBottom = _CUSTOM_CONTENT.marginHorizontal;
  }

  if (!I18nManager.isRTL){
    _CUSTOM_BRIEF_DETAIL_TITLE.fontWeight = 'bold';
    _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontWeight = 'bold';
    _CUSTOM_BRIEF_DETAIL_ROW_TEXT.fontWeight = 'bold';
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 162;

    _CUSTOM_TRANSACTION_ITEM_CONTAINER.height += 16;

    _CUSTOM___GLOBAL_ICONS_IN_ROLE.height += 4;

    _CUSTOM_BRIEF_DETAIL_TITLE.width -= 300;
    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 1;

    _CUSTOM_BRIEF_DETAIL_SUBTITLE.width -= 300;

    _CUSTOM_BRIEF_DETAIL_ROW_TEXT.fontSize += 1;
  }else{
    if (!_IS_IPHONE_X){
      _CUSTOM_TRANSACTION_ITEM_CONTAINER.height += 1;
    }
  }
}

module.exports = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.single.blackSqueeze
  },
  Content: {
    ..._CUSTOM_CONTENT
  },
  EmptyContent: {
    flex: 1,
    justifyContent: 'center'
  },
  EmptyContentLink: {
    alignItems: 'center'
  },
  TransactionItemContainer: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    ..._CUSTOM_TRANSACTION_ITEM_CONTAINER,
    padding: 18
  },
  DetailItemMasterInfoContent: {
    justifyContent: 'center'
  },
  DetailItemMasterSubInfoContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  BriefDetailSubRowIconContainer: {
    marginRight: 18
  },
  BriefDetailTitle: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: 'left',
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_TITLE
  },
  BriefDetailSubtitle: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: 'left',
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_SUBTITLE
  },
  BriefDetailRowText: {
    color: colors.single.romance,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_ROW_TEXT
  },
  TransactionItemContainerWithEmptyPositionContent: {
    backgroundColor: colors.single.romance
  },
  TransactionPin: {
    width: width - (_CUSTOM_CONTENT.marginHorizontal * 2),
    marginHorizontal: _CUSTOM_CONTENT.marginHorizontal,
    ..._CUSTOM_TRANSACTION_PIN
  },
  LTR_ProfileContainer: {
    marginRight: _TRANSACTION_CONTAINER_DIRECTION.marginHorizontal
  },
  RTL_ProfileContainer: {
    marginLeft: _TRANSACTION_CONTAINER_DIRECTION.marginHorizontal
  },
  LTR_ContentAlignment: {
    alignItems: 'flex-start'
  },
  RTL_ContentAlignment: {
    alignItems: 'flex-end'
  },
  __Gobal_Icons_In_Pilot: {
    ..._CUSTOM___GLOBAL_ICONS_IN_PILOT
  },
  __Global_Icons_In_Role: {
    ..._CUSTOM___GLOBAL_ICONS_IN_ROLE
  }
});
