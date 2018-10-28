import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  colors, fonts
} from '../../global';

module.exports = StyleSheet.create({
  Container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    marginVertical: 61,
    marginHorizontal: 25
  },
  SingleItemContent: {
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 32,
    color: colors.single.romance,
    marginBottom: 30
  },
  MenuItemsContainer: {

  },
  PinnedItemsContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  PinnedItemGroup: {
    flexDirection: 'row'
  },
  PinnedItem: {
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 17,
    color: colors.single.romance,
    marginRight: 40
  }
});
