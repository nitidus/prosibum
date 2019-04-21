import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, I18nManager } from 'react-native';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_CONTAINER = {
      marginVertical: 59
    },
    _CUSTOM_PINNED_PROFILE_CONTAINER = {
      width: 96,
      height: 96,
      marginBottom: 63,
      borderRadius: 5
    },
    _CUSTOM_INGLE_ITEM_CONTENT = {
      fontSize: 32,
      marginBottom: 30
    },
    _CUSTOM_PINNED_ITEM = {
      fontSize: 17
    };

_CUSTOM_CONTAINER[((I18nManager.isRTL)? 'right': 'left')] = 25;
_CUSTOM_PINNED_ITEM[((I18nManager.isRTL)? 'marginLeft': 'marginRight')] = 40;

if (Platform.OS === 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTAINER.marginVertical += 20;

    _CUSTOM_PINNED_PROFILE_CONTAINER.width += 10;
    _CUSTOM_PINNED_PROFILE_CONTAINER.height += 10;
    _CUSTOM_PINNED_PROFILE_CONTAINER.marginBottom += 5;
    _CUSTOM_PINNED_PROFILE_CONTAINER.borderRadius += 1;

    _CUSTOM_INGLE_ITEM_CONTENT.fontSize += 2;
    _CUSTOM_INGLE_ITEM_CONTENT.marginBottom += 2;

    _CUSTOM_PINNED_ITEM.fontSize += 1;
    _CUSTOM_PINNED_ITEM[((I18nManager.isRTL)? 'marginLeft': 'marginRight')] += 5;
  }else{
    if (!_IS_IPHONE_X){
      _CUSTOM_CONTAINER.marginVertical -= 10;
    }
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTAINER.marginVertical += 30;

    _CUSTOM_PINNED_PROFILE_CONTAINER.width += 35;
    _CUSTOM_PINNED_PROFILE_CONTAINER.height += 35;
    _CUSTOM_PINNED_PROFILE_CONTAINER.marginBottom += 20;
    _CUSTOM_PINNED_PROFILE_CONTAINER.borderRadius += 2;

    _CUSTOM_INGLE_ITEM_CONTENT.fontSize += 11;
    _CUSTOM_INGLE_ITEM_CONTENT.marginBottom += 5;

    _CUSTOM_PINNED_ITEM.fontSize += 5;
    _CUSTOM_PINNED_ITEM[((I18nManager.isRTL)? 'marginLeft': 'marginRight')] += 15;
  }else{
    _CUSTOM_CONTAINER.marginVertical -= 10;
  }
}

module.exports = StyleSheet.create({
  Container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    ..._CUSTOM_CONTAINER
  },
  PinnedProfileMajorContainer: {
    shadowColor: colors.single.rangoonGreen,
    shadowOpacity: 0.15,
    shadowRadius: 30,
    shadowOffset: {
      width: 0,
      height: 15
    }
  },
  PinnedProfileContainer: {
    overflow: 'hidden',
    ..._CUSTOM_PINNED_PROFILE_CONTAINER
  },
  NoImagePinnedProfileContainer: {
    backgroundColor: colors.single.wildSand,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  PinnedProfileWithImageMajorContainer: {

  },
  PinnedProfileOverlay: {

  },
  SingleItemContent: {
    fontFamily: fonts.sanFrancisco.textBold,
    color: colors.single.romance,
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    ..._CUSTOM_INGLE_ITEM_CONTENT
  },
  MenuItemsContainer: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr'
  },
  PinnedItemsContainer: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    justifyContent: 'flex-end',
    flex: 1
  },
  PinnedItemGroup: {
    flexDirection: 'row',
    direction: (I18nManager.isRTL)? 'rtl': 'ltr'
  },
  PinnedItem: {
    fontFamily: fonts.sanFrancisco.textBold,
    color: colors.single.romance,
    ..._CUSTOM_PINNED_ITEM
  }
});
