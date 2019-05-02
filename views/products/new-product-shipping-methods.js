import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, I18nManager, Text, Image, Keyboard, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';
import Interactable from 'react-native-interactable';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Options, ProductUnitsDependedModal, ProductShippingMethodsModal } from '../../assets/layouts/index';
import { Input, InputGroup, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewProduct,
      Container = ViewsContainer.Products.NewProductContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewProduct;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_product_shipping_methods;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewProductShippingMethods extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this;

    if (Object.keys(props.newProduct.language).length === 0){
      const _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
            _LANGUAGE = _NATIVE_SETTINGS.language;

      await props.setLanguage(_LANGUAGE);
    }
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newProduct;

    var _FORM_FIELDS_VALIDITY = false;

    if (_PROPS.prices.length > 0){
      if (_PROPS.shippingPlans.every((shippingPlan) => ((Object.keys(shippingPlan.unit).length > 0) && (Object.keys(shippingPlan.shippingMethod).length > 0)))){
        _FORM_FIELDS_VALIDITY = true;
      }
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    if (Object.keys(props.newProduct.language).length > 0){
      var _SHIPPING_METHODS_CONTENT_, _APPEND_PRODUCT_BUTTON,
          _UNITS = [];

      const _LANGUAGE = Functions._convertTokenToKeyword(props.newProduct.language.key),
            _PRODUCT_TITLE = (props.newProduct.name != '')? props.newProduct.name: __CONSTANTS.pilot.title[_LANGUAGE],
            _VALIDATED = this._componentWillCheckValidation(props),
            _PRODUCT_UNIT_DEPENDED_OTHER_PROPS = {
              language: props.newProduct.language
            },
            _PRODUCT_SHIPPING_METHODS_OTHER_PROPS = {
              language: props.newProduct.language
            };

      if (props.newProduct.shippingPlans.length > 0){
        if (props.newProduct.appendProductLoading){
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
          if (!props.newProduct.connected.status){
            _APPEND_PRODUCT_BUTTON = (
              <Input
                type={__CONSTANTS.content.submitButton.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
                value={props.newProduct.connected.content}
                style={[
                  Styles.ErrorContainer,
                  {
                    marginHorizontal: Styles.Content.marginHorizontal
                  }
                ]}
                textStyle={Styles.WarehouseErrorContent}
                onPress={async () => await Preparation._prepareProductToAppend(props)} />
            );
          }else{
            _APPEND_PRODUCT_BUTTON = (
              <Input
                type={__CONSTANTS.content.submitButton.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
                value={__CONSTANTS.content.submitButton.state.normal.title[_LANGUAGE]}
                gradient={Global.colors.pair.ongerine}
                style={{
                  marginHorizontal: Styles.Content.marginHorizontal
                }}
                onPress={async () => await Preparation._prepareProductToAppend(props)}
                forcedDisable={_VALIDATED} />
            );
          }
        }

        _SHIPPING_METHODS_CONTENT = (
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={Styles.ScrollableListContainer}
            name={Functions._convertTokenToKeyword(__CONSTANTS.content.list.title.en)}>
              {
                props.newProduct.shippingPlans.map((shippingPlanItem, i, totalShippingPlans) => {
                  var _CUSTOM_STYLE = {
                        marginHorizontal: Styles.Content.marginHorizontal
                      },
                      _SHIPPING_METHOD_DELETE_ACTION = () => props.setProductShippingPlans(props.newProduct.shippingPlans.filter((checkingItem, j) => {
                        return (checkingItem._id != shippingPlanItem._id);
                      })),
                      SHIPPING_METHOD_OPTION_CUSTOM_CONTAINER = {
                        height: Styles.ShippingMethodsContainer.height
                      };

                  if (i < totalShippingPlans.length){
                    _CUSTOM_STYLE.marginBottom = Styles.Content.marginVertical;
                  }

                  const _SHIPPING_PLAN_UNIT_FEATURE = (Object.keys(shippingPlanItem.unit).length > 0)? shippingPlanItem.unit: {},
                        _SHIPPING_PLAN_UNIT = (Object.keys(_SHIPPING_PLAN_UNIT_FEATURE).length > 0)? ((Object.keys(_SHIPPING_PLAN_UNIT_FEATURE.unit).length > 0)? Functions._getAppropriateTaxonomyBaseOnLocale(_SHIPPING_PLAN_UNIT_FEATURE.unit.key, _LANGUAGE): ''): '',
                        _SHIPPING_PLAN_METHOD = (Object.keys(shippingPlanItem.shippingMethod).length > 0)? Functions._getAppropriateTaxonomyBaseOnLocale(shippingPlanItem.shippingMethod.key, _LANGUAGE): '';

                  SHIPPING_METHOD_OPTION_CUSTOM_CONTAINER.right = Styles.Content.marginHorizontal;

                  return (
                    <Options
                      style={SHIPPING_METHOD_OPTION_CUSTOM_CONTAINER}
                      onDeletePress={_SHIPPING_METHOD_DELETE_ACTION}
                      animatedValueX={shippingPlanItem.animation}
                      {...__CONSTANTS.content.list.state.normal.options}>
                        <InputGroup
                          style={_CUSTOM_STYLE}
                          name={Functions._convertTokenToKeyword(__CONSTANTS.content.list.state.normal.content.firstInputGroup.title.en)}>
                            <Input
                              type={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.firstInput.type}
                              link={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.firstInput.link[_LANGUAGE]}
                              name={Functions._convertTokenToKeyword(__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.firstInput.title.en)}
                              placeholder={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.firstInput.title[_LANGUAGE]}
                              value={_SHIPPING_PLAN_UNIT}
                              onPress={() => {
                                Keyboard.dismiss();
                                props.setOnFetchingModeShippingPlan(shippingPlanItem);
                                props.setProductUnitDependedModalVisibility(true);
                              }}
                              disable={true} />

                            <Input
                              type={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.secondInput.type}
                              link={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.secondInput.link[_LANGUAGE]}
                              name={Functions._convertTokenToKeyword(__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.secondInput.title.en)}
                              placeholder={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.secondInput.title[_LANGUAGE]}
                              value={_SHIPPING_PLAN_METHOD}
                              onPress={() => {
                                Keyboard.dismiss();
                                props.setOnFetchingModeShippingPlan(shippingPlanItem);
                                props.setProductShippingMethodsModalVisibility(true);
                              }}
                              disable={true} />
                        </InputGroup>
                    </Options>
                  );
                })
              }

              <Input
                type={__CONSTANTS.content.appendHandlerButton.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.appendHandlerButton.state.normal.title.en)}
                value={__CONSTANTS.content.appendHandlerButton.state.normal.title[_LANGUAGE]}
                gradient={Global.colors.pair.ongerine}
                style={{
                  marginHorizontal: Styles.Content.marginHorizontal,
                  marginBottom: Styles.Content.marginVertical
                }}
                onPress={() => props.appendProductShippingPlan({
                  _id: Functions._generateNewBSONObjectID(),
                  unit: {},
                  shippingMethod: {},
                  animation: new Animated.Value(0)
                })} />

              {_APPEND_PRODUCT_BUTTON}
          </ScrollView>
        );
      }else{
        _SHIPPING_METHODS_CONTENT = (
          <View
            style={[
              Styles.Content,
              Styles.EmptyContent
            ]}>
              <Link
                containerStyle={Styles.EmptyContentLink}
                style={Styles.EmptyContentLinkContext}
                value={__CONSTANTS.content.list.state.null.title[_LANGUAGE]} />
          </View>
        );
      }

      if (props.newProduct.features.length > 0){
        _UNITS = props.newProduct.features.filter((featureItem, i) => {
          const _FEATURE_KEY = Functions._convertTokenToKeyword(featureItem.feature.key);

          return (_FEATURE_KEY == 'unit');
        });
      }

      return (
        <Container
          title={Functions._convertKeywordToToken(_PRODUCT_TITLE)}
          subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle[_LANGUAGE])}
          rightIcon={__CONSTANTS.pilot.rightIcon}
          onRightIconPress={() => props.appendProductShippingPlan({
            _id: Functions._generateNewBSONObjectID(),
            unit: {},
            shippingMethod: {},
            animation: new Animated.Value(0)
          })}
          {...props}>
            {_SHIPPING_METHODS_CONTENT}

            <ProductUnitsDependedModal
              data={_UNITS}
              visibility={props.newProduct.productUnitDependedModalVisibility}
              onBlur={() => props.setProductUnitDependedModalVisibility(false)}
              onProgressSuccess={(response) => props.setProductShippingPlans(props.newProduct.shippingPlans.map((shippingPlanItem, i) => {
                const _ON_FETCHING_MODE_SHIPPING_METHOD = props.newProduct.onFetchingModeShippingPlan;

                if (shippingPlanItem._id === _ON_FETCHING_MODE_SHIPPING_METHOD._id){
                  const _TARGET_SHIPPING_PLAN_NODE = {
                    ...shippingPlanItem,
                    unit: response
                  };

                  return _TARGET_SHIPPING_PLAN_NODE;
                }else{
                  return shippingPlanItem;
                }
              }))}
              {..._PRODUCT_UNIT_DEPENDED_OTHER_PROPS} />

            <ProductShippingMethodsModal
              visibility={props.newProduct.shippingMethodsModalVisibility}
              onBlur={() => props.setProductShippingMethodsModalVisibility(false)}
              onProgressSuccess={(response) => props.setProductShippingPlans(props.newProduct.shippingPlans.map((shippingPlanItem, i) => {
                const _ON_FETCHING_MODE_SHIPPING_METHOD = props.newProduct.onFetchingModeShippingPlan;

                if (shippingPlanItem._id === _ON_FETCHING_MODE_SHIPPING_METHOD._id){
                  const _TARGET_SHIPPING_PLAN_NODE = {
                    ...shippingPlanItem,
                    shippingMethod: response
                  };

                  return _TARGET_SHIPPING_PLAN_NODE;
                }else{
                  return shippingPlanItem;
                }
              }))}
              {..._PRODUCT_SHIPPING_METHODS_OTHER_PROPS} />
        </Container>
      );
    }else{
      return (
        <ActivityIndicator/>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductShippingMethods);
