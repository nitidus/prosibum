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
          _LANGUAGE = _NATIVE_SETTINGS.language;

    this._language = _LANGUAGE;

    await props.resetProductForms();

    await props.fetchAvailableWarehouses();
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newProduct;

    var _FORM_FIELDS_VALIDITY = false;

    if ((_PROPS.name != '') && (Object.keys(_PROPS.currentWarehouse).length > 0) && (Object.keys(_PROPS.category).length > 0)){
      if (_PROPS.name.length > 7){
        _FORM_FIELDS_VALIDITY = true;
      }
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    if (typeof this._language != 'undefined'){
      const _LANGUAGE = Functions._convertTokenToKeyword(this._language.key),
      _WAREHOUSES_OTHER_PROPS = {
        language: this._language
      },
      _PRODUCT_CATEGORIES_OTHER_PROPS = {
        language: this._language
      }

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
            const _SELECTED_WAREHOUSE_INDEX = props.newProduct.warehouses.findIndex((warehouse, i) => {
                    return warehouse._id === props.newProduct.currentWarehouse._id;
                  });

            _WAREHOUSE_CONTENT = (
              <Carousel
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstCarousel.state.normal.title.en)}
                data={props.newProduct.warehouses}
                firstItem={_SELECTED_WAREHOUSE_INDEX}
                itemWidth={_Screen.width - (Styles.Content.marginHorizontal * 2)}
                style={{
                  marginBottom: Styles.Content.marginVertical
                }}
                onLayout={({ item, index }) => {
                  var _ITEM_GRADIENT = Global.colors.pair.tilan;

                  if (_SELECTED_WAREHOUSE_INDEX === index){
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
                          style={Styles.DetailItemMasterInfoContent}>
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
                onSnap={(selectedItemIndex) => props.setCurrentWarehouse(props.newProduct.warehouses[selectedItemIndex])}/>
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
              value={props.newProduct.name}
              style={[
                Styles.RegularItemContainer,
                {
                  marginTop: Styles.Content.marginVertical
                }
              ]}
              onChangeText={(currentValue) => props.setProductName(currentValue)} />

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
                  onPress={() => props.setWarehouseModalVisibility(true)} />
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
