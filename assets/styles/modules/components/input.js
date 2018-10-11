import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_TEXT_INPUT_LINK = {
      paddingVertical: 20,
      height: 59
    },
    _CUSTOM_INNER_INPUT_CONTAINER = {
      fontSize: 18,
      height: 59
    },
    _CUSTOM_MASTER_CONTAINER = {
      borderWidth: 2,
      borderRadius: 5
    },
    _CUSTOM_TEXT_INPUT_CONTAINER = {
      fontSize: 18,
      height: 59
    },
    _CUSTOM_CONTAINER_WITHOUT_BUTTON = {
      fontSize: 18,
      height: 59,
      borderWidth: 2,
      borderRadius: 5
    },
    _CUSTOM_CONTAINER_WITH_BUTTON = {
      borderWidth: 2,
      borderRadius: 5
    },
    _CUSTOM_BUTTON_CONTAINER = {
      borderRadius: 5,
      height: 59
    },
    _CUSTOM_BUTTON_TITLE = {
      fontSize: 18
    },
    _CUSTOM_RTL_TEXT_INPUT_LINK_CONTAINER = {},
    _CUSTOM_LTR_TEXT_INPUT_LINK_CONTAINER = {};

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_INNER_INPUT_CONTAINER.height += 20;
    _CUSTOM_INNER_INPUT_CONTAINER.fontSize += 6;

    _CUSTOM_TEXT_INPUT_CONTAINER.height += 20;
    _CUSTOM_TEXT_INPUT_CONTAINER.fontSize += 6;
    _CUSTOM_TEXT_INPUT_CONTAINER.width = '85%';

    _CUSTOM_CONTAINER_WITHOUT_BUTTON.height += 20;
    _CUSTOM_CONTAINER_WITHOUT_BUTTON.fontSize += 6;
    _CUSTOM_CONTAINER_WITHOUT_BUTTON.borderWidth += 1;
    _CUSTOM_CONTAINER_WITHOUT_BUTTON.borderRadius += 2;

    _CUSTOM_CONTAINER_WITH_BUTTON.borderWidth += 1;
    _CUSTOM_CONTAINER_WITH_BUTTON.borderRadius += 2;

    _CUSTOM_BUTTON_CONTAINER.height += 20;
    _CUSTOM_BUTTON_CONTAINER.borderRadius += 2;
    _CUSTOM_BUTTON_TITLE.fontSize += 7;

    _CUSTOM_RTL_TEXT_INPUT_LINK_CONTAINER.right = 25;
    _CUSTOM_LTR_TEXT_INPUT_LINK_CONTAINER.left = 25;

    _CUSTOM_TEXT_INPUT_LINK.paddingVertical += 3;
    _CUSTOM_TEXT_INPUT_LINK.height += 16;

    _CUSTOM_MASTER_CONTAINER.borderWidth += 1;
    _CUSTOM_MASTER_CONTAINER.borderRadius += 2;
  }else{
    _CUSTOM_TEXT_INPUT_CONTAINER.width = '85%';

    _CUSTOM_RTL_TEXT_INPUT_LINK_CONTAINER.right = 20;
    _CUSTOM_LTR_TEXT_INPUT_LINK_CONTAINER.left = 20;

    _CUSTOM_TEXT_INPUT_LINK.paddingVertical -= 2;
    _CUSTOM_TEXT_INPUT_LINK.height += 3;
  }

  _CUSTOM_INNER_INPUT_CONTAINER.fontWeight = '500';
  _CUSTOM_TEXT_INPUT_CONTAINER.fontWeight = '500';
  _CUSTOM_CONTAINER_WITHOUT_BUTTON.fontWeight = '500';
  _CUSTOM_BUTTON_TITLE.fontWeight = '500';
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_TEXT_INPUT_CONTAINER.width = '86%';

    _CUSTOM_TEXT_INPUT_LINK.paddingVertical -= 2;
    _CUSTOM_TEXT_INPUT_LINK.height += 3;
  }else{
    _CUSTOM_TEXT_INPUT_CONTAINER.width = '81.5%';
  }

  _CUSTOM_RTL_TEXT_INPUT_LINK_CONTAINER.right = 20;
  _CUSTOM_LTR_TEXT_INPUT_LINK_CONTAINER.left = 20;
}

module.exports = StyleSheet.create({
  ContainerWithoutButton: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    paddingHorizontal: 16,
    borderColor: colors.single.mercury,
    backgroundColor: colors.single.romance,
    ..._CUSTOM_CONTAINER_WITHOUT_BUTTON
  },
  ContainerWithButton: {
    borderColor: colors.single.mercury,
    backgroundColor: colors.single.romance,
    ..._CUSTOM_CONTAINER_WITH_BUTTON
  },
  TextInputConatiner: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    paddingHorizontal: 16,
    ..._CUSTOM_TEXT_INPUT_CONTAINER
  },
  RTL_TextInputLinkContainer: {
    position: 'absolute',
    ..._CUSTOM_RTL_TEXT_INPUT_LINK_CONTAINER
  },
  LTR_TextInputLinkContainer: {
    position: 'absolute',
    ..._CUSTOM_LTR_TEXT_INPUT_LINK_CONTAINER
  },
  TextInputLink: {
    ..._CUSTOM_TEXT_INPUT_LINK
  },
  InnerInputContainer: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    borderWidth: 0,
    borderColor: colors.single.mercury,
    backgroundColor: colors.single.romance,
    borderRadius: 0,
    ..._CUSTOM_INNER_INPUT_CONTAINER
  },
  MasterContainer: {
    borderColor: colors.single.mercury,
    backgroundColor: colors.single.romance,
    overflow: 'hidden',
    ..._CUSTOM_MASTER_CONTAINER
  },
  ButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ..._CUSTOM_BUTTON_CONTAINER
  },
  GradientTypeButtonContainer: {

  },
  RegularTypeButtonContainer: {
    backgroundColor: colors.single.chetwodeBlue
  },
  DisableTypeButtonContainer: {
    backgroundColor: colors.single.mercury
  },
  ButtonTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BUTTON_TITLE
  },
  RTL_Pinned: {
    alignSelf: 'flex-end'
  },
  LTR_Pinned: {
    alignSelf: 'flex-start'
  }
});
