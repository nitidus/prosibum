import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, I18nManager, Text, Image, Keyboard, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';
import Interactable from 'react-native-interactable';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Options, ProductUnitDependedModal } from '../../assets/layouts/index';
import { Input, InputGroup, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewProduct,
      Container = ViewsContainer.Products.NewProductContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewProduct;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_product_prices;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewProductPrices extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = _NATIVE_SETTINGS.language;

    this._language = _LANGUAGE;

    props.setProductFeatures([
      {
        "feature":{
          "_id":"5ca681d9d0a37b307e733050","created_at":"2019-04-04T22:14:48.903Z","modified_at":"2019-04-04T22:14:48.903Z","key":"UNIT"
        },
        "unit":{
          "_id":"5ca6848ed0a37b307e733054","created_at":"2019-04-04T22:26:21.819Z","modified_at":"2019-04-04T22:26:21.819Z","key":"BOX"
        },
        "minimumOrderQuantity":20,
        "maximumOrderQuantity":2000,
        "quantity":20000
      },
      {
        "feature":{
          "_id":"5ca681d9d0a37b307e733050","created_at":"2019-04-04T22:14:48.903Z","modified_at":"2019-04-04T22:14:48.903Z","key":"UNIT"
        },
        "unit":{
          "_id":"5ca684a9d0a37b307e733055","created_at":"2019-04-04T22:26:48.960Z","modified_at":"2019-04-04T22:26:48.960Z","key":"KILOGRAM"
        },
        "minimumOrderQuantity":30,
        "maximumOrderQuantity":3000,
        "quantity":30000
      }
    ])
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newProduct;

    var _FORM_FIELDS_VALIDITY = false;

    if (_PROPS.prices.length > 0){
      if (_PROPS.prices.every((price) => ((((price.name != '') && (price.value > 0))? ((Functions._checkIsAValidTextOnlyField(price.name, 7)) && (Functions._checkIsAValidCurrencyValueOnlyField(price.value.toString()))): false) &&
      (Object.keys(price.unit).length > 0)))){
        _FORM_FIELDS_VALIDITY = true;
      }
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    var _PRICES_CONTENT,
        _UNITS = [];

    const _LANGUAGE = (typeof this._language != 'undefined')? Functions._convertTokenToKeyword(this._language.key): 'en',
          _PRODUCT_TITLE = (props.newProduct.name != '')? props.newProduct.name: __CONSTANTS.pilot.title[_LANGUAGE],
          _VALIDATED = this._componentWillCheckValidation(props),
          _PRODUCT_UNIT_DEPENDED_OTHER_PROPS = {
            language: this._language
          };;

    if (props.newProduct.prices.length > 0){
      _PRICES_CONTENT = (
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={Styles.FeaturesContainer}
          name={Functions._convertTokenToKeyword(__CONSTANTS.content.list.title.en)}>
            {
              props.newProduct.prices.map((priceItem, i, totalPrices) => {
                var _CUSTOM_STYLE = {
                      marginHorizontal: Styles.Content.marginHorizontal
                    },
                    _PHOTO_DELETE_ACTION = () => props.setProductPrices(props.newProduct.prices.filter((checkingItem, j) => {
                      return (checkingItem._id != priceItem._id);
                    })),
                    PRICE_OPTION_CUSTOM_CONTAINER = {
                      height: Styles.PriceContainer.height
                    };

                if (i < totalPrices.length){
                  _CUSTOM_STYLE.marginBottom = Styles.Content.marginVertical;
                }

                const _PRICE_NAME = priceItem.name,
                      _PRICE_VALUE = (priceItem.value > 0)? priceItem.value.toString(): '',
                      _PRICE_UNIT = (Object.keys(priceItem.unit).length > 0)? Functions._convertKeywordToToken(priceItem.unit.key): '',
                      _PRICE_SUB_FIELD_ON_CHANGE_ACTION = (currentValue, changingKey) => props.setProductPrices(props.newProduct.prices.map((checkingPriceItem, j) => {
                        if (checkingPriceItem._id === priceItem._id){
                          var _TARGET_PRICE_CHANGED_NODE = checkingPriceItem;

                          if (typeof changingKey != 'undefined'){
                            if (changingKey != ''){
                              _TARGET_PRICE_CHANGED_NODE[changingKey] = (!isNaN(currentValue))? parseFloat(currentValue): currentValue;

                              return _TARGET_PRICE_CHANGED_NODE;
                            }else{
                              return checkingPriceItem;
                            }
                          }else{
                            return checkingPriceItem;
                          }
                        }else{
                          return checkingPriceItem;
                        }
                      }));

                PRICE_OPTION_CUSTOM_CONTAINER.right = Styles.Content.marginHorizontal;

                return (
                  <Options
                    style={PRICE_OPTION_CUSTOM_CONTAINER}
                    onDeletePress={_PHOTO_DELETE_ACTION}
                    animatedValueX={priceItem.animation}
                    {...__CONSTANTS.content.list.state.normal.options}>
                      <InputGroup
                        style={_CUSTOM_STYLE}
                        name={Functions._convertTokenToKeyword(__CONSTANTS.content.list.state.normal.content.firstInputGroup.title.en)}>
                          <Input
                            type={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.firstInput.type}
                            name={Functions._convertTokenToKeyword(__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.firstInput.title.en)}
                            placeholder={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.firstInput.title[_LANGUAGE]}
                            value={_PRICE_NAME}
                            onChangeText={(currentValue) => _PRICE_SUB_FIELD_ON_CHANGE_ACTION(currentValue, 'name')} />

                          <Input
                            type={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.secondInput.type}
                            name={Functions._convertTokenToKeyword(__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.secondInput.title.en)}
                            placeholder={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.secondInput.title[_LANGUAGE]}
                            value={_PRICE_VALUE}
                            onChangeText={(currentValue) => _PRICE_SUB_FIELD_ON_CHANGE_ACTION(currentValue, 'value')} />

                          <Input
                            type={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.thirdInput.type}
                            link={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.thirdInput.link[_LANGUAGE]}
                            name={Functions._convertTokenToKeyword(__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.thirdInput.title.en)}
                            placeholder={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.thirdInput.title[_LANGUAGE]}
                            value={_PRICE_UNIT}
                            onPress={() => {
                              Keyboard.dismiss();
                              props.setOnFetchingModePrice(priceItem);
                              props.setProductUnitDependedModalVisibility(true);
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
                onPress={() => props.appendProductPrice({
                  _id: Functions._generateNewBSONObjectID(),
                  name: '',
                  value: 0,
                  unit: {},
                  animation: new Animated.Value(0)
                })} />

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

                  navigation.navigate('NewProductShippingMethods');
                }}
                forcedDisable={_VALIDATED} />
        </ScrollView>
      );
    }else{
      _PRICES_CONTENT = (
        <View
          style={[
            Styles.Content,
            Styles.EmptyContent
          ]}>
            <Link
              containerStyle={Styles.EmptyContentLink}
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
        onRightIconPress={() => props.appendProductPrice({
          _id: Functions._generateNewBSONObjectID(),
          name: '',
          value: 0,
          unit: {},
          animation: new Animated.Value(0)
        })}
        {...props}>
          {_PRICES_CONTENT}

          <ProductUnitDependedModal
            data={_UNITS}
            visibility={props.newProduct.productUnitDependedModalVisibility}
            onBlur={() => props.setProductUnitDependedModalVisibility(false)}
            onProgressSuccess={(response) => props.setProductPrices(props.newProduct.prices.map((priceItem, i) => {
              const _ON_FETCHING_MODE_PHOTO = props.newProduct.onFetchingModePrice;

              if (priceItem._id === _ON_FETCHING_MODE_PHOTO._id){
                const _TARGET_PRICE_NODE = {
                  ...priceItem,
                  unit: response.unit
                };

                return _TARGET_PRICE_NODE;
              }else{
                return priceItem;
              }
            }))}
            {..._PRODUCT_UNIT_DEPENDED_OTHER_PROPS} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductPrices);
