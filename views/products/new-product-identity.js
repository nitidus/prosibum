import React, { Component } from 'react';
import { View, Dimensions, Platform, Text, Image, Keyboard } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, WarehouseModal, ProductCategoriesModal } from '../../assets/layouts/index';
import { Input, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewProduct,
      Container = ViewsContainer.Products.NewProductContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewProduct;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_product_identity;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewProductIdentity extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = await _NATIVE_SETTINGS.language;

    props.setLanguage(_LANGUAGE);
    props.fetchAvailableWarehouses();
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newProduct;

    var _FORM_FIELDS_VALIDITY = false;

    if ((_PROPS.internalName != '') && (Object.keys(_PROPS.currentWarehouse).length > 0) && (Object.keys(_PROPS.category).length > 0)){
      if (_PROPS.internalName.length > 7){
        if (Object.keys(_PROPS.product).length > 0){
          const _FRAGMENT_INTERNAL_NAME_CONTAINS_PRODUCT_NAME_REGEX = new RegExp(`\.*${_PROPS.product.name}\.*`, 'gi');

          if (_PROPS.internalName.match(_FRAGMENT_INTERNAL_NAME_CONTAINS_PRODUCT_NAME_REGEX)){
            _FORM_FIELDS_VALIDITY = true;
          }
        }
      }
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    if (Object.keys(props.newProduct.language).length > 0){
      const _LANGUAGE = Functions._convertTokenToKeyword(props.newProduct.language.key),
            _WAREHOUSES_OTHER_PROPS = {
              language: props.newProduct.language
            },
            _PRODUCT_CATEGORIES_OTHER_PROPS = {
              language: props.newProduct.language
            };

      var _WAREHOUSE_CONTENT;

      if (props.newProduct.warehousesLoading){
        _WAREHOUSE_CONTENT = (
          <Input
            type={__CONSTANTS.content.firstCarousel.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstCarousel.state.loading.title.en)}
            gradient={Global.colors.pair.tilan}
            style={[
              Styles.WarehouseItemContainer,
              {
                marginHorizontal: Styles.Content.marginHorizontal,
                marginBottom: Styles.Content.marginVertical
              }
            ]}
            disable={true}>
              <ActivityIndicator/>
          </Input>
        );
      }else{
        if (!props.newProduct.connected.status){
          _WAREHOUSE_CONTENT = (
            <Input
              type={__CONSTANTS.content.firstCarousel.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstCarousel.state.disconected.title.en)}
              style={[
                Styles.WarehouseItemContainer,
                Styles.WarehouseErrorContainer,
                {
                  marginHorizontal: Styles.Content.marginHorizontal,
                  marginBottom: Styles.Content.marginVertical
                }
              ]}
              textStyle={Styles.WarehouseErrorContent}
              value={props.newProduct.connected.content}
              onPress={() => props.fetchAvailableWarehouses()}/>
          );
        }else{
          if (props.newProduct.warehouses.length > 0){
            let _FIRST_CAROUSEL_OTHER_OPTIONS = {},
                _ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((props.newProduct.warehouses.length > 1)? ((Platform.OS !== 'ios')? 4: 2): 2);

            const _SELECTED_WAREHOUSE_INDEX = props.newProduct.warehouses.findIndex((warehouse, i) => {
                    return warehouse._id === props.newProduct.currentWarehouse._id;
                  });

            if (Platform.OS !== 'ios'){
              _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';
              _FIRST_CAROUSEL_OTHER_OPTIONS.loop = true;
            }

            _WAREHOUSE_CONTENT = (
              <Carousel
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstCarousel.state.normal.title.en)}
                data={props.newProduct.warehouses}
                firstItem={_SELECTED_WAREHOUSE_INDEX}
                itemWidth={_Screen.width - (Styles.Content.marginHorizontal * _ITEM_WIDTH_COEFFICIENT)}
                style={{
                  marginBottom: Styles.Content.marginVertical,
                  direction: 'ltr'
                }}
                onLayout={({ item, index }) => {
                  var _ITEM_GRADIENT = Global.colors.pair.tilan;

                  if (props.newProduct.currentWarehouse._id === item._id){
                    _ITEM_GRADIENT = Global.colors.pair.analue;
                  }

                  return (
                    <Input
                      type={__CONSTANTS.content.firstCarousel.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstCarousel.state.normal.content.title.en)}
                      style={[
                        Styles.WarehouseItemContainer
                      ]}
                      gradient={_ITEM_GRADIENT}
                      disable={true}>
                        <View
                          style={[
                            Styles.DetailItemMasterInfoContent,
                            {
                              width: (_Screen.width - (Styles.Content.marginHorizontal * _ITEM_WIDTH_COEFFICIENT)) - (Styles.Content.marginHorizontal * 2)
                            }
                          ]}>
                            <Text
                              style={Styles.BriefDetailTitle}>
                                {Functions._convertKeywordToToken(item.name)}
                            </Text>
                            <Text
                              style={Styles.BriefDetailSubtitle}>
                                {item.products.count} {__CONSTANTS.content.firstCarousel.state.normal.content.suffix[_LANGUAGE]}{((item.products.count > 1) && (_LANGUAGE == 'en'))? 's': ''}
                            </Text>
                        </View>
                    </Input>
                  );
                }}
                onSnap={(selectedItemIndex) => props.setCurrentWarehouse(props.newProduct.warehouses[selectedItemIndex])}
                {..._FIRST_CAROUSEL_OTHER_OPTIONS}/>
            );
          }else{
            _WAREHOUSE_CONTENT = (
              <View
                style={{
                  marginBottom: Styles.Content.marginVertical
                }}>
                  <Link
                    containerStyle={Styles.EmptyContentLink}
                    value={__CONSTANTS.content.firstCarousel.state.null.title[_LANGUAGE]} />
              </View>
            );
          }
        }
      }

      const _PRODUCT_CATEGORY = (Object.keys(props.newProduct.category).length > 0)? props.newProduct.category.key: '',
            _VALIDATED = this._componentWillCheckValidation(props);

      return (
        <Container
          title={Functions._convertKeywordToToken(__CONSTANTS.pilot.title[_LANGUAGE])}
          subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle[_LANGUAGE])}
          {...props}>
            <Input
              type={__CONSTANTS.content.firstInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstInput.title.en)}
              placeholder={__CONSTANTS.content.firstInput.title[_LANGUAGE]}
              value={props.newProduct.internalName}
              style={[
                Styles.RegularItemContainer,
                {
                  marginTop: Styles.Content.marginVertical
                }
              ]}
              onChangeText={(currentValue) => props.setProductInternalName(currentValue)} />

            {_WAREHOUSE_CONTENT}

            <Input
              type={__CONSTANTS.content.secondInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.secondInput.title.en)}
              link={__CONSTANTS.content.secondInput.link[_LANGUAGE]}
              placeholder={__CONSTANTS.content.secondInput.title[_LANGUAGE]}
              value={_PRODUCT_CATEGORY}
              style={{
                marginHorizontal: Styles.Content.marginHorizontal,
                marginBottom: Styles.Content.marginVertical
              }}
              onPress={() => {
                Keyboard.dismiss();
                props.setProductCategoriesModalVisibility(true);
              }}
              disable={true} />

            <View
              style={Styles.BottomPinnedContainer}>
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
                    props.setWarehouseModalVisibility(true)
                  }} />
                <Input
                  type={__CONSTANTS.content.submitButton.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
                  value={__CONSTANTS.content.submitButton.state.normal.title[_LANGUAGE]}
                  gradient={Global.colors.pair.ongerine}
                  style={{
                    marginHorizontal: Styles.Content.marginHorizontal
                  }}
                  onPress={async () => {
                    const { navigation } = props;

                    if (props.newProduct.category._id !== props.newProduct.product.category._id){
                      await props.fetchProductBasedOnCategory(props.newProduct.category)
                    }

                    await navigation.navigate('NewProductFeatures');
                  }}
                  forcedDisable={_VALIDATED} />
            </View>

            <WarehouseModal
              visibility={props.newProduct.warehouseModalVisibility}
              onBlur={() => props.setWarehouseModalVisibility(false)}
              onProgressSuccess={async (response) => {
                await props.appendWarehouse(response);
              }}
              {..._WAREHOUSES_OTHER_PROPS} />

            <ProductCategoriesModal
              visibility={props.newProduct.productCategoriesModalVisibility}
              onBlur={() => props.setProductCategoriesModalVisibility(false)}
              onProgressSuccess={(response) => props.setCategory(response)}
              {..._PRODUCT_CATEGORIES_OTHER_PROPS} />
        </Container>
      );
    }else{
      return (
        <ActivityIndicator/>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductIdentity);
