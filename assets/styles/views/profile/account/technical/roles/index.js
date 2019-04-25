import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, I18nManager } from 'react-native';

import { Functions } from '../../../../../../modules/index';

import { colors, fonts } from '../../../../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_CONTENT = {
      marginVertical: 15,
      marginHorizontal: 15
    },
    _CUSTOM_ROLE_ITEM_CONTAINER = {
      height: 70,
      marginBottom: 15,
      paddingHorizontal: 15,
      shadowOpacity: 0.15,
      shadowRadius: 30,
      shadowOffset: {
        width: 0,
        height: 15
      }
    },
    _CUSTOM___GLOBAL_ICONS_IN_PILOT = {
      height: 23,
      width: 15
    },
    _CUSTOM___GLOBAL_ICONS_IN_ROLE = {
      height: 32
    },
    _CUSTOM_ROLE_TITLE = {
      fontSize: 17
    },
    _CUSTOM_ROLE_SUBTITLE = {
      fontSize: 13,
      marginTop: 3
    },
    _CUSTOM_PROFILE_CONTAINER = {
      width: 40,
      height: 40,
      borderRadius: 5
    },
    _PROFILE_CONTAINER_DIRECTION = {
      marginHorizontal: 15
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.height += 10;
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.width += 10;

    _CUSTOM_CONTENT.marginHorizontal = 202;

    _CUSTOM_ROLE_ITEM_CONTAINER.height += 25;
    _CUSTOM_ROLE_ITEM_CONTAINER.marginBottom += 5;
    _CUSTOM_ROLE_ITEM_CONTAINER.paddingHorizontal += 5;

    _CUSTOM_ROLE_TITLE.fontSize += 5;

    _CUSTOM_ROLE_SUBTITLE.fontSize += 4;

    _CUSTOM_PROFILE_CONTAINER.width += 14;
    _CUSTOM_PROFILE_CONTAINER.height += 14;

    _CUSTOM___GLOBAL_ICONS_IN_ROLE.height += 14;

    _PROFILE_CONTAINER_DIRECTION.marginHorizontal += 5;
  }else{
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.height += 2;
    _CUSTOM___GLOBAL_ICONS_IN_PILOT.width += 2;

    _CUSTOM_ROLE_ITEM_CONTAINER.height += 3;

    _CUSTOM_ROLE_TITLE.fontSize += 2;
  }

  if (!I18nManager.isRTL){
    _CUSTOM_ROLE_TITLE.fontWeight = '500';
    _CUSTOM_ROLE_SUBTITLE.fontWeight = '500';
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 162;

    _CUSTOM_ROLE_ITEM_CONTAINER.height += 6;

    _CUSTOM_ROLE_TITLE.fontSize += 1;

    _CUSTOM_ROLE_SUBTITLE.fontSize += 1;

    _CUSTOM_PROFILE_CONTAINER.width += 4;
    _CUSTOM_PROFILE_CONTAINER.height += 4;

    _CUSTOM___GLOBAL_ICONS_IN_ROLE.height += 4;
  }else{
    if (!_IS_IPHONE_X){
      _CUSTOM_ROLE_ITEM_CONTAINER.height += 1;
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
  RoleItemContainer: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    shadowColor: colors.single.rangoonGreen,
    alignItems: 'flex-start',
    elevation: 1,
    ..._CUSTOM_ROLE_ITEM_CONTAINER
  },
  RoleItemContainerWithEmptyPositionContent: {
    backgroundColor: colors.single.romance
  },
  RoleItemContent: {
    flexDirection: 'row'
  },
  ProfileContainer: {
    overflow: 'hidden',
    ..._CUSTOM_PROFILE_CONTAINER
  },
  ProfileContainerWithNoPhoto: {
    backgroundColor: colors.single.wildSand,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  ProfileContentWithNoPhoto: {

  },
  RoleDetailContent: {
    justifyContent: 'center'
  },
  RoleTitle: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: 'left',
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    color: colors.single.rangoonGreen,
    ..._CUSTOM_ROLE_TITLE
  },
  RoleSubtitle: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: 'left',
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    color: colors.single.romance,
    ..._CUSTOM_ROLE_SUBTITLE
  },
  ProfileContainerWithPhoto: {

  },
  LTR_ProfileContainer: {
    marginRight: _PROFILE_CONTAINER_DIRECTION.marginHorizontal
  },
  RTL_ProfileContainer: {
    marginLeft: _PROFILE_CONTAINER_DIRECTION.marginHorizontal
  },
  __Gobal_Icons_In_Pilot: {
    ..._CUSTOM___GLOBAL_ICONS_IN_PILOT
  },
  __Global_Icons_In_Role: {
    ..._CUSTOM___GLOBAL_ICONS_IN_ROLE
  }
});
