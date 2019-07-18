import React, { Component } from 'react';
import { View, ScrollView, Dimensions, FlatList, Platform, Text, Image, Keyboard, I18nManager } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Separator, Options, ProductFeaturesModal } from '../../assets/layouts/index';
import { Input, Link, Carousel, Switch } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewFragment,
      Container = ViewsContainer.Products.NewFragmentContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewFragment;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_fragment_identity;

import { Functions, Global as GLOBAL } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewFragmentIdentity extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this,
          { navigation: { state: { params } } } = props,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = await _NATIVE_SETTINGS.language;

    await props.setLanguage(_LANGUAGE);
    await props.fetchAvailableProductWarehouses();
    await props.fetchAvailableProductShippingMethods();

    // if (typeof params != 'undefined'){
    //   if (Object.keys(params).length > 0){
    //     props.setName(params.name);
    //     props.setProduct(params.product);
    //     props.setUnits(params.units);
    //     props.setQuery(params.query);
    //     props.setQueryItems(params.queryItems);
    //   }
    // }
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newFragment;

    var _FORM_FIELDS_VALIDITY = false;

    if ((_PROPS.name != '') && (_PROPS.features.length > 0)){
      if (_PROPS.name.length > 7){
        if (Object.keys(_PROPS.product).length > 0){
          const _FRAGMENT_INTERNAL_NAME_CONTAINS_PRODUCT_NAME_REGEX = new RegExp(`\.*${_PROPS.product.name}\.*`, 'gi');

          if (_PROPS.name.match(_FRAGMENT_INTERNAL_NAME_CONTAINS_PRODUCT_NAME_REGEX)){
            _FORM_FIELDS_VALIDITY = true;
          }
        }
      }
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    if (Object.keys(props.newFragment.language).length > 0){
      const _LANGUAGE = Functions._convertTokenToKeyword(props.newFragment.language.key);

      const _PRODUCT_CATEGORY = (Object.keys(props.newFragment.product).length > 0)? (props.newFragment.product.category.cumulative_key || props.newFragment.product.category.key): '',
            _VALIDATED = this._componentWillCheckValidation(props),
            _PRODUCT_UNITS_OTHER_PROPS = {
              language: props.newFragment.language,
              units: props.newFragment.features.map((feature) => {
                return feature.unit;
              })
            };

      var _FINAL_CONTENT, _COMPLEX_CONTENT,
          _FINAL_BUTTON = (
            <Input
              type={__CONSTANTS.content.submitButton.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
              value={__CONSTANTS.content.submitButton.state.normal.title[_LANGUAGE]}
              gradient={Global.colors.pair.ongerine}
              style={{
                marginHorizontal: Styles.Content.marginHorizontal
              }}
              onPress={async () => {
                let { navigation } = props,
                    _DRAFT_ITEMS = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.FRAGMENT_DRAFT),
                    _FINAL_SEED = {
                      name: props.newFragment.name,
                      product: props.newFragment.product,
                      features: props.newFragment.features,
                      query: props.newFragment.query,
                      queryItems: props.newFragment.queryItems
                    };

                if (_DRAFT_ITEMS !== false){
                  const _PARSED_DRAFT_ITEMS = JSON.parse(_DRAFT_ITEMS),
                        _FOUNDED_DRAFT_INDEX = _PARSED_DRAFT_ITEMS.findIndex((item, i) => {
                          return (item.product._id === props.newFragment.product._id);
                        });

                  if (_FOUNDED_DRAFT_INDEX > -1){
                    _PARSED_DRAFT_ITEMS[_FOUNDED_DRAFT_INDEX] = {
                      ..._PARSED_DRAFT_ITEMS[_FOUNDED_DRAFT_INDEX],
                      ..._FINAL_SEED
                    };
                  }else{
                    _PARSED_DRAFT_ITEMS.push(_FINAL_SEED);
                  }

                  _DRAFT_ITEMS = _PARSED_DRAFT_ITEMS;
                }else{
                  _DRAFT_ITEMS = [_FINAL_SEED];
                }

                const _SERIALIZED_DATA = JSON.stringify(_DRAFT_ITEMS),
                      _DID_VERIFIED_DRAFT_ITEM = await Functions._storeDataWithKey(GLOBAL.STORAGE.FRAGMENT_DRAFT, _SERIALIZED_DATA);

                if (_DID_VERIFIED_DRAFT_ITEM !== false){
                  await navigation.navigate('NewFragmentFeatures');
                }
              }}
              forcedDisable={_VALIDATED} />
          );

      if (props.newFragment.features.length > 0){
        _COMPLEX_CONTENT = (
          <React.Fragment>
            {
              props.newFragment.features.map((feature, q) => {
                var _UNIT_DELETE_ACTION = () => props.setFeatures(props.newFragment.features.filter((checkingItem, j) => {
                      return (checkingItem.unit._id !== feature.unit._id);
                    })),
                    _FINAL_UNIT_COMPLEX = Preparation._prepareUnitAsASingleString(feature.unit, _LANGUAGE),
                    _UNIT_CONTAINER_STYLE = [
                      Styles.UnitsDetailItemContainer
                    ],
                    _SELECTED_WAREHOUSE_INDEX = props.newFragment.warehouses.findIndex((warehouse, i) => {
                      return warehouse._id === feature.warehouse._id;
                    }),
                    _SELECTED_SHIPPING_METHOD_INDEX = props.newFragment.shippingMethods.findIndex((shippingMethod, i) => {
                      return shippingMethod._id === feature.shipping_method._id;
                    }),
                    _MINIMUM_ORDER_QUANTITY = '',
                    _MAXIMUM_ORDER_QUANTITY = '',
                    _QUANTITY = (feature.quantity > 0)? feature.quantity.toString(): '',
                    _MINIMUM_DETACHABLE_ORDER_QUANTITY = '',
                    _MAXIMUM_DETACHABLE_ORDER_QUANTITY = '',
                    _PRICE = '',
                    _DETACHABLE_PRICE = '',
                    _UNIT_CONTAINER_SUBTITLE, _WAREHOUSE_CONTENT = (
                      <Input
                        type={__CONSTANTS.content.firstComplex.state.normal.firstCarousel.type}
                        style={[
                          Styles.CustomizedWarehouseDetailItemContainer,
                          {
                            marginHorizontal: Styles.Content.marginHorizontal,
                            marginBottom: Styles.Content.marginVertical
                          }
                        ]}
                        gradient={Global.colors.pair.ongerine}
                        disable={true}>
                          <ActivityIndicator/>
                      </Input>
                    ),
                    _SHIPPING_METHODS_CONTENT = (
                      <Input
                        type={__CONSTANTS.content.firstComplex.state.normal.secondCarousel.type}
                        style={[
                          Styles.CustomizedWarehouseDetailItemContainer,
                          {
                            marginHorizontal: Styles.Content.marginHorizontal,
                            marginBottom: Styles.Content.marginVertical
                          }
                        ]}
                        gradient={Global.colors.pair.ongerine}
                        disable={true}>
                          <ActivityIndicator/>
                      </Input>
                    ), _MAXIMUM_ORDER_QUANTITY_CONTENT, _MAXIMUM_DETACHABLE_ORDER_QUANTITY_CONTENT;

                if (Object.keys(feature.sales_structure).length > 0){
                  if (typeof feature.sales_structure.regular != 'undefined'){
                    if (typeof feature.sales_structure.regular.minimum_order_quantity != 'undefined'){
                      _MINIMUM_ORDER_QUANTITY = feature.sales_structure.regular.minimum_order_quantity.toString();
                    }

                    if (typeof feature.sales_structure.regular.maximum_order_quantity != 'undefined'){
                      _MAXIMUM_ORDER_QUANTITY = feature.sales_structure.regular.maximum_order_quantity.toString();
                    }

                    if (typeof feature.sales_structure.regular.price != 'undefined'){
                      if (Array.isArray(feature.sales_structure.regular.price) && feature.sales_structure.regular.price.length > 0){
                        _PRICE = feature.sales_structure.regular.price[0].value.toString();
                      }
                    }
                  }

                  if (typeof feature.sales_structure.detachable != 'undefined'){
                    if (typeof feature.sales_structure.detachable.minimum_order_quantity != 'undefined'){
                      _MINIMUM_DETACHABLE_ORDER_QUANTITY = feature.sales_structure.detachable.minimum_order_quantity.toString();
                    }

                    if (typeof feature.sales_structure.detachable.maximum_order_quantity != 'undefined'){
                      _MAXIMUM_DETACHABLE_ORDER_QUANTITY = feature.sales_structure.detachable.maximum_order_quantity.toString();
                    }

                    if (typeof feature.sales_structure.detachable.price != 'undefined'){
                      if (Array.isArray(feature.sales_structure.detachable.price) && feature.sales_structure.detachable.price.length > 0){
                        _DETACHABLE_PRICE = feature.sales_structure.detachable.price[0].value.toString();
                      }
                    }
                  }
                }

                _UNIT_CONTAINER_STYLE.push({
                  marginHorizontal: Styles.Content.marginHorizontal,
                  marginBottom: Styles.Content.marginVertical
                });

                let _FIRST_CAROUSEL_OTHER_OPTIONS = _SECOND_CAROUSEL_OTHER_OPTIONS = {},
                    _FIRST_CAROUSEL_ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((props.newFragment.warehouses.length > 1)? ((Platform.OS !== 'ios')? 2: 2): 2),
                    _SECOND_CAROUSEL_ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((props.newFragment.shippingMethods.length > 1)? ((Platform.OS !== 'ios')? 2: 2): 2);

                if (Platform.OS !== 'ios'){
                  _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';
                  _FIRST_CAROUSEL_OTHER_OPTIONS.loop = true;

                  if (I18nManager.isRTL){
                    _FIRST_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = {
                      flexDirection: 'row-reverse'
                    };
                  }
                }

                if (_FINAL_UNIT_COMPLEX.subtitle == ''){
                  _UNIT_CONTAINER_STYLE = [
                    Styles.UnitsDetailItemContainerWithoutSubtitle,
                    {
                      marginHorizontal: Styles.Content.marginHorizontal,
                      marginBottom: Styles.Content.marginVertical
                    }
                  ];
                }else{
                  _UNIT_CONTAINER_SUBTITLE = (
                    <Text
                      style={Styles.BriefDetailSubtitle}>
                        {_FINAL_UNIT_COMPLEX.subtitle}
                    </Text>
                  );
                }

                if (feature.isInfiniteMaximumOrderQuantity === false){
                  _MAXIMUM_ORDER_QUANTITY_CONTENT = (
                    <Input
                      type={__CONSTANTS.content.firstComplex.state.normal.thirdInput.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstComplex.state.normal.thirdInput.title.en)}
                      placeholder={__CONSTANTS.content.firstComplex.state.normal.thirdInput.title[_LANGUAGE]}
                      value={_MAXIMUM_ORDER_QUANTITY}
                      style={Styles.RegularItemContainer}
                      onChangeText={(currentValue) => {
                        let _LOCAL_SELECTED_UNIT_INDEX = props.newFragment.features.findIndex((checkingItem, j) => {
                              return (checkingItem.unit._id === feature.unit._id);
                            }),
                            _TOTAL_FEATURES = props.newFragment.features;

                        _TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure = {
                          ..._TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure,
                          regular: {
                            ..._TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure.regular,
                            maximum_order_quantity: (currentValue != '')? parseInt(currentValue): 0
                          }
                        };

                        props.setFeatures(_TOTAL_FEATURES);
                      }}
                      {...__CONSTANTS.content.firstComplex.state.normal.thirdInput.options} />
                  );

                  _MAXIMUM_DETACHABLE_ORDER_QUANTITY_CONTENT = (
                    <Input
                      type={__CONSTANTS.content.firstComplex.state.normal.seventhInput.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstComplex.state.normal.seventhInput.title.en)}
                      placeholder={__CONSTANTS.content.firstComplex.state.normal.seventhInput.title[_LANGUAGE]}
                      value={_MAXIMUM_DETACHABLE_ORDER_QUANTITY}
                      style={Styles.RegularItemContainer}
                      onChangeText={(currentValue) => {
                        let _LOCAL_SELECTED_UNIT_INDEX = props.newFragment.features.findIndex((checkingItem, j) => {
                              return (checkingItem.unit._id === feature.unit._id);
                            }),
                            _TOTAL_FEATURES = props.newFragment.features;

                        _TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure = {
                          ..._TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure,
                          detachable: {
                            ..._TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure.detachable,
                            maximum_order_quantity: (currentValue != '')? parseInt(currentValue): 0
                          }
                        };

                        props.setFeatures(_TOTAL_FEATURES);
                      }}
                      {...__CONSTANTS.content.firstComplex.state.normal.seventhInput.options} />
                  );
                }

                if (!props.newFragment.warehousesLoading){
                  if (!props.newFragment.connected.status){
                    _WAREHOUSE_CONTENT = (
                      <Input
                        type={__CONSTANTS.content.firstComplex.state.normal.firstCarousel.type}
                        style={[
                          Styles.CustomizedWarehouseDetailItemContainer,
                          {
                            backgroundColor: Global.colors.single.carminePink,
                            marginHorizontal: Styles.Content.marginHorizontal,
                            marginBottom: Styles.Content.marginVertical
                          }
                        ]}
                        textStyle={{
                          color: Global.colors.single.romance
                        }}
                        value={props.productFeaturesModal.connected.content}
                        onPress={async () => await props.fetchAvailableProductWarehouses()}/>
                    );
                  }else{
                    _WAREHOUSE_CONTENT = (
                      <Carousel
                        name={`${Functions._convertTokenToKeyword(__CONSTANTS.content.firstComplex.state.normal.firstCarousel.title.en)}-${q}`}
                        data={props.newFragment.warehouses}
                        firstItem={_SELECTED_WAREHOUSE_INDEX}
                        style={[
                          Styles.DetailContainer,
                          {
                            marginBottom: Styles.Content.marginVertical
                          }
                        ]}
                        itemWidth={(_Screen.width / 1.2) - (Styles.Content.marginHorizontal * _FIRST_CAROUSEL_ITEM_WIDTH_COEFFICIENT)}
                        onLayout={(warehouse) => {
                          var _ITEM_GRADIENT = Global.colors.pair.ongerine;

                          if (warehouse.item._id === feature.warehouse._id){
                            _ITEM_GRADIENT = Global.colors.pair.aqrulean;
                          }

                          return (
                            <Input
                              type={__CONSTANTS.content.firstComplex.state.normal.firstCarousel.type}
                              gradient={_ITEM_GRADIENT}
                              style={Styles.CustomizedWarehouseDetailItemContainer}
                              disable={true}>
                              <View
                                style={[
                                  Styles.DetailItemMasterInfoContent
                                ]}>
                                  <Text
                                    style={[
                                      Styles.BriefDetailTitle
                                    ]}>
                                      {__CONSTANTS.content.firstComplex.state.normal.firstCarousel.content.title[_LANGUAGE]}
                                  </Text>
                              </View>
                              <View
                                style={Styles.DetailItemMasterSubInfoContent}>
                                  <Icon
                                    name={__CONSTANTS.content.firstComplex.state.normal.firstCarousel.content.icon}
                                    color={Global.colors.single.romance} />

                                  <Text
                                    style={[
                                      Styles.BriefDetailRowText
                                    ]}>
                                      {warehouse.item.name}
                                  </Text>
                              </View>
                            </Input>
                          )
                        }}
                        onSnap={(selectedItemIndex) => {
                          let _LOCAL_SELECTED_UNIT_INDEX = props.newFragment.features.findIndex((checkingItem, j) => {
                                return (checkingItem.unit._id === feature.unit._id);
                              }),
                              _TOTAL_FEATURES = props.newFragment.features;

                          _TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].warehouse = props.newFragment.warehouses[selectedItemIndex];

                          props.setFeatures(_TOTAL_FEATURES);
                        }}
                        {..._FIRST_CAROUSEL_OTHER_OPTIONS}/>
                    );
                  }
                }


                if (!props.newFragment.shippingMethodsLoading){
                  if (!props.newFragment.connected.status){
                    _SHIPPING_METHODS_CONTENT = (
                      <Input
                        type={__CONSTANTS.content.firstComplex.state.normal.secondCarousel.type}
                        style={[
                          Styles.CustomizedWarehouseDetailItemContainer,
                          {
                            backgroundColor: Global.colors.single.carminePink,
                            marginHorizontal: Styles.Content.marginHorizontal,
                            marginBottom: Styles.Content.marginVertical
                          }
                        ]}
                        textStyle={{
                          color: Global.colors.single.romance
                        }}
                        value={props.productFeaturesModal.connected.content}
                        onPress={async () => await props.fetchAvailableProductShippingMethods()}/>
                    );
                  }else{
                    _SHIPPING_METHODS_CONTENT = (
                      <Carousel
                        name={`${Functions._convertTokenToKeyword(__CONSTANTS.content.firstComplex.state.normal.secondCarousel.title.en)}-${q}`}
                        data={props.newFragment.shippingMethods}
                        firstItem={_SELECTED_SHIPPING_METHOD_INDEX}
                        style={[
                          Styles.DetailContainer,
                          {
                            marginBottom: Styles.Content.marginVertical
                          }
                        ]}
                        itemWidth={(_Screen.width / 1.2) - (Styles.Content.marginHorizontal * _SECOND_CAROUSEL_ITEM_WIDTH_COEFFICIENT)}
                        onLayout={(shippingMethod) => {
                          var _ITEM_GRADIENT = Global.colors.pair.ongerine;

                          if (shippingMethod.item._id === feature.shipping_method._id){
                            _ITEM_GRADIENT = Global.colors.pair.aqrulean;
                          }

                          return (
                            <Input
                              type={__CONSTANTS.content.firstComplex.state.normal.secondCarousel.type}
                              gradient={_ITEM_GRADIENT}
                              style={Styles.CustomizedWarehouseDetailItemContainer}
                              disable={true}>
                              <View
                                style={[
                                  Styles.DetailItemMasterInfoContent
                                ]}>
                                  <Text
                                    style={[
                                      Styles.BriefDetailTitle
                                    ]}>
                                      {__CONSTANTS.content.firstComplex.state.normal.secondCarousel.content.title[_LANGUAGE]}
                                  </Text>
                              </View>
                              <View
                                style={Styles.DetailItemMasterSubInfoContent}>
                                  <Icon
                                    name={__CONSTANTS.content.firstComplex.state.normal.secondCarousel.content.icon}
                                    color={Global.colors.single.romance} />

                                  <Text
                                    style={[
                                      Styles.BriefDetailRowText
                                    ]}>
                                      {Functions._getAppropriateTaxonomyBaseOnLocale(shippingMethod.item.value, _LANGUAGE)}
                                  </Text>
                              </View>
                            </Input>
                          )
                        }}
                        onSnap={(selectedItemIndex) => {
                          let _LOCAL_SELECTED_UNIT_INDEX = props.newFragment.features.findIndex((checkingItem, j) => {
                                return (checkingItem.unit._id === feature.unit._id);
                              }),
                              _TOTAL_FEATURES = props.newFragment.features;

                          _TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].shipping_method = props.newFragment.shippingMethods[selectedItemIndex];

                          props.setFeatures(_TOTAL_FEATURES);
                        }}
                        {..._SECOND_CAROUSEL_OTHER_OPTIONS}/>
                    );
                  }
                }

                return (
                  <React.Fragment>
                    <Input
                      type={__CONSTANTS.content.firstComplex.state.normal.firstInput.type}
                      style={_UNIT_CONTAINER_STYLE}
                      gradient={Global.colors.pair.tilan}>
                        <View
                          style={Styles.DetailItemMasterInfoContent}>
                            <Text
                              style={Styles.BriefDetailTitle}>
                                {_FINAL_UNIT_COMPLEX.title}
                            </Text>

                            {_UNIT_CONTAINER_SUBTITLE}
                        </View>
                    </Input>

                    {_WAREHOUSE_CONTENT}

                    <Input
                      type={__CONSTANTS.content.firstComplex.state.normal.secondInput.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstComplex.state.normal.secondInput.title.en)}
                      placeholder={__CONSTANTS.content.firstComplex.state.normal.secondInput.title[_LANGUAGE]}
                      value={_MINIMUM_ORDER_QUANTITY}
                      style={Styles.RegularItemContainer}
                      onChangeText={(currentValue) => {
                        let _LOCAL_SELECTED_UNIT_INDEX = props.newFragment.features.findIndex((checkingItem, j) => {
                              return (checkingItem.unit._id === feature.unit._id);
                            }),
                            _TOTAL_FEATURES = props.newFragment.features;

                        _TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure = {
                          ..._TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure,
                          regular: {
                            ..._TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure.regular,
                            minimum_order_quantity: (currentValue != '')? parseInt(currentValue): 0
                          }
                        };

                        props.setFeatures(_TOTAL_FEATURES);
                      }}
                      {...__CONSTANTS.content.firstComplex.state.normal.secondInput.options} />

                    <Switch
                      value={feature.isInfiniteMaximumOrderQuantity}
                      title={__CONSTANTS.content.firstComplex.state.normal.firstSwitch.title[_LANGUAGE]}
                      containerStyle={{
                        marginHorizontal: Styles.Content.marginHorizontal,
                        marginBottom: Styles.Content.marginVertical
                      }}
                      onChange={() => {
                        let _LOCAL_SELECTED_UNIT_INDEX = props.newFragment.features.findIndex((checkingItem, j) => {
                              return (checkingItem.unit._id === feature.unit._id);
                            }),
                            _TOTAL_FEATURES = props.newFragment.features;

                        _TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].isInfiniteMaximumOrderQuantity = !_TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].isInfiniteMaximumOrderQuantity;

                        props.setFeatures(_TOTAL_FEATURES);
                      }}/>

                    {_MAXIMUM_ORDER_QUANTITY_CONTENT}

                    <Input
                      type={__CONSTANTS.content.firstComplex.state.normal.fourthInput.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstComplex.state.normal.fourthInput.title.en)}
                      placeholder={__CONSTANTS.content.firstComplex.state.normal.fourthInput.title[_LANGUAGE]}
                      value={_QUANTITY}
                      style={Styles.RegularItemContainer}
                      onChangeText={(currentValue) => {
                        let _LOCAL_SELECTED_UNIT_INDEX = props.newFragment.features.findIndex((checkingItem, j) => {
                              return (checkingItem.unit._id === feature.unit._id);
                            }),
                            _TOTAL_FEATURES = props.newFragment.features;

                        _TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].quantity = (currentValue != '')? parseInt(currentValue): 0;

                        props.setFeatures(_TOTAL_FEATURES);
                      }}
                      {...__CONSTANTS.content.firstComplex.state.normal.fourthInput.options} />

                    <Input
                      type={__CONSTANTS.content.firstComplex.state.normal.fifthInput.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstComplex.state.normal.fifthInput.title.en)}
                      placeholder={__CONSTANTS.content.firstComplex.state.normal.fifthInput.title[_LANGUAGE]}
                      value={_PRICE}
                      style={Styles.RegularItemContainer}
                      onChangeText={(currentValue) => {
                        let _LOCAL_SELECTED_UNIT_INDEX = props.newFragment.features.findIndex((checkingItem, j) => {
                              return (checkingItem.unit._id === feature.unit._id);
                            }),
                            _TOTAL_FEATURES = props.newFragment.features;

                        _TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure = {
                          ..._TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure,
                          regular: {
                            ..._TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure.regular,
                            price: [{
                              value: (currentValue != '')? parseInt(currentValue): 0,
                              currency: 'RIR'
                            }]
                          }
                        };

                        props.setFeatures(_TOTAL_FEATURES);
                      }}
                      {...__CONSTANTS.content.firstComplex.state.normal.fifthInput.options} />

                    <Switch
                      value={feature.isDetachableUnit}
                      title={__CONSTANTS.content.firstComplex.state.normal.secondSwitch.title[_LANGUAGE]}
                      containerStyle={{
                        marginHorizontal: Styles.Content.marginHorizontal,
                        marginBottom: Styles.Content.marginVertical
                      }}
                      onChange={() => {
                        let _LOCAL_SELECTED_UNIT_INDEX = props.newFragment.features.findIndex((checkingItem, j) => {
                              return (checkingItem.unit._id === feature.unit._id);
                            }),
                            _TOTAL_FEATURES = props.newFragment.features;

                        _TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].isDetachableUnit = !_TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].isDetachableUnit;

                        props.setFeatures(_TOTAL_FEATURES);
                      }}/>

                    <Input
                      type={__CONSTANTS.content.firstComplex.state.normal.sixthInput.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstComplex.state.normal.sixthInput.title.en)}
                      placeholder={__CONSTANTS.content.firstComplex.state.normal.sixthInput.title[_LANGUAGE]}
                      value={_MINIMUM_DETACHABLE_ORDER_QUANTITY}
                      style={Styles.RegularItemContainer}
                      onChangeText={(currentValue) => {
                        let _LOCAL_SELECTED_UNIT_INDEX = props.newFragment.features.findIndex((checkingItem, j) => {
                              return (checkingItem.unit._id === feature.unit._id);
                            }),
                            _TOTAL_FEATURES = props.newFragment.features;

                        _TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure = {
                          ..._TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure,
                          detachable: {
                            ..._TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure.detachable,
                            minimum_order_quantity: (currentValue != '')? parseInt(currentValue): 0
                          }
                        };

                        props.setFeatures(_TOTAL_FEATURES);
                      }}
                      {...__CONSTANTS.content.firstComplex.state.normal.sixthInput.options} />

                    {_MAXIMUM_DETACHABLE_ORDER_QUANTITY_CONTENT}

                    <Input
                      type={__CONSTANTS.content.firstComplex.state.normal.eighthInput.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstComplex.state.normal.eighthInput.title.en)}
                      placeholder={__CONSTANTS.content.firstComplex.state.normal.eighthInput.title[_LANGUAGE]}
                      value={_DETACHABLE_PRICE}
                      style={Styles.RegularItemContainer}
                      onChangeText={(currentValue) => {
                        let _LOCAL_SELECTED_UNIT_INDEX = props.newFragment.features.findIndex((checkingItem, j) => {
                              return (checkingItem.unit._id === feature.unit._id);
                            }),
                            _TOTAL_FEATURES = props.newFragment.features;

                        _TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure = {
                          ..._TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure,
                          detachable: {
                            ..._TOTAL_FEATURES[_LOCAL_SELECTED_UNIT_INDEX].sales_structure.detachable,
                            price: [{
                              value: (currentValue != '')? parseInt(currentValue): 0,
                              currency: 'RIR'
                            }]
                          }
                        };

                        props.setFeatures(_TOTAL_FEATURES);
                      }}
                      {...__CONSTANTS.content.firstComplex.state.normal.eighthInput.options} />

                    {_SHIPPING_METHODS_CONTENT}

                    <Separator
                       style={{
                         marginBottom: Styles.Content.marginVertical
                       }}>
                         <Link
                           value={__CONSTANTS.content.firstComplex.state.normal.firstSeparator[_LANGUAGE]}
                           onPress={_UNIT_DELETE_ACTION}/>
                     </Separator>
                  </React.Fragment>
                );
              })
            }
          </React.Fragment>
        );
      }else{
        _COMPLEX_CONTENT = (
          <Link
            containerStyle={[
              Styles.EmptyContentLink,
              {
                marginBottom: Styles.Content.marginVertical
              }
            ]}
            value={__CONSTANTS.content.firstComplex.state.empty.title[_LANGUAGE]} />
        );
      }

      _FINAL_CONTENT = (
        <ScrollView
          name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstComplex.title.en)}
          contentContainerStyle={{
            paddingBottom: (((Styles.Content.marginVertical * 2) + props.newFragment.features.length) * props.newFragment.features.length) + ((props.newFragment.features.length < 2)? 10: 0)
          }}>
            <Input
              type={__CONSTANTS.content.firstInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstInput.title.en)}
              placeholder={__CONSTANTS.content.firstInput.title[_LANGUAGE]}
              value={props.newFragment.name}
              style={[
                Styles.RegularItemContainer,
                {
                  marginTop: Styles.Content.marginVertical
                }
              ]}
              onChangeText={(currentValue) => props.setName(currentValue)} />

            {_COMPLEX_CONTENT}

            <Input
              type={__CONSTANTS.content.modalHandlerButton.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.modalHandlerButton.state.normal.title.en)}
              value={__CONSTANTS.content.modalHandlerButton.state.normal.title[_LANGUAGE]}
              gradient={Global.colors.pair.ongerine}
              style={{
                marginHorizontal: Styles.Content.marginHorizontal,
                marginBottom: Styles.Content.marginVertical
              }}
              onPress={() => props.setUnitsModalVisibility(true)} />

            {_FINAL_BUTTON}
        </ScrollView>
      );

      if (_VALIDATED){
        var _MESSAGE = '';

        if (props.newFragment.name != ''){
          if (props.newFragment.name.length > 7){
            if (Object.keys(props.newFragment.product).length > 0){
              const _FRAGMENT_INTERNAL_NAME_CONTAINS_PRODUCT_NAME_REGEX = new RegExp(`\.*${props.newFragment.product.name}\.*`, 'gi');

              if (props.newFragment.name.match(_FRAGMENT_INTERNAL_NAME_CONTAINS_PRODUCT_NAME_REGEX) === null){
                _MESSAGE += __CONSTANTS.content.firstInput.warnning.third[_LANGUAGE];
              }
            }
          }else{
            _MESSAGE += __CONSTANTS.content.firstInput.warnning.second[_LANGUAGE];
          }
        }else{
          _MESSAGE += __CONSTANTS.content.firstInput.warnning.first[_LANGUAGE];

          // if (props.newFragment.units.length === 0){
          //   _MESSAGE += `\n ${__CONSTANTS.content.firstComplex.warnning[_LANGUAGE]}`;
          // }
        }

        if (_MESSAGE != ''){
          _FINAL_BUTTON = (
            <Input
              type={__CONSTANTS.content.submitButton.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
              value={_MESSAGE}
              style={[
                Styles.WarningContainer,
                {
                  marginBottom: Styles.Content.marginVertical
                }
              ]}
              textStyle={Styles.WarningContent} />
          );
        }
      }

      return (
        <Container
          title={Functions._convertKeywordToToken(__CONSTANTS.pilot.title[_LANGUAGE])}
          subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle[_LANGUAGE])}
          {...props}>
            {_FINAL_CONTENT}

            <ProductFeaturesModal
              visibility={props.newFragment.unitsModalVisibility}
              onBlur={() => props.setUnitsModalVisibility(false)}
              onProgressSuccess={(response) => {
                const _WAREHOUSES = props.newFragment.warehouses,
                      _SHIPPING_METHODS = props.newFragment.shippingMethods;

                props.appendFeature({
                  unit: response,
                  warehouse: (_WAREHOUSES.length > 0)? _WAREHOUSES[0]: {},
                  sales_structure: {},
                  shipping_method: (_SHIPPING_METHODS.length > 0)? _SHIPPING_METHODS[0]: {},
                  quantity: 0,
                  isInfiniteMaximumOrderQuantity: true,
                  isDetachableUnit: false
                });
              }}
              {..._PRODUCT_UNITS_OTHER_PROPS} />
        </Container>
      );
    }else{
      return (
        <ActivityIndicator/>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewFragmentIdentity);
