import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions, Platform } from 'react-native';

import { Global, Views } from '../../assets/styles/index';
import { Input, Carousel } from '../../assets/components/index';
const Styles = Views.Dashboard.Self,
      _SCREEN = Dimensions.get('window');

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.dashboard;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

export const Dashboard = (props) => {
  const { navigation } = props,
        _FIRST_CAROUSEL_ITEMS = __CONSTANTS.firstCarousel.content,
        _FIRST_CAROUSEL_OTHER_OPTIONS = {},
        _ITEM_WIDTH_COEFFICIENT = (_SCREEN.width >= 1000 || _SCREEN.height >= 1000)? 2: 4;

  if (Platform.OS !== 'ios'){
    _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';
    _FIRST_CAROUSEL_OTHER_OPTIONS.loop = true;
  }

  return (
    <ScrollView
      contentContainerStyle={Styles.Container}
      showsVerticalScrollIndicator={false}>
        <Carousel
          name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarousel.title.en)}
          data={[
            {
              key: "wallets",
              value: 8
            },
            {
              key: "roles",
              value: 12
            }
          ]}
          firstItem={0}
          itemWidth={_SCREEN.width - (Styles.Content.marginHorizontal * _ITEM_WIDTH_COEFFICIENT)}
          onLayout={({ item, i }) => {
            const _CAROUSEL_CURRENT_ITEM_INDEX = _FIRST_CAROUSEL_ITEMS.findIndex((briefDetailItem, j) => {
                    const _ITEM = Functions._convertTokenToKeyword(item.key),
                          _CURRENT_ITEM = Functions._convertTokenToKeyword(briefDetailItem.title.en);

                    return (_ITEM === _CURRENT_ITEM);
                  }),
                  _ITEM_KEY = Functions._convertTokenToKeyword(item.key),
                  _ITEM_TITLE = Functions._convertKeywordToToken(_FIRST_CAROUSEL_ITEMS[_CAROUSEL_CURRENT_ITEM_INDEX].title.en),
                  _ITEM_TARGET_SCREEN = _FIRST_CAROUSEL_ITEMS[_CAROUSEL_CURRENT_ITEM_INDEX].screen.name,
                  _ITEM_UNIT = _FIRST_CAROUSEL_ITEMS[_CAROUSEL_CURRENT_ITEM_INDEX].unit.en,
                  _ITEM_GRADIENNT = Global.colors.pair[_FIRST_CAROUSEL_ITEMS[_CAROUSEL_CURRENT_ITEM_INDEX].gradientKey] || Global.colors.pair.chaid;

            return (
              <Input
                type={__CONSTANTS.firstCarousel.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarousel.title.en)}
                gradient={Global.colors.pair.chaid}
                style={[
                  Styles.DetailContainer,
                  Styles.BriefDetailContainer,
                  Styles.LTR_ContentAlignment
                ]}
                onPress={() => navigation.navigate(_ITEM_TARGET_SCREEN)}>
                  <Text
                    style={Styles.BriefDetailTitle}>
                      {item.value} {_ITEM_UNIT}
                  </Text>
                  <Text
                    style={Styles.BriefDetailSubtitle}>
                      {_ITEM_TITLE}
                  </Text>
              </Input>
            );
          }}
          {..._FIRST_CAROUSEL_OTHER_OPTIONS}/>
    </ScrollView>
  )
}
