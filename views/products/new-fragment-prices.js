import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, I18nManager, Text, Image, Keyboard, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';
import Interactable from 'react-native-interactable';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Options, ProductUnitsDependedModal } from '../../assets/layouts/index';
import { Input, InputGroup, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewFragment,
      Container = ViewsContainer.Products.NewFragmentContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewFragment;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_fragment_prices;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewFragmentPrices extends Component<{}> {
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

    if (_PROPS.prices.length > 0){
      if (_PROPS.prices.every((price) => ((((price.name != '') && (price.value > 0))? ((Functions._checkIsAValidTextOnlyField(price.name, 7)) && (Functions._checkIsAValidCurrencyValueOnlyField(price.value.toString()))): false) &&
      (Object.keys(price.feature).length > 0)))){
        _FORM_FIELDS_VALIDITY = true;
      }
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    if (Object.keys(props.newFragment.language).length > 0){
      var _PRICES_CONTENT;

      const _LANGUAGE = Functions._convertTokenToKeyword(props.newFragment.language.key),
            _PRODUCT_TITLE = (props.newFragment.name != '')? props.newFragment.name: __CONSTANTS.pilot.title[_LANGUAGE],
            _VALIDATED = this._componentWillCheckValidation(props),
            _PRODUCT_UNIT_DEPENDED_OTHER_PROPS = {
              language: props.newFragment.language
            };

      if (props.newFragment.prices.length > 0){
        _PRICES_CONTENT = (
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={Styles.ScrollableListContainer}
            name={Functions._convertTokenToKeyword(__CONSTANTS.content.list.title.en)}>
              {
                props.newFragment.prices.map((priceItem, i, totalPrices) => {
                  var _CUSTOM_STYLE = {
                        marginHorizontal: Styles.Content.marginHorizontal
                      },
                      _PRICE_DELETE_ACTION = () => props.setPrices(props.newFragment.prices.filter((checkingItem, j) => {
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
                        _PRICE_UNIT = (Object.keys(priceItem.feature).length > 0)? `${Functions._getAppropriateTaxonomyBaseOnLocale(priceItem.feature.unit.key, _LANGUAGE)}${((I18nManager.isRTL)? '،': ',')} ${priceItem.feature.warehouse.name}`: '',
                        _PRICE_SUB_FIELD_ON_CHANGE_ACTION = (currentValue, changingKey) => props.setPrices(props.newFragment.prices.map((checkingPriceItem, j) => {
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
                      onDeletePress={_PRICE_DELETE_ACTION}
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
                                props.setUnitDependedModalVisibility(true);
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
                onPress={() => props.appendPrice({
                  _id: Functions._generateNewBSONObjectID(),
                  name: '',
                  value: 0,
                  feature: {},
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

                  navigation.navigate('NewFragmentShippingMethods');
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

      return (
        <Container
          title={Functions._convertKeywordToToken(_PRODUCT_TITLE)}
          subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle[_LANGUAGE])}
          rightIcon={__CONSTANTS.pilot.rightIcon}
          onRightIconPress={() => props.appendPrice({
            _id: Functions._generateNewBSONObjectID(),
            name: '',
            value: 0,
            feature: {},
            animation: new Animated.Value(0)
          })}
          {...props}>
            {_PRICES_CONTENT}

            <ProductUnitsDependedModal
              data={props.newFragment.features}
              visibility={props.newFragment.unitDependedModalVisibility}
              onBlur={() => props.setUnitDependedModalVisibility(false)}
              onProgressSuccess={(response) => props.setPrices(props.newFragment.prices.map((priceItem, i) => {
                const _ON_FETCHING_MODE_PRICE = props.newFragment.onFetchingModePrice;

                if (priceItem._id === _ON_FETCHING_MODE_PRICE._id){
                  const _TARGET_PRICE_NODE = {
                    ...priceItem,
                    feature: response
                  };

                  return _TARGET_PRICE_NODE;
                }else{
                  return priceItem;
                }
              }))}
              {..._PRODUCT_UNIT_DEPENDED_OTHER_PROPS} />
        </Container>
      );
    }else{
      return (
        <ActivityIndicator/>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewFragmentPrices);
