import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, I18nManager } from 'react-native';

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
    _CUSTOM_INNER_INPUT_CONTAINER_FOR_TAGS = {
      fontSize: 18
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
      borderRadius: 5,
      paddingHorizontal: 16
    },
    _CUSTOM_CONTAINER_WITH_TAGS = {
      minHeight: 109,
      borderWidth: 2,
      borderRadius: 5,
      paddingHorizontal: 16,
      paddingTop: 16
    },
    _CUSTOM_CONTAINER_WITH_TAGS_INPUT = {
      fontSize: 18,
    },
    _CUSTOM_CONTAINER_WITH_BUTTON = {
      borderWidth: 2,
      borderRadius: 5
    },
    _CUSTOM_CONTAINER_WITH_PHOTO = {
      borderWidth: 2,
      borderRadius: 5
    },
    _CUSTOM_PHOTO_CONTAINER = {
      margin: 17,
      width: 107,
      height: 107,
      borderRadius: 5
    },
    _CUSTOM_PHOTO_INPUT_LABEL_CONTAINER = {
      width: 148
    },
    _CUSTOM_PHOTO_INPUT_LABEL_CONTENT = {
      fontSize: 18
    },
    _CUSTOM_BUTTON_CONTAINER = {
      borderRadius: 5,
      height: 59
    },
    _CUSTOM_BUTTON_TITLE = {
      fontSize: 18
    },
    _CUSTOM_REVERSE_TEXT_INPUT_LINK_CONTAINER = {}
    _CUSTOM_STATIC_TEXT_INPUT_LINK_CONTAINER = {};

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_INNER_INPUT_CONTAINER.height += 20;
    _CUSTOM_INNER_INPUT_CONTAINER.fontSize += 6;

    _CUSTOM_INNER_INPUT_CONTAINER_FOR_TAGS.fontSize += 6;

    _CUSTOM_TEXT_INPUT_CONTAINER.height += 20;
    _CUSTOM_TEXT_INPUT_CONTAINER.fontSize += 6;
    _CUSTOM_TEXT_INPUT_CONTAINER.width = '85%';

    _CUSTOM_CONTAINER_WITHOUT_BUTTON.height += 20;
    _CUSTOM_CONTAINER_WITHOUT_BUTTON.fontSize += 6;
    _CUSTOM_CONTAINER_WITHOUT_BUTTON.borderWidth += 1;
    _CUSTOM_CONTAINER_WITHOUT_BUTTON.borderRadius += 2;
    _CUSTOM_CONTAINER_WITHOUT_BUTTON.paddingHorizontal += 10;

    _CUSTOM_CONTAINER_WITH_TAGS.minHeight += 20;
    _CUSTOM_CONTAINER_WITH_TAGS.borderWidth += 1;
    _CUSTOM_CONTAINER_WITH_TAGS.borderRadius += 2;
    _CUSTOM_CONTAINER_WITH_TAGS.paddingHorizontal += 10;
    _CUSTOM_CONTAINER_WITH_TAGS.paddingTop += 10;
    _CUSTOM_CONTAINER_WITH_TAGS_INPUT.fontSize += 6;

    _CUSTOM_CONTAINER_WITH_BUTTON.borderWidth += 1;
    _CUSTOM_CONTAINER_WITH_BUTTON.borderRadius += 2;

    _CUSTOM_CONTAINER_WITH_PHOTO.borderWidth += 1;
    _CUSTOM_CONTAINER_WITH_PHOTO.borderRadius += 2;

    _CUSTOM_CONTAINER_WITH_PHOTO.borderRadius += 2;

    _CUSTOM_PHOTO_CONTAINER.borderRadius += 2;
    _CUSTOM_PHOTO_CONTAINER.width += 38;
    _CUSTOM_PHOTO_CONTAINER.height += 38;
    _CUSTOM_PHOTO_CONTAINER.margin += 5;

    _CUSTOM_PHOTO_INPUT_LABEL_CONTAINER.width += 130;

    _CUSTOM_PHOTO_INPUT_LABEL_CONTENT.fontSize += 6;

    _CUSTOM_BUTTON_CONTAINER.height += 20;
    _CUSTOM_BUTTON_CONTAINER.borderRadius += 2;
    _CUSTOM_BUTTON_TITLE.fontSize += 8;

    _CUSTOM_STATIC_TEXT_INPUT_LINK_CONTAINER[/*(I18nManager.isRTL)? 'right': */'left'] = 23;

    _CUSTOM_TEXT_INPUT_LINK.paddingVertical += 3;
    _CUSTOM_TEXT_INPUT_LINK.height += 16;

    _CUSTOM_MASTER_CONTAINER.borderWidth += 1;
    _CUSTOM_MASTER_CONTAINER.borderRadius += 2;
  }else{
    _CUSTOM_TEXT_INPUT_CONTAINER.width = '85%';

    _CUSTOM_CONTAINER_WITHOUT_BUTTON.paddingHorizontal += 3;

    _CUSTOM_CONTAINER_WITH_TAGS.paddingHorizontal += 3;
    _CUSTOM_CONTAINER_WITH_TAGS.paddingTop += 3;

    _CUSTOM_STATIC_TEXT_INPUT_LINK_CONTAINER[/*(I18nManager.isRTL)? 'right': */'left'] = 18;

    _CUSTOM_TEXT_INPUT_LINK.paddingVertical -= 2;
    _CUSTOM_TEXT_INPUT_LINK.height += 3;

    _CUSTOM_PHOTO_CONTAINER.width += 4;
    _CUSTOM_PHOTO_CONTAINER.height += 4;

    _CUSTOM_PHOTO_INPUT_LABEL_CONTAINER.width += 38;

    _CUSTOM_BUTTON_TITLE.fontSize += 1;
  }

  if (!I18nManager.isRTL){
    _CUSTOM_INNER_INPUT_CONTAINER.fontWeight = '500';
    _CUSTOM_INNER_INPUT_CONTAINER_FOR_TAGS.fontWeight = '500';
    _CUSTOM_TEXT_INPUT_CONTAINER.fontWeight = '500';
    _CUSTOM_CONTAINER_WITHOUT_BUTTON.fontWeight = '500';
    _CUSTOM_CONTAINER_WITH_TAGS_INPUT.fontWeight = '500';
    _CUSTOM_BUTTON_TITLE.fontWeight = '500';
    _CUSTOM_PHOTO_INPUT_LABEL_CONTENT.fontWeight = '500';
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_TEXT_INPUT_CONTAINER.width = '86%';

    _CUSTOM_TEXT_INPUT_LINK.paddingVertical -= 2;
    _CUSTOM_TEXT_INPUT_LINK.height += 3;

    _CUSTOM_CONTAINER_WITH_PHOTO.borderRadius += 1;

    _CUSTOM_PHOTO_CONTAINER.borderRadius += 1;
    _CUSTOM_PHOTO_CONTAINER.width += 10;
    _CUSTOM_PHOTO_CONTAINER.height += 10;

    _CUSTOM_PHOTO_INPUT_LABEL_CONTAINER.width += 125;

    _CUSTOM_PHOTO_INPUT_LABEL_CONTENT.fontSize += 1;
  }else{
    _CUSTOM_TEXT_INPUT_CONTAINER.width = '81.5%';
  }

  _CUSTOM_REVERSE_TEXT_INPUT_LINK_CONTAINER[(I18nManager.isRTL)? 'right': 'left'] = 18;
  _CUSTOM_STATIC_TEXT_INPUT_LINK_CONTAINER[/*(I18nManager.isRTL)? 'right': */'left'] = 18;
}

module.exports = StyleSheet.create({
  ContainerWithoutButton: {
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    borderColor: colors.single.mercury,
    backgroundColor: colors.single.romance,
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: (I18nManager.isRTL)? 'right': 'left',
    ..._CUSTOM_CONTAINER_WITHOUT_BUTTON
  },
  ContainerWithButton: {
    borderColor: colors.single.mercury,
    backgroundColor: colors.single.romance,
    flexDirection: 'row',
    alignItems: 'flex-start',
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    ..._CUSTOM_CONTAINER_WITH_BUTTON
  },
  ContainerWithTags: {
    borderColor: colors.single.mercury,
    backgroundColor: colors.single.romance,
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    alignItems: 'flex-start',
    ..._CUSTOM_CONTAINER_WITH_TAGS
  },
  ContainerWithTagsContent: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  ContainerWithTagsInput: {
    width: '100%',
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: (I18nManager.isRTL)? 'right': 'left',
    marginTop: -15,
    ..._CUSTOM_CONTAINER_WITH_TAGS_INPUT
  },
  ContainerWithIcon: {
    borderColor: colors.single.mercury,
    backgroundColor: colors.single.romance,
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    flexDirection: 'row',
    alignItems: 'center',
    ..._CUSTOM_CONTAINER_WITH_BUTTON
  },
  TagItemContainer: {
    flexDirection: 'row',
    marginRight: _CUSTOM_CONTAINER_WITH_TAGS.paddingHorizontal,
    marginBottom: _CUSTOM_CONTAINER_WITH_TAGS.paddingHorizontal,
    paddingHorizontal: _CUSTOM_CONTAINER_WITH_TAGS.paddingHorizontal,
    height: _CUSTOM_CONTAINER_WITHOUT_BUTTON.height - 19
  },
  TagItemContentIcon: {
    marginRight: _CUSTOM_CONTAINER_WITH_TAGS.paddingHorizontal
  },
  TagItemContentText: {
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: (I18nManager.isRTL)? 'right': 'left',
    ..._CUSTOM_CONTAINER_WITH_TAGS_INPUT
  },
  PhotoInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    direction: (I18nManager.isRTL)? 'rtl': 'ltr'
  },
  ContainerWithPhoto: {
    borderColor: colors.single.mercury,
    backgroundColor: colors.single.romance,
    ..._CUSTOM_CONTAINER_WITH_PHOTO
  },
  PhotoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ..._CUSTOM_PHOTO_CONTAINER
  },
  PhotoContainerWithPhoto: {

  },
  PhotoContainerWithoutPhoto: {
    backgroundColor: colors.single.mercury
  },
  PhotoContainerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  PhotoInputLabelContainer: {
    alignItems: 'flex-start',
    textAlign: (I18nManager.isRTL)? 'right': 'left',
    ..._CUSTOM_PHOTO_INPUT_LABEL_CONTAINER
  },
  PhotoInputLabelContent: {
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    color: colors.single.lavenderGray,
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: 'left',
    ..._CUSTOM_PHOTO_INPUT_LABEL_CONTENT
  },
  TextInputContainer: {
    flex: 1,
    flexGrow: 1,
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: (I18nManager.isRTL)? 'right': 'left',
    paddingLeft: 16,
    ..._CUSTOM_TEXT_INPUT_CONTAINER
  },
  TextInputLinkContainer: {
    paddingHorizontal: 16
  },
  TextInputLink: {
    ..._CUSTOM_TEXT_INPUT_LINK
  },
  InnerInputContainer: {
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    borderWidth: 0,
    borderColor: colors.single.mercury,
    backgroundColor: colors.single.romance,
    borderRadius: 0,
    ..._CUSTOM_INNER_INPUT_CONTAINER
  },
  InnerInputContainerForTags: {
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    borderWidth: 0,
    borderColor: colors.single.mercury,
    backgroundColor: colors.single.romance,
    borderRadius: 0,
    ..._CUSTOM_INNER_INPUT_CONTAINER_FOR_TAGS
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
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BUTTON_TITLE
  },
  CreditCardContainer: {
    backgroundColor: colors.single.mercury,
    width: 40,
    height: 25,
    borderRadius: _CUSTOM_CONTAINER_WITH_BUTTON.borderRadius,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 0.75,
    shadowColor: colors.single.rangoonGreen,
    shadowOffset: {
      width: 0.5,
      height: 0.75
    }
  },
  MASTERCARD: {
    backgroundColor: colors.organization.mastercard.white
  },
  VISA: {
    backgroundColor: colors.organization.visa.bunting
  },
  AMERICAN_EXPRESS: {
    backgroundColor: colors.organization.americanExpress.denim
  },
  DISCOVER: {
    backgroundColor: colors.organization.discover.white
  },
  PAYPAL: {
    backgroundColor: colors.organization.paypal.white
  }
});
