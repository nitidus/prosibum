import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, Text, Image, Keyboard, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';
import Interactable from 'react-native-interactable';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Options, CameraRollPickerModal } from '../../assets/layouts/index';
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

  componentDidMount() {
    const { props } = this;
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newProduct;

    var _FORM_FIELDS_VALIDITY = false;

    if ((_PROPS.photos.length > 0) && (Object.keys(_PROPS.primaryPhoto).length > 0)){
      if (_PROPS.photos.every((photo) => (Object.keys(photo.content).length > 0)))
      _FORM_FIELDS_VALIDITY = true;
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    var _PRICES_CONTENT;

    const _PRODUCT_TITLE = (props.newProduct.name != '')? props.newProduct.name: __CONSTANTS.pilot.title.en,
          _VALIDATED = this._componentWillCheckValidation(props);

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
                    }));

                if (i < totalPrices.length){
                  _CUSTOM_STYLE.marginBottom = Styles.Content.marginHorizontal;
                }

                const _PRICE_NAME = priceItem.name,
                      _PRICE_VALUE = (priceItem.value > 0)? priceItem.value.toString(): '',
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

                return (
                  <Options
                    style={{
                      right: Styles.Content.marginHorizontal,
                      height: Styles.PriceContainer.height
                    }}
                    onDeletePress={_PHOTO_DELETE_ACTION}
                    animatedValueX={priceItem.animation}
                    {...__CONSTANTS.content.list.state.normal.options}>
                      <InputGroup
                        style={_CUSTOM_STYLE}
                        name={Functions._convertTokenToKeyword(__CONSTANTS.content.list.state.normal.content.firstInputGroup.title.en)}>
                          <Input
                            type={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.firstInput.type}
                            name={Functions._convertTokenToKeyword(__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.firstInput.title.en)}
                            placeholder={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.firstInput.title.en}
                            value={_PRICE_NAME}
                            onChangeText={(currentValue) => _PRICE_SUB_FIELD_ON_CHANGE_ACTION(currentValue, 'name')} />

                          <Input
                            type={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.secondInput.type}
                            name={Functions._convertTokenToKeyword(__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.secondInput.title.en)}
                            placeholder={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.secondInput.title.en}
                            value={_PRICE_VALUE}
                            onChangeText={(currentValue) => _PRICE_SUB_FIELD_ON_CHANGE_ACTION(currentValue, 'value')} />

                          <Input
                            type={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.thirdInput.type}
                            link={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.thirdInput.link.en}
                            name={Functions._convertTokenToKeyword(__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.thirdInput.title.en)}
                            placeholder={__CONSTANTS.content.list.state.normal.content.firstInputGroup.context.thirdInput.title.en}
                            onPress={() => {
                              Keyboard.dismiss();
                              alert('ok')
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
                value={__CONSTANTS.content.appendHandlerButton.state.normal.title.en}
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
                value={__CONSTANTS.content.submitButton.state.normal.title.en}
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
              value={__CONSTANTS.content.list.state.null.title.en} />
        </View>
      );
    }

    return (
      <Container
        title={Functions._convertKeywordToToken(_PRODUCT_TITLE)}
        subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle.en)}
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

          <CameraRollPickerModal
            name={Functions._convertTokenToKeyword(__CONSTANTS.content.modalContainer.title.en)}
            visible={props.newProduct.productPhotoModalVisibility}
            onBlur={(status) => props.setProductPhotoModalVisibility(status)}
            onPress={(photo) => props.setProductPhotos(props.newProduct.photos.map((priceItem, i) => {
              const _ON_FETCHING_MODE_PHOTO = props.newProduct.onFetchingModePhoto;

              if (priceItem._id === _ON_FETCHING_MODE_PHOTO._id){
                const _TARGET_PHOTO_NODE = {
                  ...priceItem,
                  content: photo
                };


                if (Object.keys(props.newProduct.primaryPhoto).length === 0){
                  props.setProductPrimaryPhoto(_TARGET_PHOTO_NODE);
                }else{
                  if (props.newProduct.primaryPhoto._id === priceItem._id){
                    props.setProductPrimaryPhoto(_TARGET_PHOTO_NODE);
                  }
                }

                return _TARGET_PHOTO_NODE;
              }else{
                return priceItem;
              }
            }))}/>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductPrices);
