import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions, Platform, I18nManager } from 'react-native';
const _SCREEN = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator } from '../../assets/layouts/index';
import { Input, Carousel } from '../../assets/components/index';
const Styles = Views.Dashboard.Self;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Dashboard.Self;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.dashboard.self;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

const Dashboard = (props) => {
  const { navigation } = props;

  var attitude = {},
      _FIRST_CAROUSEL_CONTENT;

  attitude.language = (typeof props.language != 'undefined')? Functions._convertTokenToKeyword(props.language.key): 'en';

  if (
    (Object.keys(props.dashboard.overallDetail).length === 0) &&
    (props.dashboard.loadingOverallDetail === false) &&
    (props.dashboard.connected.status === true)
  ){
    props.fetchCurrentUserOverallDetail();
  }

  if (props.dashboard.loadingOverallDetail){
    _FIRST_CAROUSEL_CONTENT = (
      <Input
        type={__CONSTANTS.firstCarousel.type}
        name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarousel.title.en)}
        gradient={Global.colors.pair.chaid}
        style={[
          Styles.DetailContainer,
          Styles.BriefDetailContainer,
          {
            marginHorizontal: Styles.BriefDetailContainer.padding
          }
        ]}>
          <ActivityIndicator/>
      </Input>
    );
  }else{
    if (!props.dashboard.connected.status){
      _FIRST_CAROUSEL_CONTENT = (
        <Input
          type={__CONSTANTS.firstCarousel.type}
          name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarousel.title.en)}
          style={[
            Styles.DetailContainer,
            Styles.BriefDetailContainer,
            {
              marginHorizontal: Styles.BriefDetailContainer.padding,
              backgroundColor: Global.colors.single.carminePink
            }
          ]}
          textStyle={{
            color: Global.colors.single.romance
          }}
          value={props.dashboard.connected.content}
          onPress={() => props.fetchCurrentUserOverallDetail()}/>
      );
    }else{
      const _FIRST_CAROUSEL_ITEMS = __CONSTANTS.firstCarousel.content;

      let _FIRST_CAROUSEL_OTHER_OPTIONS = {},
          _ITEM_WIDTH_COEFFICIENT = (_SCREEN.width >= 1000 || _SCREEN.height >= 1000)? 2: ((Object.keys(props.dashboard.overallDetail).length > 0)? ((Platform.OS !== 'ios')? 4: 2): 2);

      if (Platform.OS !== 'ios'){
        _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';
        _FIRST_CAROUSEL_OTHER_OPTIONS.loop = true;

        if (I18nManager.isRTL){
          _FIRST_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = {
            flexDirection: 'row-reverse'
          };
        }
      }

      _FIRST_CAROUSEL_CONTENT = (
        <Carousel
          name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarousel.title.en)}
          data={Object.keys(props.dashboard.overallDetail)}
          firstItem={0}
          itemWidth={_SCREEN.width - (Styles.Content.marginHorizontal * _ITEM_WIDTH_COEFFICIENT)}
          style={Styles.CarouselContainer}
          onLayout={({ item, i }) => {
            const _CAROUSEL_CURRENT_ITEM_INDEX = _FIRST_CAROUSEL_ITEMS.findIndex((briefDetailItem, j) => {
                    const _ITEM = Functions._convertTokenToKeyword(item),
                          _CURRENT_ITEM = Functions._convertTokenToKeyword(briefDetailItem.title.en);

                    return (_ITEM === _CURRENT_ITEM);
                  }),
                  _ITEM_TITLE = Functions._convertKeywordToToken(_FIRST_CAROUSEL_ITEMS[_CAROUSEL_CURRENT_ITEM_INDEX].title[attitude.language]),
                  _ITEM_TARGET_SCREEN = _FIRST_CAROUSEL_ITEMS[_CAROUSEL_CURRENT_ITEM_INDEX].screen.name,
                  _ITEM_UNIT = _FIRST_CAROUSEL_ITEMS[_CAROUSEL_CURRENT_ITEM_INDEX].unit[attitude.language],
                  _ITEM_GRADIENNT = Global.colors.pair[_FIRST_CAROUSEL_ITEMS[_CAROUSEL_CURRENT_ITEM_INDEX].gradientKey] || Global.colors.pair.chaid;

            return (
              <Input
                type={__CONSTANTS.firstCarousel.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarousel.title.en)}
                gradient={Global.colors.pair.chaid}
                style={[
                  Styles.DetailContainer,
                  Styles.LTR_ContentAlignment,
                  Styles.BriefDetailContainer
                ]}
                onPress={() => navigation.navigate(_ITEM_TARGET_SCREEN)}>
                  <Text
                    style={Styles.BriefDetailTitle}>
                      {props.dashboard.overallDetail[item].count} {_ITEM_UNIT}
                  </Text>
                  <Text
                    style={Styles.BriefDetailSubtitle}>
                      {_ITEM_TITLE}
                  </Text>
              </Input>
            );
          }}
          {..._FIRST_CAROUSEL_OTHER_OPTIONS}/>
      );
    }
  }

  return (
    <ScrollView
      contentContainerStyle={Styles.Container}
      showsVerticalScrollIndicator={false}>
        {_FIRST_CAROUSEL_CONTENT}
    </ScrollView>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
