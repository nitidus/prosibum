import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Dimensions, Platform, Text, Image } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Pin } from '../../assets/layouts/index';
import { Input, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewProductIdentity,
      Container = ViewsContainer.Products.NewProductContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewProduct;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.wallets;

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
          type="button"
          name="{Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstHiddenTab.firstCarouselContainer.title.en)}"
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
            type="button"
            name="{Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstHiddenTab.firstCarouselContainer.title.en)}"
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
              name="{Functions._convertTokenToKeyword(__CONSTANTS.firstCarousel.title.en)}"
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
                    type={__CONSTANTS.firstCarousel.type}
                    name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarousel.items.title.en)}
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
                              {item.products.count + " Products"}
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
                  value={"There's no warehouse."} />
            </View>
          );
        }
      }
    }

    const _KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR = (Platform.OS === 'ios')? 'padding': '';

    _TAB_CONTENT = (
      <KeyboardAvoidingView
        behavior={_KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR}
        style={Styles.MajorContent}>
          <Input
            type="text"
            name="{Functions._convertTokenToKeyword(__CONSTANTS.firstInputGroup.first.title.en)}"
            placeholder="Product Name"
            value={props.newProduct.name}
            style={Styles.RegularItemContainer}
            onChangeText={(currentValue) => props.setProductName(currentValue)} />

          {_WAREHOUSE_CONTENT}

          <View
            style={Styles.BottomPinnedContainer}>
              <Input
                type="button"
                name="{Functions._convertTokenToKeyword(__CONSTANTS.firstInputGroup.first.title.en)}"
                value="Append New Warehouse"
                gradient={Global.colors.pair.ongerine}
                style={{
                  marginHorizontal: Styles.Content.marginHorizontal,
                  marginBottom: Styles.Content.marginVertical
                }} />
              <Input
                type="button"
                name="{Functions._convertTokenToKeyword(__CONSTANTS.firstInputGroup.first.title.en)}"
                value="Append Features"
                gradient={Global.colors.pair.ongerine}
                style={{
                  marginHorizontal: Styles.Content.marginHorizontal
                }} />
          </View>
      </KeyboardAvoidingView>
    );

    return (
      <Container
        title="New Product"
        subtitle="Product Identity"
        {...props}>
          {_TAB_CONTENT}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductIdentity);
