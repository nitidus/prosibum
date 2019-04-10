import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, Text, Image, Animated, Easing } from 'react-native';
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

  componentDidMount() {
    const { props } = this;
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newProduct;

    var _FORM_FIELDS_VALIDITY = false;

    if ((_PROPS.name != '') && (Object.keys(_PROPS.currentWarehouse).length > 0) && (Object.keys(_PROPS.category).length > 0)){
      _FORM_FIELDS_VALIDITY = true;
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    var _FEATURES_CONTENT,
        _UNIT_FEATURES = [],
        _PAN_RESPONDER = this._panResponder,
        _FEATURES_ANIMATED_VALUES = [];

    const _PRODUCT_TITLE = (props.newProduct.name != '')? props.newProduct.name: __CONSTANTS.pilot.title.en,
          _VALIDATED = this._componentWillCheckValidation(props);

    if (props.newProduct.features.length > 0){
      _FEATURES_CONTENT = <ScrollView
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
                _CUSTOM_STYLE.marginBottom = Styles.Content.marginHorizontal;
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
                                          {Functions._convertKeywordToToken(__CONSTANTS.contentcarousel.state.normal.content.title.suffix.en)}
                                      </Text>
                                    </View>
                                </View>
                                <View
                                  style={[
                                    Styles.DetailItemMasterSubInfoContent,
                                    {
                                      marginBottom: Styles.Content.marginHorizontal / 2
                                    }
                                  ]}>
                                    <Icon
                                      name={__CONSTANTS.contentcarousel.state.normal.content.firstFeature.icon.name}
                                      color={Global.colors.single.romance} />

                                    <Text
                                      style={Styles.BriefDetailRowText}>
                                        {Functions._convertNumberToHumanReadableFormat(item.minimumOrderQuantity)} {Functions._convertKeywordToToken(__CONSTANTS.contentcarousel.state.normal.content.firstFeature.title.en)}
                                    </Text>
                                </View>
                                <View
                                  style={[
                                    Styles.DetailItemMasterSubInfoContent,
                                    {
                                      marginBottom: Styles.Content.marginHorizontal / 2
                                    }
                                  ]}>
                                    <Icon
                                      name={__CONSTANTS.contentcarousel.state.normal.content.secondFeature.icon.name}
                                      color={Global.colors.single.romance} />

                                    <Text
                                      style={Styles.BriefDetailRowText}>
                                        {Functions._convertNumberToHumanReadableFormat(item.maximumOrderQuantity)} {Functions._convertKeywordToToken(__CONSTANTS.contentcarousel.state.normal.content.secondFeature.title.en)}
                                    </Text>
                                </View>
                                <View
                                  style={Styles.DetailItemMasterSubInfoContent}>
                                    <Icon
                                      name={__CONSTANTS.contentcarousel.state.normal.content.thirdFeature.icon.name}
                                      color={Global.colors.single.romance} />

                                    <Text
                                      style={Styles.BriefDetailRowText}>
                                        {Functions._convertNumberToHumanReadableFormat(item.quantity)} {Functions._convertKeywordToToken(__CONSTANTS.contentcarousel.state.normal.content.thirdFeature.title.en)}
                                    </Text>
                                </View>
                            </Input>
                          );
                        }} />
                    );
                  }
                  break;

                case 'description':
                  return (
                    <Options
                      style={{
                        right: Styles.Content.marginHorizontal,
                        height: (featureItem.description.length > 64)? 128: Styles.DescriptionFeature.height
                      }}
                      onDeletePress={_FEATURE_DELETE_ACTION}
                      {...__CONSTANTS.content.description.options}>
                        <Input
                          type={__CONSTANTS.content.description.type}
                          style={[
                            Styles.DescriptionFeature,
                            Styles.LTR_ContentAlignment,
                            {
                              ..._CUSTOM_STYLE,
                              height: (featureItem.description.length > 64)? 128: Styles.DescriptionFeature.height
                            }
                          ]}
                          textStyle={Styles.DescriptionFeatureText}
                          value={Functions._stripLongString(featureItem.description, ((featureItem.description.length > 64)? 128: 64))}
                          onLongPress={_FEATURE_DELETE_ACTION}/>
                    </Options>
                  );
                  break;

                case 'customized':
                  return (
                    <Options
                      style={{
                        right: Styles.Content.marginHorizontal,
                        height: Styles.CustomizedFeatureDetailItemContainer.height
                      }}
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
                                      {Functions._convertKeywordToToken(__CONSTANTS.content.customized.title.suffix.en)}
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
      </ScrollView>;
    }else{
      _FEATURES_CONTENT = (
        <View
          style={[
            Styles.Content,
            Styles.EmptyContent
          ]}>
            <Link
              containerStyle={Styles.EmptyContentLink}
              value={__CONSTANTS.content.carousel.state.null.title.en} />
        </View>
      );
    }

    return (
      <Container
        title={Functions._convertKeywordToToken(_PRODUCT_TITLE)}
        subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle.en)}
        rightIcon={__CONSTANTS.pilot.rightIcon}
        onRightIconPress={() => props.setProductFeaturesModalVisibility(true)}
        {...props}>
          {_FEATURES_CONTENT}

          <ProductFeaturesModal
            visibility={props.newProduct.productFeaturesModalVisibility}
            onBlur={() => props.setProductFeaturesModalVisibility(false)}
            onProgressSuccess={(response) => props.appendProductFeature(response)} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductFeatures);
