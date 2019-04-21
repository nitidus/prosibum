import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, I18nManager, Text, Image, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';
import Interactable from 'react-native-interactable';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Options, ProductFeaturesModal } from '../../assets/layouts/index';
import { Input, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewProduct,
      Container = ViewsContainer.Products.NewProductContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewProduct;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_product_features;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewProductFeatures extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = _NATIVE_SETTINGS.language;

    this._language = _LANGUAGE;
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newProduct;

    var _FORM_FIELDS_VALIDITY = false;

    if ((_PROPS.features.length > 0)){
      _FORM_FIELDS_VALIDITY = true;
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    var _FEATURES_CONTENT,
        _UNIT_FEATURES = [],
        _FEATURES_ANIMATED_VALUES = [];

    const _LANGUAGE = (typeof this._language != 'undefined')? Functions._convertTokenToKeyword(this._language.key): 'en',
          _PRODUCT_TITLE = (props.newProduct.name != '')? props.newProduct.name: __CONSTANTS.pilot.title[_LANGUAGE],
          _VALIDATED = this._componentWillCheckValidation(props),
          _PRODUCT_FEATURES_OTHER_PROPS = {
            language: this._language
          };

    if (props.newProduct.features.length > 0){
      _FEATURES_CONTENT = (
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={Styles.FeaturesContainer}>
            {
              props.newProduct.features.map((featureItem, i, totalFeatures) => {
                const _FEATURE_NAME = Functions._convertTokenToKeyword(featureItem.feature.key);

                var _CUSTOM_STYLE = {},
                    _FEATURE_DELETE_ACTION = () => props.setProductFeatures(props.newProduct.features.filter((checkingItem, j) => {
                      return (checkingItem.feature._id != featureItem.feature._id);
                    }));

                if (i < totalFeatures.length){
                  _CUSTOM_STYLE.marginBottom = Styles.Content.marginVertical;
                }

                switch (_FEATURE_NAME) {
                  case 'unit':
                  const _SELECTED_FEATURE_INDEX = 0;

                    if (_UNIT_FEATURES.length > 0){
                      _UNIT_FEATURES.push(featureItem);
                    }else{
                      _UNIT_FEATURES.push(featureItem);

                      return (
                        <Carousel
                          name={Functions._convertTokenToKeyword(__CONSTANTS.content.carousel.state.normal.title.en)}
                          data={_UNIT_FEATURES}
                          firstItem={_SELECTED_FEATURE_INDEX}
                          itemWidth={_Screen.width - (Styles.Content.marginHorizontal * 2)}
                          style={[
                            Styles.DetailContainer,
                            _CUSTOM_STYLE
                          ]}
                          onLayout={({ item, index }) => {
                            var _ITEM_GRADIENT = Global.colors.pair.tilan;

                            _FEATURE_DELETE_ACTION = () => props.setProductFeatures(props.newProduct.features.filter((checkingItem, j) => {
                              if (typeof checkingItem.unit != 'undefined') {
                                return (checkingItem.unit._id !== item.unit._id);
                              }else{
                                return true;
                              }
                            }));

                            return (
                              <Input
                                type={__CONSTANTS.content.carousel.type}
                                style={[
                                  Styles.UnitsFeatureDetailItemContainer,
                                  Styles.LTR_ContentAlignment
                                ]}
                                gradient={_ITEM_GRADIENT}
                                onLongPress={_FEATURE_DELETE_ACTION}>
                                  <View
                                    style={Styles.DetailItemMasterInfoContent}>
                                      <View
                                        style={Styles.BriefDetailTitleContainer}>
                                        <Text
                                          style={Styles.BriefDetailTitle}>
                                            {Functions._convertKeywordToToken(item.unit.key)}
                                        </Text>
                                        <Text
                                          style={Styles.BriefDetailTitleSuffix}>
                                            {Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.content.title.suffix[_LANGUAGE])}
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
                                          {Functions._convertNumberToHumanReadableFormat(item.minimumOrderQuantity)} {Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.content.firstFeature.title[_LANGUAGE])}
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
                                          {Functions._convertNumberToHumanReadableFormat(item.maximumOrderQuantity)} {Functions._convertKeywordToToken(__CONSTANTS.content.carousel.state.normal.content.secondFeature.title[_LANGUAGE])}
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
                          }} />
                      );
                    }
                    break;

                  case 'description':
                    var _COUNTED_LINE_OF_DESCRIPTION = Functions._countNumberOfOccurrencesStringInString(featureItem.description, '\n'),
                        DESCRIPTION_FEATURE_OPTION_CUSTOM_CONTAINER = {
                          height: (_COUNTED_LINE_OF_DESCRIPTION > 1)? (_COUNTED_LINE_OF_DESCRIPTION * (Styles.DescriptionFeature.height / 2)): Styles.DescriptionFeature.height
                        };

                    if (_COUNTED_LINE_OF_DESCRIPTION > 5){
                      if (Platform.OS !== 'ios'){
                        if (_Screen.width >= 1000 || _Screen.height >= 1000){
                          _COUNTED_LINE_OF_DESCRIPTION = _COUNTED_LINE_OF_DESCRIPTION;
                        }else{
                          _COUNTED_LINE_OF_DESCRIPTION -= (_COUNTED_LINE_OF_DESCRIPTION / 5);
                        }
                      }else{
                        _COUNTED_LINE_OF_DESCRIPTION -= (_COUNTED_LINE_OF_DESCRIPTION / 5);
                      }
                    }else{
                      if (Platform.OS !== 'ios'){
                        if (_Screen.width >= 1000 || _Screen.height >= 1000){
                          _COUNTED_LINE_OF_DESCRIPTION += (_COUNTED_LINE_OF_DESCRIPTION / 5);
                        }
                      }
                    }

                    DESCRIPTION_FEATURE_OPTION_CUSTOM_CONTAINER[((I18nManager.isRTL)? 'left': 'right')] = Styles.Content.marginHorizontal;

                    return (
                      <Options
                        style={DESCRIPTION_FEATURE_OPTION_CUSTOM_CONTAINER}
                        onDeletePress={_FEATURE_DELETE_ACTION}
                        {...__CONSTANTS.content.description.options}>
                          <Input
                            type={__CONSTANTS.content.description.type}
                            style={[
                              Styles.DescriptionFeature,
                              Styles.LTR_ContentAlignment,
                              {
                                ..._CUSTOM_STYLE,
                                height: (_COUNTED_LINE_OF_DESCRIPTION > 1)? (_COUNTED_LINE_OF_DESCRIPTION * (Styles.DescriptionFeature.height / 2)): Styles.DescriptionFeature.height
                              }
                            ]}
                            textStyle={Styles.DescriptionFeatureText}
                            value={featureItem.description}
                            onLongPress={_FEATURE_DELETE_ACTION}/>
                      </Options>
                    );
                    break;

                  case 'customized':
                    var CUSTOMIZED_FEATURE_OPTION_CUSTOM_CONTAINER = {
                      height: Styles.CustomizedFeatureDetailItemContainer.height
                    };

                    CUSTOMIZED_FEATURE_OPTION_CUSTOM_CONTAINER[((I18nManager.isRTL)? 'left': 'right')] = Styles.Content.marginHorizontal;

                    return (
                      <Options
                        style={CUSTOMIZED_FEATURE_OPTION_CUSTOM_CONTAINER}
                        onDeletePress={_FEATURE_DELETE_ACTION}
                        {...__CONSTANTS.content.customized.options}>
                          <Input
                            type={__CONSTANTS.content.customized.type}
                            style={[
                              Styles.CustomizedFeatureDetailItemContainer,
                              Styles.LTR_ContentAlignment,
                              _CUSTOM_STYLE
                            ]}
                            gradient={Global.colors.pair.aqrulean}
                            onLongPress={_FEATURE_DELETE_ACTION}>
                              <View
                                style={Styles.DetailItemMasterInfoContent}>
                                  <View
                                    style={Styles.BriefDetailTitleContainer}>
                                    <Text
                                      style={Styles.BriefDetailTitle}>
                                        {Functions._convertKeywordToToken(featureItem.featureName)}
                                    </Text>
                                    <Text
                                      style={Styles.BriefDetailTitleSuffix}>
                                        {Functions._convertKeywordToToken(__CONSTANTS.content.customized.title.suffix[_LANGUAGE])}
                                    </Text>
                                  </View>

                                  <Text
                                    style={Styles.BriefDetailSubtitle}>
                                      {Functions._convertKeywordToToken(featureItem.featureValue)}
                                  </Text>
                              </View>
                          </Input>
                      </Options>
                    );
                    break;
                }
              })
            }

            <Input
              type={__CONSTANTS.content.modalHandlerButton.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.modalHandlerButton.state.normal.title.en)}
              value={__CONSTANTS.content.modalHandlerButton.state.normal.title[_LANGUAGE]}
              gradient={Global.colors.pair.ongerine}
              style={{
                marginHorizontal: Styles.Content.marginHorizontal,
                marginBottom: Styles.Content.marginVertical
              }}
              onPress={() => props.setProductFeaturesModalVisibility(true)} />

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

                navigation.navigate('NewProductPhotos');
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
        onRightIconPress={() => props.setProductFeaturesModalVisibility(true)}
        {...props}>
          {_FEATURES_CONTENT}

          <ProductFeaturesModal
            visibility={props.newProduct.productFeaturesModalVisibility}
            onBlur={() => props.setProductFeaturesModalVisibility(false)}
            onProgressSuccess={(response) => props.appendProductFeature(response)}
            {..._PRODUCT_FEATURES_OTHER_PROPS} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductFeatures);
