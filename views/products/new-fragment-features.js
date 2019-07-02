import React, { Component } from 'react';
import { View, ScrollView, FlatList, Dimensions, Platform, Keyboard, I18nManager, Text, Image, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';
import Interactable from 'react-native-interactable';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Options, ProductFeaturesModal } from '../../assets/layouts/index';
import { Input, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewFragment,
      Container = ViewsContainer.Products.NewFragmentContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewFragment;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_fragment_features;

import { Functions, Global as GLOBAL } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewFragmentFeatures extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this,
          { navigation: { state: { params } } } = props,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = _NATIVE_SETTINGS.language;

    await props.setLanguage(_LANGUAGE);

    if (typeof params != 'undefined'){
      if (Object.keys(params).length > 0){
        props.setName(params.name);
        props.setProduct(params.product);
        props.setUnits(params.units);
        props.setQuery(params.query);
        props.setQueryItems(params.queryItems);
      }
    }
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newFragment;

    var _FORM_FIELDS_VALIDITY = false;

    if ((_PROPS.features.length > 0)){
      _FORM_FIELDS_VALIDITY = true;
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    if (Object.keys(props.newFragment.language).length > 0){
      var _FEATURES_CONTENT, _APPEND_FRAGMENT_BUTTON,
          _UNIT_FEATURES = [],
          _FEATURES_ANIMATED_VALUES = [];

      const _LANGUAGE = Functions._convertTokenToKeyword(props.newFragment.language.key),
            _PRODUCT_TITLE = (props.newFragment.name != '')? props.newFragment.name: __CONSTANTS.pilot.title[_LANGUAGE],
            _VALIDATED = this._componentWillCheckValidation(props),
            _PRODUCT_FEATURES_OTHER_PROPS = {
              language: props.newFragment.language,
              features: props.newFragment.units
            },
            _CUSTOM_STYLE = {
              marginBottom: Styles.Content.marginVertical,
              marginHorizontal: Styles.Content.marginHorizontal
            };

      let _FIRST_CAROUSEL_OTHER_OPTIONS = {},
          _ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((props.newFragment.features.length > 1)? ((Platform.OS !== 'ios')? 4: 2): 2);

      if (Platform.OS !== 'ios'){
        _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';
        _FIRST_CAROUSEL_OTHER_OPTIONS.loop = true;

        if (I18nManager.isRTL){
          _FIRST_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = {
            flexDirection: 'row-reverse'
          };
        }
      }

      if (props.newFragment.features.length > 0){
        if (props.newFragment.appendFragmentLoading){
          _APPEND_PRODUCT_BUTTON = (
            <Input
              type={__CONSTANTS.content.submitButton.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
              gradient={Global.colors.pair.ongerine}
              style={{
                marginHorizontal: Styles.Content.marginHorizontal
              }}
              disable={true}>
                <ActivityIndicator/>
            </Input>
          );
        }else{
          if (!props.newFragment.connected.status){
            _APPEND_PRODUCT_BUTTON = (
              <Input
                type={__CONSTANTS.content.submitButton.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
                value={props.newFragment.connected.content}
                style={[
                  Styles.ErrorContainer,
                  {
                    marginHorizontal: Styles.Content.marginHorizontal
                  }
                ]}
                textStyle={Styles.WarehouseErrorContent}
                onPress={async () => {
                  let _DRAFT_ITEMS = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.FRAGMENT_DRAFT),
                      _FINAL_SEED = {
                        features: props.newFragment.features
                      };

                  if (_DRAFT_ITEMS !== false){
                    const _PARSED_DRAFT_ITEMS = JSON.parse(_DRAFT_ITEMS),
                          _FOUNDED_DRAFT_INDEX = _PARSED_DRAFT_ITEMS.findIndex((item, i) => {
                            return (item.product._id === props.newFragment.product._id);
                          });

                    if (_FOUNDED_DRAFT_INDEX > -1){
                      _PARSED_DRAFT_ITEMS[_FOUNDED_DRAFT_INDEX] = {
                        ..._PARSED_DRAFT_ITEMS[_FOUNDED_DRAFT_INDEX],
                        ..._FINAL_SEED
                      };
                    }else{
                      _PARSED_DRAFT_ITEMS.push(_FINAL_SEED);
                    }

                    _DRAFT_ITEMS = _PARSED_DRAFT_ITEMS;
                  }else{
                    _PARSED_DRAFT_ITEMS = [_FINAL_SEED];
                  }

                  const _SERIALIZED_DATA = JSON.stringify(_DRAFT_ITEMS),
                        _DID_VERIFIED_DRAFT_ITEM = await Functions._storeDataWithKey(GLOBAL.STORAGE.FRAGMENT_DRAFT, _SERIALIZED_DATA);

                  if (_DID_VERIFIED_DRAFT_ITEM !== false){
                    await Preparation._prepareFragmentToAppend(props);
                  }
                }} />
            );
          }else{
            _APPEND_FRAGMENT_BUTTON = (
              <Input
                type={__CONSTANTS.content.submitButton.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
                value={__CONSTANTS.content.submitButton.state.normal.title[_LANGUAGE]}
                gradient={Global.colors.pair.ongerine}
                style={{
                  marginHorizontal: Styles.Content.marginHorizontal
                }}
                onPress={async () => {
                  let _DRAFT_ITEMS = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.FRAGMENT_DRAFT),
                      _FINAL_SEED = {
                        features: props.newFragment.features
                      };

                  if (_DRAFT_ITEMS !== false){
                    const _PARSED_DRAFT_ITEMS = JSON.parse(_DRAFT_ITEMS),
                          _FOUNDED_DRAFT_INDEX = _PARSED_DRAFT_ITEMS.findIndex((item, i) => {
                            return (item.product._id === props.newFragment.product._id);
                          });

                    if (_FOUNDED_DRAFT_INDEX > -1){
                      _PARSED_DRAFT_ITEMS[_FOUNDED_DRAFT_INDEX] = {
                        ..._PARSED_DRAFT_ITEMS[_FOUNDED_DRAFT_INDEX],
                        ..._FINAL_SEED
                      };
                    }else{
                      _PARSED_DRAFT_ITEMS.push(_FINAL_SEED);
                    }

                    _DRAFT_ITEMS = _PARSED_DRAFT_ITEMS;
                  }else{
                    _PARSED_DRAFT_ITEMS = [_FINAL_SEED];
                  }

                  const _SERIALIZED_DATA = JSON.stringify(_DRAFT_ITEMS),
                        _DID_VERIFIED_DRAFT_ITEM = await Functions._storeDataWithKey(GLOBAL.STORAGE.FRAGMENT_DRAFT, _SERIALIZED_DATA);

                  if (_DID_VERIFIED_DRAFT_ITEM !== false){
                    await Preparation._prepareFragmentToAppend(props);
                  }
                }}
                forcedDisable={_VALIDATED} />
            );
          }
        }

        _FEATURES_CONTENT = (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={Styles.ScrollableListContainer}>
              <FlatList
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.carousel.state.normal.title.en)}
                data={props.newFragment.features}
                contentContainerStyle={Styles.MajorContainer}
                style={[
                  Styles.DetailContainer,
                  _CUSTOM_STYLE
                ]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                  var _ITEM_GRADIENT = Global.colors.pair.tilan,
                      _CUSTOM_ROW_STYLE = {},
                      _FINAL_UNIT_COMPLEX = Preparation._prepareUnitAsASingleString(item.unit, _LANGUAGE),
                      _MINIMUM_DETACHABLE_ORDER_QUANTITY_CONTENT, _MAXIMUM_DETACHABLE_ORDER_QUANTITY_CONTENT, _DETACHABLE_PRICE;

                  _FEATURE_DELETE_ACTION = () => props.setFeatures(props.newFragment.features.filter((checkingItem, j) => {
                    return ((checkingItem.unit._id != item.unit._id) && (checkingItem.warehouse._id != item.warehouse._id));
                  }));

                  if (typeof item.primary != 'undefined'){
                    if (item.primary === true){
                      _ITEM_GRADIENT = Global.colors.pair.aqrulean;
                    }
                  }

                  if (index < (props.newFragment.features.length - 1)){
                    _CUSTOM_ROW_STYLE.marginBottom = Styles.Content.marginVertical;
                  }

                  if (typeof item.sales_structure.detachable != 'undefined'){
                    _MINIMUM_DETACHABLE_ORDER_QUANTITY_CONTENT = (
                      <View
                        style={[
                          Styles.DetailItemMasterSubInfoContent,
                          {
                            marginBottom: Styles.Content.marginVertical / 2
                          }
                        ]}>
                          <Icon
                            name={__CONSTANTS.content.carousel.state.normal.content.fourthFeature.icon.name}
                            color={Global.colors.single.romance} />

                          <Text
                            style={Styles.BriefDetailRowText}>
                              {Functions._convertNumberToHumanReadableFormat(item.sales_structure.detachable.minimum_order_quantity)}
                              {` ${Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.content.fourthFeature.title[_LANGUAGE])}`}
                          </Text>
                      </View>
                    );

                    _MAXIMUM_DETACHABLE_ORDER_QUANTITY_CONTENT = (
                      <View
                        style={[
                          Styles.DetailItemMasterSubInfoContent,
                          {
                            marginBottom: Styles.Content.marginVertical / 2
                          }
                        ]}>
                          <Icon
                            name={__CONSTANTS.content.carousel.state.normal.content.firstFeature.icon.name}
                            color={Global.colors.single.romance} />

                          <Text
                            style={Styles.BriefDetailRowText}>
                              {((typeof item.sales_structure.detachable.maximum_order_quantity != 'undefined')? `${Functions._convertNumberToHumanReadableFormat(item.sales_structure.detachable.maximum_order_quantity)} `: `${Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.content.fifthFeature.extraTitle[_LANGUAGE])} `)}
                              {` ${Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.content.fifthFeature.title[_LANGUAGE])}`}
                          </Text>
                      </View>
                    );

                    _DETACHABLE_PRICE = <View
                      style={[
                        Styles.DetailItemMasterSubInfoContent,
                        {
                          marginBottom: Styles.Content.marginVertical / 2
                        }
                      ]}>
                        <Icon
                          name={__CONSTANTS.content.carousel.state.normal.content.seventhFeature.icon.name}
                          color={Global.colors.single.romance} />

                        {
                          item.sales_structure.detachable.price.map((singlePrice, i, totalPrices) => {
                            return (
                              <Text
                                style={Styles.BriefDetailRowText}>
                                  {Functions._convertDigitsToMoneyFormat(singlePrice.value, 0)}
                                  {` ${Functions._getAppropriateCurrencyBaseOnLocale(singlePrice.currency, _LANGUAGE)}`}
                                  {((i < (totalPrices.length - 1))? __CONSTANTS.content.carousel.state.normal.content.seventhFeature.delimiter[_LANGUAGE]: '')}
                                  {` (${__CONSTANTS.content.carousel.state.normal.content.seventhFeature.title[_LANGUAGE]})`}
                              </Text>
                            );
                          })
                        }
                    </View>;
                  }

                  return (
                    <Input
                      type={__CONSTANTS.content.carousel.type}
                      style={[
                        Styles.UnitsFeatureDetailItemContainer,
                        Styles.LTR_ContentAlignment,
                        _CUSTOM_ROW_STYLE
                      ]}
                      gradient={_ITEM_GRADIENT}
                      onLongPress={_FEATURE_DELETE_ACTION}>
                        <View
                          style={Styles.DetailItemMasterInfoContent}>
                            <View
                              style={Styles.BriefDetailTitleContainer}>
                              <Text
                                style={Styles.BriefDetailTitle}>
                                  {_FINAL_UNIT_COMPLEX.title}
                              </Text>
                              <Text
                                style={Styles.BriefDetailSubtitle}>
                                  {_FINAL_UNIT_COMPLEX.subtitle}
                              </Text>
                            </View>
                        </View>

                        <View
                          style={Styles.DetailItemMasterInfoContent}>
                            <View
                              style={Styles.BriefDetailTitleContainer}>
                              <Text
                                style={Styles.BriefDetailTitle}>
                                  {item.warehouse.name}
                              </Text>
                            </View>
                        </View>

                        <View
                          style={[
                            Styles.DetailItemMasterSubInfoContent,
                            {
                              marginBottom: Styles.Content.marginVertical / 2
                            }
                          ]}>
                            <Icon
                              name={__CONSTANTS.content.carousel.state.normal.content.firstFeature.icon.name}
                              color={Global.colors.single.romance} />

                            <Text
                              style={Styles.BriefDetailRowText}>
                                {Functions._convertNumberToHumanReadableFormat(item.sales_structure.regular.minimum_order_quantity)}
                                {` ${Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.content.firstFeature.title[_LANGUAGE])}`}
                            </Text>
                        </View>

                        <View
                          style={[
                            Styles.DetailItemMasterSubInfoContent,
                            {
                              marginBottom: Styles.Content.marginVertical / 2
                            }
                          ]}>
                            <Icon
                              name={__CONSTANTS.content.carousel.state.normal.content.firstFeature.icon.name}
                              color={Global.colors.single.romance} />

                            <Text
                              style={Styles.BriefDetailRowText}>
                                {((typeof item.sales_structure.regular.maximum_order_quantity != 'undefined')? `${Functions._convertNumberToHumanReadableFormat(item.sales_structure.regular.maximum_order_quantity)} `: `${Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.content.secondFeature.extraTitle[_LANGUAGE])} `)}
                                {` ${Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.content.secondFeature.title[_LANGUAGE])}`}
                            </Text>
                        </View>

                        <View
                          style={[
                            Styles.DetailItemMasterSubInfoContent,
                            {
                              marginBottom: Styles.Content.marginVertical / 2
                            }
                          ]}>
                            <Icon
                              name={__CONSTANTS.content.carousel.state.normal.content.thirdFeature.icon.name}
                              color={Global.colors.single.romance} />

                            <Text
                              style={Styles.BriefDetailRowText}>
                                {Functions._convertNumberToHumanReadableFormat(item.quantity)} {Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.content.thirdFeature.title[_LANGUAGE])}
                            </Text>
                        </View>

                        {_MINIMUM_DETACHABLE_ORDER_QUANTITY_CONTENT}
                        {_MAXIMUM_DETACHABLE_ORDER_QUANTITY_CONTENT}
                        {_DETACHABLE_PRICE}

                        <View
                          style={[
                            Styles.DetailItemMasterSubInfoContent,
                            {
                              marginBottom: Styles.Content.marginVertical / 2
                            }
                          ]}>
                            <Icon
                              name={__CONSTANTS.content.carousel.state.normal.content.eigthFeature.icon.name}
                              color={Global.colors.single.romance} />

                            {
                              item.sales_structure.regular.price.map((singlePrice, i, totalPrices) => {
                                return (
                                  <Text
                                    style={Styles.BriefDetailRowText}>
                                      {Functions._convertDigitsToMoneyFormat(singlePrice.value, 0)}
                                      {` ${Functions._getAppropriateCurrencyBaseOnLocale(singlePrice.currency, _LANGUAGE)}`}
                                      {((i < (totalPrices.length - 1))? __CONSTANTS.content.carousel.state.normal.content.eigthFeature.delimiter[_LANGUAGE]: '')}
                                      {` (${__CONSTANTS.content.carousel.state.normal.content.eigthFeature.title[_LANGUAGE]})`}
                                  </Text>
                                );
                              })
                            }
                        </View>

                        <View
                          style={[
                            Styles.DetailItemMasterSubInfoContent,
                            {
                              marginBottom: Styles.Content.marginVertical / 2
                            }
                          ]}>
                            <Icon
                              name={__CONSTANTS.content.carousel.state.normal.content.ninthFeature.icon.name}
                              color={Global.colors.single.romance} />

                            <Text
                              style={Styles.BriefDetailRowText}>
                                {Functions._getAppropriateTaxonomyBaseOnLocale(item.shipping_method.value, _LANGUAGE)} {` (${Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.content.ninthFeature.title[_LANGUAGE])})`}
                            </Text>
                        </View>
                    </Input>
                  );
                }}/>

              <Input
                type={__CONSTANTS.content.modalHandlerButton.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.modalHandlerButton.state.normal.title.en)}
                value={__CONSTANTS.content.modalHandlerButton.state.normal.title[_LANGUAGE]}
                gradient={Global.colors.pair.ongerine}
                style={{
                  marginHorizontal: Styles.Content.marginHorizontal,
                  marginBottom: Styles.Content.marginVertical
                }}
                onPress={() => {
                  Keyboard.dismiss();
                  props.setFeaturesModalVisibility(true);
                }} />

              {_APPEND_FRAGMENT_BUTTON}
          </ScrollView>
        );
      }else{
        _FEATURES_CONTENT = (
          <View
            style={[
              Styles.Content,
              Styles.EmptyContent
            ]}>
              <Link
                containerStyle={Styles.EmptyContentLink}
                value={__CONSTANTS.content.carousel.state.null.title[_LANGUAGE]} />
          </View>
        );
      }

      return (
        <Container
          title={Functions._convertKeywordToToken(_PRODUCT_TITLE)}
          subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle[_LANGUAGE])}
          rightIcon={__CONSTANTS.pilot.rightIcon}
          onRightIconPress={() => {
            Keyboard.dismiss();
            props.setFeaturesModalVisibility(true);
          }}
          {...props}>
            {_FEATURES_CONTENT}

            <ProductFeaturesModal
              visibility={props.newFragment.featuresModalVisibility}
              onBlur={() => props.setFeaturesModalVisibility(false)}
              onProgressSuccess={(response) => {
                const _DOES_RESPONSE_UNIT_EXIST = props.newFragment.features.findIndex((feature) => {
                  return (feature.unit._id === response.unit._id);
                });

                if (_DOES_RESPONSE_UNIT_EXIST > -1){
                  const _DOES_RESPONSE_WAREHOUSE_EXIST = props.newFragment.features.findIndex((feature) => {
                    return ((feature.unit._id === response.unit._id) && (feature.warehouse._id === response.warehouse._id));
                  });

                  if (_DOES_RESPONSE_WAREHOUSE_EXIST === -1){
                    props.appendFeature(response);
                  }
                }else{
                  props.appendFeature({
                    ...response,
                    primary: true
                  });
                }
              }}
              {..._PRODUCT_FEATURES_OTHER_PROPS} />
        </Container>
      );
    }else{
      return (
        <ActivityIndicator/>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewFragmentFeatures);
