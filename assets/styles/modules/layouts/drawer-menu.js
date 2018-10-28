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
    width: 96,
    height: 96,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 63
  },
  NoImagePinnedProfileContainer: {
    backgroundColor: colors.single.romance,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  PinnedProfileWithImageMajorContainer: {

  },
  PinnedProfileOverlay: {

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
