import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

import { Functions } from '../../../modules/index';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_CONTAINER = {
      shadowOpacity: 0.25,
      shadowRadius: 0,
      shadowOffset: {
        width: 0,
        height: 0.5
      }
    },
    _CUSTOM_HEADER_TITLE = {
      fontSize: 32
    },
    _CUSTOM_PINNED_SIDE = {
      minWidth: 62
    };

if (Platform.OS === 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTAINER = {
      ..._CUSTOM_CONTAINER,
      paddingTop: 25,
      paddingBottom: 15,
      shadowOpacity: _CUSTOM_CONTAINER.shadowOpacity - 0.15,
      shadowOffset: {
        ..._CUSTOM_CONTAINER.shadowOffset,
        height: _CUSTOM_CONTAINER.shadowOffset.height + 1
      }
    };

    _CUSTOM_HEADER_TITLE.fontSize += 2;
  }else{
    if (_IS_IPHONE_X){
      _CUSTOM_CONTAINER = {
        ..._CUSTOM_CONTAINER,
        paddingTop: 40,
        paddingBottom: 15
      };
    }else{
      _CUSTOM_CONTAINER = {
        ..._CUSTOM_CONTAINER,
        paddingTop: 25,
        paddingBottom: 15
      };
    }
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTAINER = {
      ..._CUSTOM_CONTAINER,
      paddingTop: 20,
      paddingBottom: 20
    };

    _CUSTOM_HEADER_TITLE.fontSize += 15;

    _CUSTOM_PINNED_SIDE.minWidth += 20;
  }else{
    _CUSTOM_CONTAINER = {
      ..._CUSTOM_CONTAINER,
      paddingVertical: 15
    };

    _CUSTOM_HEADER_TITLE.fontSize += 5;
  }

  _CUSTOM_CONTAINER.elevation = 2;
  _CUSTOM_HEADER_TITLE.fontWeight = 'bold';
}

module.exports = StyleSheet.create({
  MainContainer: {
    backgroundColor: colors.single.romance,
    shadowColor: colors.single.rangoonGreen,
    ..._CUSTOM_CONTAINER
  },
  FirstRowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  SecondRowContainer: {
    marginTop: _CUSTOM_CONTAINER.paddingVertical || _CUSTOM_CONTAINER.paddingBottom,
    paddingHorizontal: _CUSTOM_CONTAINER.paddingVertical || _CUSTOM_CONTAINER.paddingBottom,
    justifyContent: 'space-between'
  },
  HeaderTitle: {
    fontFamily: fonts.sanFrancisco.textBold,
    color: colors.single.rangoonGreen,
    flexGrow: 1,
    flex: 1,
    textAlign: 'center',
    ..._CUSTOM_HEADER_TITLE
  },
  PinnedSide: {
    alignItems: 'center',
    ..._CUSTOM_PINNED_SIDE
  },
  SingleTabItemContainer: {
    backgroundColor: colors.single.rangoonGreen,
    height: 38,
    paddingHorizontal: 25
  },
  SingleTabItemContent: {
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 17,
    color: colors.single.romance
  },
  TabItemContainer: {
    marginRight: _CUSTOM_CONTAINER.paddingVertical || _CUSTOM_CONTAINER.paddingBottom,
    flexGrow: 1
  },
  LTR_Items: {
    alignItems: 'flex-start'
  },
  RTL_Items: {
    alignItems: 'flex-end'
  }
});
