import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, Keyboard, I18nManager, Text, Image, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';
import Interactable from 'react-native-interactable';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Options, ProductFeaturesModal } from '../../assets/layouts/index';
import { Input, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewProduct,
      Container = ViewsContainer.Products.NewFragmentContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewFragment;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_fragment_features;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewFragmentFeatures extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this;

    if (Object.keys(props.newFragment.language).length === 0){
      const _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
            _LANGUAGE = _NATIVE_SETTINGS.language;

      await props.setLanguage(_LANGUAGE);
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
      var _FEATURES_CONTENT,
          _UNIT_FEATURES = [],
          _FEATURES_ANIMATED_VALUES = [];

      const _LANGUAGE = Functions._convertTokenToKeyword(props.newFragment.language.key),
            _PRODUCT_TITLE = (props.newFragment.name != '')? props.newFragment.name: __CONSTANTS.pilot.title[_LANGUAGE],
            _VALIDATED = this._componentWillCheckValidation(props),
            _PRODUCT_FEATURES_OTHER_PROPS = {
              language: props.newFragment.language,
              features: props.newFragment.features
            },
            _CUSTOM_STYLE = {
              marginBottom: Styles.Content.marginVertical
            };

      let _FIRST_CAROUSEL_OTHER_OPTIONS = {},
          _ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((props.newFragment.features.length > 1)? ((Platform.OS !== 'ios')? 4: 2): 2);

      if (Platform.OS !== 'ios'){
        _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';
        _FIRST_CAROUSEL_OTHER_OPTIONS.loop = true;
      }

      if (props.newFragment.features.length > 0){
        _FEATURES_CONTENT = (
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={Styles.ScrollableListContainer}>
              <Carousel
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.carousel.state.normal.title.en)}
                data={props.newFragment.features}
                firstItem={0}
                itemWidth={_Screen.width - (Styles.Content.marginHorizontal * _ITEM_WIDTH_COEFFICIENT)}
                style={[
                  Styles.DetailContainer,
                  _CUSTOM_STYLE
                ]}
                onLayout={({ item, index }) => {
                  var _ITEM_GRADIENT = Global.colors.pair.tilan;

                  _FEATURE_DELETE_ACTION = () => props.setFeatures(props.newFragment.features.filter((checkingItem, j) => {
                    return ((checkingItem.feature_id != item.feature_id) && (checkingItem.unit._id != item.unit._id) && (checkingItem.warehouse._id != item.warehouse._id));
                  }));

                  if (typeof item.primary != 'undefined'){
                    if (item.primary === true){
                      _ITEM_GRADIENT = Global.colors.pair.aqrulean;
                    }
                  }

                  return (
                    <Input
                      type={__CONSTANTS.content.carousel.type}
                      style={[
                        Styles.UnitsFeatureDetailItemContainer,
                        Styles.LTR_ContentAlignment,
                        {
                          height: Styles.UnitsFeatureDetailItemContainer.height + 50
                        }
                      ]}
                      gradient={_ITEM_GRADIENT}
                      onLongPress={_FEATURE_DELETE_ACTION}>
                        <View
                          style={Styles.DetailItemMasterInfoContent}>
                            <View
                              style={Styles.BriefDetailTitleContainer}>
                              <Text
                                style={Styles.BriefDetailTitle}>
                                  {Functions._getAppropriateTaxonomyBaseOnLocale(item.unit.key, _LANGUAGE, 'unit')}
                              </Text>
                              <Text
                                style={Styles.BriefDetailTitleSuffix}>
                                  {Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.content.title.suffix[_LANGUAGE])}
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
                              <Text
                                style={Styles.BriefDetailTitleSuffix}>
                                  {Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.secondContent.title.suffix[_LANGUAGE])}
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
                                {Functions._convertNumberToHumanReadableFormat(item.minimum_order_quantity)} {Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.content.firstFeature.title[_LANGUAGE])}
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
                              name={__CONSTANTS.content.carousel.state.normal.content.secondFeature.icon.name}
                              color={Global.colors.single.romance} />

                            <Text
                              style={Styles.BriefDetailRowText}>
                                {Functions._convertNumberToHumanReadableFormat(item.maximum_order_quantity)} {Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.content.secondFeature.title[_LANGUAGE])}
                            </Text>
                        </View>
                        <View
                          style={Styles.DetailItemMasterSubInfoContent}>
                            <Icon
                              name={__CONSTANTS.content.carousel.state.normal.content.thirdFeature.icon.name}
                              color={Global.colors.single.romance} />

                            <Text
                              style={Styles.BriefDetailRowText}>
                                {Functions._convertNumberToHumanReadableFormat(item.quantity)} {Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.content.thirdFeature.title[_LANGUAGE])}
                            </Text>
                        </View>
                    </Input>
                  );
                }}
                {..._FIRST_CAROUSEL_OTHER_OPTIONS} />

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

              <Input
                type={__CONSTANTS.content.submitButton.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
                value={__CONSTANTS.content.submitButton.state.normal.title[_LANGUAGE]}
                gradient={Global.colors.pair.ongerine}
                style={{
                  marginHorizontal: Styles.Content.marginHorizontal
                }}
                onPress={() => {
                  const { navigation } = props;

                  navigation.navigate('NewFragmentPrices');
                }}
                forcedDisable={_VALIDATED} />
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
