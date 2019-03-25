import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Dimensions, Platform, Text, Image } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Pin, WarehouseModal, ProductCategoriesModal } from '../../assets/layouts/index';
import { Input, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewProductIdentity,
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
    const { props } = this;

    await props.fetchAvailableWarehouses();
  }

  render() {
    const { props } = this;

    var _TAB_CONTENT, _WAREHOUSE_CONTENT;

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
              marginBottom: Styles.Content.marginHorizontal
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
                marginBottom: Styles.Content.marginHorizontal
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
                marginBottom: Styles.Content.marginHorizontal
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
                      Styles.WarehouseItemContainer,
                      Styles.LTR_ContentAlignment
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
                              {item.products.count} {__CONSTANTS.content.firstCarousel.state.normal.content.suffix.en}
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
              style={[
                Styles.Content,
                Styles.EmptyContent
              ]}>
                <Link
                  containerStyle={Styles.EmptyContentLink}
                  value={__CONSTANTS.content.firstCarousel.state.null.title.en} />
            </View>
          );
        }
      }
    }

    const _KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR = (Platform.OS === 'ios')? 'padding': '',
          _PRODUCT_CATEGORY = (Object.keys(props.newProduct.category).length > 0)? props.newProduct.category.key: '';

    _TAB_CONTENT = (
      <KeyboardAvoidingView
        behavior={_KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR}
        style={Styles.MajorContent}>
          <Input
            type={__CONSTANTS.content.firstInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstInput.title.en)}
            placeholder={__CONSTANTS.content.firstInput.title.en}
            value={props.newProduct.name}
            style={Styles.RegularItemContainer}
            onChangeText={(currentValue) => props.setProductName(currentValue)} />

          {_WAREHOUSE_CONTENT}

          <Input
            type={__CONSTANTS.content.secondInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.content.secondInput.title.en)}
            link={__CONSTANTS.content.secondInput.link.en}
            placeholder={__CONSTANTS.content.secondInput.title.en}
            value={_PRODUCT_CATEGORY}
            style={{
              marginHorizontal: Styles.Content.marginHorizontal,
              marginBottom: Styles.Content.marginHorizontal
            }}
            onPress={() => props.setProductModalModalVisibility(true)}
            disable={true} />

          <View
            style={Styles.BottomPinnedContainer}>
              <Input
                type={__CONSTANTS.content.modalHandlerButton.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.modalHandlerButton.state.normal.title.en)}
                value={__CONSTANTS.content.modalHandlerButton.state.normal.title.en}
                gradient={Global.colors.pair.ongerine}
                style={{
                  marginHorizontal: Styles.Content.marginHorizontal,
                  marginBottom: Styles.Content.marginVertical
                }}
                onPress={() => props.setWarehouseModalVisibility(true)} />
              <Input
                type={__CONSTANTS.content.submitButton.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
                value={__CONSTANTS.content.submitButton.state.normal.title.en}
                gradient={Global.colors.pair.ongerine}
                style={{
                  marginHorizontal: Styles.Content.marginHorizontal
                }} />
          </View>
      </KeyboardAvoidingView>
    );

    return (
      <Container
        title={Functions._convertKeywordToToken(__CONSTANTS.pilot.title.en)}
        subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle.en)}
        {...props}>
          {_TAB_CONTENT}

          <WarehouseModal
            visibility={props.newProduct.warehouseModalVisibility}
            onBlur={() => props.setWarehouseModalVisibility(false)}
            onProgressSuccess={async (response) => {
              await props.appendWarehouse(response);
            }} />

          <ProductCategoriesModal
            visibility={props.newProduct.productCategoriesModalVisibility}
            onBlur={() => props.setProductModalModalVisibility(false)}
            onProgressSuccess={(response) => props.setCategory(response)} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductIdentity);
