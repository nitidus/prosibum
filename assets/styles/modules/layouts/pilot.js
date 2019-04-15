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
      shadowRadius: 0
    },
    _CUSTOM_TOP_BAR_CONTAINER = {
      shadowOffset: {
        width: 0,
        height: 0.5
      }
    },
    _CUSTOM_TAB_BAR_CONTAINER = {
      shadowOffset: {
        width: 0,
        height: -0.5
      }
    },
    _CUSTOM_HEADER_TITLE = {
      fontSize: 32
    },
    _CUSTOM_HEADER_SUBTITLE = {
      fontSize: 13
    },
    _CUSTOM_PINNED_SIDE = {
      minWidth: 62
    },
    _CUSTOM_SINGLE_TAB_ITEM_CONTAINER = {
      height: 38,
      paddingHorizontal: 25
    },
    _CUSTOM_SINGLE_TAB_ITEM_CONTENT = {
      fontSize: 17
    },
    _CUSTOM_LTR_TAB_ITEMS = {
      marginRight: 60
    },
    _CUSTOM_RTL_TAB_ITEMS = {
      marginLeft: 60
    },
    _CUSTOM_TAB_ITEMS_TEXT = {
      fontSize: 12
    };

if (Platform.OS === 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTAINER = {
      ..._CUSTOM_CONTAINER,
      shadowOpacity: _CUSTOM_CONTAINER.shadowOpacity - 0.15
    };

    _CUSTOM_TOP_BAR_CONTAINER = {
      ..._CUSTOM_TOP_BAR_CONTAINER,
      paddingTop: 25,
      paddingBottom: 15,
      shadowOffset: {
        ..._CUSTOM_TOP_BAR_CONTAINER.shadowOffset,
        height: _CUSTOM_TOP_BAR_CONTAINER.shadowOffset.height + 1
      }
    };

    _CUSTOM_TAB_BAR_CONTAINER = {
      ..._CUSTOM_TAB_BAR_CONTAINER,
      paddingVertical: 15.5,
      shadowOffset: {
        ..._CUSTOM_TAB_BAR_CONTAINER.shadowOffset,
        height: _CUSTOM_TAB_BAR_CONTAINER.shadowOffset.height - 1
      }
    };

    _CUSTOM_LTR_TAB_ITEMS.marginRight *= 2;
    _CUSTOM_RTL_TAB_ITEMS.marginLeft *= 2;

    _CUSTOM_HEADER_TITLE.fontSize += 2;

    _CUSTOM_SINGLE_TAB_ITEM_CONTAINER.height += 4;
    _CUSTOM_SINGLE_TAB_ITEM_CONTAINER.paddingHorizontal += 3;

    _CUSTOM_SINGLE_TAB_ITEM_CONTENT.fontSize += 1;
  }else{
    if (_IS_IPHONE_X){
      _CUSTOM_TOP_BAR_CONTAINER = {
        ..._CUSTOM_TOP_BAR_CONTAINER,
        paddingTop: 40,
        paddingBottom: 15
      };

      _CUSTOM_TAB_BAR_CONTAINER = {
        ..._CUSTOM_TAB_BAR_CONTAINER,
        paddingTop: 15,
        paddingBottom: 25
      };
    }else{
      _CUSTOM_TOP_BAR_CONTAINER = {
        ..._CUSTOM_TOP_BAR_CONTAINER,
        paddingTop: 25,
        paddingBottom: 15
      };

      _CUSTOM_TAB_BAR_CONTAINER = {
        ..._CUSTOM_TAB_BAR_CONTAINER,
        paddingVertical: 12
      };
    }
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_TOP_BAR_CONTAINER = {
      ..._CUSTOM_TOP_BAR_CONTAINER,
      paddingVertical: 20
    };

    _CUSTOM_TAB_BAR_CONTAINER = {
      ..._CUSTOM_TAB_BAR_CONTAINER,
      paddingVertical: 25
    };

    _CUSTOM_TAB_ITEMS_TEXT.fontSize += 5;

    _CUSTOM_LTR_TAB_ITEMS.marginRight *= 3;
    _CUSTOM_RTL_TAB_ITEMS.marginLeft *= 3;

    _CUSTOM_HEADER_TITLE.fontSize += 15;
    _CUSTOM_HEADER_SUBTITLE.fontSize += 5;

    _CUSTOM_PINNED_SIDE.minWidth += 20;

    _CUSTOM_SINGLE_TAB_ITEM_CONTAINER.height += 14;
    _CUSTOM_SINGLE_TAB_ITEM_CONTAINER.paddingHorizontal += 10;

    _CUSTOM_SINGLE_TAB_ITEM_CONTENT.fontSize += 5;
  }else{
    _CUSTOM_TOP_BAR_CONTAINER = {
      ..._CUSTOM_TOP_BAR_CONTAINER,
      paddingVertical: 15
    };

    _CUSTOM_TAB_BAR_CONTAINER = {
      ..._CUSTOM_TAB_BAR_CONTAINER,
      paddingVertical: 12
    };

    _CUSTOM_HEADER_TITLE.fontSize += 5;
    _CUSTOM_HEADER_SUBTITLE.fontSize += 2;

    _CUSTOM_TAB_ITEMS_TEXT.fontSize += 1;
  }

  _CUSTOM_CONTAINER.elevation = 2;
  _CUSTOM_HEADER_TITLE.fontWeight = 'bold';
  _CUSTOM_HEADER_SUBTITLE.fontWeight = 'bold';
  _CUSTOM_TAB_ITEMS_TEXT.fontWeight = 'bold';

  _CUSTOM_SINGLE_TAB_ITEM_CONTENT.fontWeight = '500';
}

module.exports = StyleSheet.create({
  TopBarContainer: {
    backgroundColor: colors.single.romance,
    shadowColor: colors.single.rangoonGreen,
    ..._CUSTOM_CONTAINER,
    ..._CUSTOM_TOP_BAR_CONTAINER
  },
  TabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.single.romance,
    shadowColor: colors.single.rangoonGreen,
    ..._CUSTOM_CONTAINER,
    ..._CUSTOM_TAB_BAR_CONTAINER
  },
  FirstRowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  SecondRowContainer: {
    marginTop: _CUSTOM_TOP_BAR_CONTAINER.paddingVertical || _CUSTOM_TOP_BAR_CONTAINER.paddingBottom,
    paddingHorizontal: _CUSTOM_TOP_BAR_CONTAINER.paddingVertical || _CUSTOM_TOP_BAR_CONTAINER.paddingBottom,
    justifyContent: 'space-between'
  },
  TailRowContainer: {
    marginVertical: _CUSTOM_TOP_BAR_CONTAINER.paddingVertical || _CUSTOM_TOP_BAR_CONTAINER.paddingBottom,
    paddingHorizontal: _CUSTOM_TOP_BAR_CONTAINER.paddingVertical || _CUSTOM_TOP_BAR_CONTAINER.paddingBottom,
    justifyContent: 'space-between'
  },
  ComplexHeaderContainer: {
    flexGrow: 1,
    flex: 1
  },
  ComplexHeaderTitle: {
    fontFamily: fonts.sanFrancisco.textBold,
    color: colors.single.rangoonGreen,
    ..._CUSTOM_HEADER_TITLE
  },
  ComplexHeaderSubtitle: {
    fontFamily: fonts.sanFrancisco.textBold,
    color: colors.single.lavenderGray,
    ..._CUSTOM_HEADER_SUBTITLE
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
    ..._CUSTOM_SINGLE_TAB_ITEM_CONTAINER
  },
  SingleTabItemContent: {
    fontFamily: fonts.sanFrancisco.textBold,
    color: colors.single.romance,
    ..._CUSTOM_SINGLE_TAB_ITEM_CONTENT
  },
  DisabledSingleTabItemContainer: {
    backgroundColor: colors.single.wildSand
  },
  DisabledSingleTabItemContent: {
    color: colors.single.rangoonGreen
  },
  TabItemContainer: {
    marginRight: _CUSTOM_TOP_BAR_CONTAINER.paddingVertical || _CUSTOM_TOP_BAR_CONTAINER.paddingBottom,
    flexGrow: 1
  },
  TabItemsContainer: {
    backgroundColor: colors.single.transparent,
    height: 'auto'
  },
  TabItemsContent: {
    justifyContent: 'center'
  },
  SingleTabItemsContent: {
    alignItems: 'center'
  },
  TabItemsIcon: {
    marginBottom: 4
  },
  TabItemsText: {
    fontFamily: fonts.sanFrancisco.textBold,
    color: colors.single.lavenderGray,
    ..._CUSTOM_TAB_ITEMS_TEXT
  },
  ActivatedTabItemsText: {
    color: colors.single.rangoonGreen,
  },
  LTR_TabItems: {
    ..._CUSTOM_LTR_TAB_ITEMS
  },
  RTL_TabItems: {
    ..._CUSTOM_RTL_TAB_ITEMS
  },
  LTR_Items: {
    alignItems: 'flex-start'
  },
  RTL_Items: {
    alignItems: 'flex-end'
  }
});
