import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text, Dimensions, Platform, I18nManager } from 'react-native';
const _SCREEN = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator } from '../../assets/layouts/index';
import { Input, Link, Carousel } from '../../assets/components/index';
const Styles = Views.Products.Self;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.Self;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.self;

import { Functions, Global as GLOBAL } from '../../assets/modules/index';
const { Preparation } = Functions;

const Products = (props) => {
  const { navigation } = props;

  var attitude = {};

  attitude.language = (typeof props.language != 'undefined')? Functions._convertTokenToKeyword(props.language.key): 'en';

  var _FINAL_CONTENT;

  if ((typeof props.main != 'undefined') && (typeof props.sub != 'undefined')){
    if ((Object.keys(props.main).length > 0) && (Object.keys(props.sub).length > 0)){
      const _SUB_TAB_KEY = Functions._convertTokenToKeyword(props.sub.en);

      switch (_SUB_TAB_KEY) {
        case 'published':
        default:
          _FINAL_CONTENT = (
            <Link
              containerStyle={Styles.EmptyContentContainer}
              value={__CONSTANTS.state.empty[_SUB_TAB_KEY][attitude.language]} />
          );
          break;

        case 'drafted':
          if (props.products.draftedItems.length === 0){
            Functions._retrieveDataWithKey(GLOBAL.STORAGE.FRAGMENT_DRAFT)
            .then((storedDraftItems) => {
              if (storedDraftItems !== false){
                const _PARSED_DRAFT_ITEMS = JSON.parse(storedDraftItems);

                props.setDraftedItems(_PARSED_DRAFT_ITEMS);
              }
            });
          }

          if (props.products.draftedItems.length > 0){
            _FINAL_CONTENT = (
              <FlatList
                name={Functions._convertTokenToKeyword(__CONSTANTS.state.full.drafted.container.title.en)}
                data={props.products.draftedItems}
                style={Styles.CarouselContainer}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  let _PRODUCT_TAGS = item.product.tags.toString(),
                      _PRODUCT_NAME = item.name;

                  return (
                    <Input
                      type={__CONSTANTS.state.full.drafted.container.content.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.state.full.drafted.container.content.title.en)}
                      gradient={Global.colors.pair.chaid}
                      style={[
                        Styles.DetailContainer,
                        Styles.LTR_ContentAlignment,
                        Styles.BriefDetailContainer
                      ]}
                      onPress={() => {
                        if ((typeof item.product != 'undefined') && (typeof item.name != 'undefined')){
                          if (Object.keys(item.product).length > 0){
                            if (typeof item.features != 'undefined'){
                              if (item.features.length > 0){
                                navigation.navigate("NewFragmentFeatures", item);
                              }else{
                                navigation.navigate("NewFragmentIdentity", item);
                              }
                            }else{
                              navigation.navigate("NewFragmentIdentity", item);
                            }
                          }
                        }
                      }}>
                        <Text
                          style={Styles.BriefDetailTitle}>
                            {
                              Functions._lodash.truncate(_PRODUCT_TAGS, {
                                length: 16,
                                separator: ' '
                              })
                            }
                        </Text>
                        <Text
                          style={Styles.BriefDetailSubtitle}>
                            {_PRODUCT_NAME}
                        </Text>
                    </Input>
                  );
                }}/>
            );
          }else{
            _FINAL_CONTENT = (
              <Link
                containerStyle={Styles.EmptyContentContainer}
                value={__CONSTANTS.state.empty[_SUB_TAB_KEY][attitude.language]} />
            );
          }
          break;

        case 'suspended':
          _FINAL_CONTENT = (
            <Link
              containerStyle={Styles.EmptyContentContainer}
              value={__CONSTANTS.state.empty[_SUB_TAB_KEY][attitude.language]} />
          );
          break;
      }
    }else{
      _FINAL_CONTENT = (
        <ActivityIndicator/>
      );
    }
  }else{
    _FINAL_CONTENT = (
      <ActivityIndicator/>
    );
  }

  return (
    <View
      style={Styles.Container}>
        {_FINAL_CONTENT}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
