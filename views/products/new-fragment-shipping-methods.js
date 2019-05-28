import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, I18nManager, Text, Image, Keyboard, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';
import Interactable from 'react-native-interactable';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Options, ProductUnitsDependedModal, ProductShippingMethodsModal } from '../../assets/layouts/index';
import { Input, InputGroup, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewFragment,
      Container = ViewsContainer.Products.NewFragmentContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewFragment;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_fragment_shipping_methods;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewFragmentShippingMethods extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this;

    if (Object.keys(props.newFragment.language).length === 0){
      const _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
            _LANGUAGE = _NATIVE_SETTINGS.language;

      await props.setLanguage(_LANGUAGE);
    }
    // 
    // props.setFeatures([{"_id":"5ced02426ff59e0000d60b7e","feature_id":"5ca681d9d0a37b307e733050","unit":{"_id":"5ca6848ed0a37b307e733054","created_at":"2019-04-04T22:26:21.819Z","modified_at":"2019-04-04T22:26:21.819Z","key":"BOX"},"warehouse":{"_id":"5c86e2cf1f9b524d5a293d85","name":"First Warehouse","created_at":"2019-03-11T22:35:59.194Z","modified_at":"2019-03-11T22:35:59.194Z","products":{"count":0},"enduser":{"_id":"5c7d0b6543b97d06cb4efa98","user":{"_id":"5c7d0b6543b97d06cb4efa97","personal":{"first_name":"Ali","last_name":"Alizade Haqiqi"},"email":{"content":"alializade@peedes.com","validation":{"token":"0b43e8f60ce68e43f8c07ce10441cb552216efe9e2620a9c78e33973e8160c67","value":true}},"phone":{"landline":"+982177521988","mobile":{"content":"+989122122897","validation":{"token":"149510","value":false,"created_at":"2019-03-04T11:26:28.978Z","modified_at":"2019-04-14T22:28:27.715Z"}}},"address":{"coordinates":{"latitude":35.6958349,"longitude":51.4364755},"apartment_suite_building":"Block 1","street":"Mojahedin Eslam St, Estenkafi Ave, Gol Narges DE","city":"Tehran","province":"Tehran","zip_code":"1154815863","country":"Iran"},"password":"6dc69ae7e44cbe1ec9c5ce04ba68cbfd228beb2d3c28a85e58a4d608ab4f69e636edf66bb7cce93c7ef1be5ccc565a0c10b044d89835fd2c4e7a31906b5005da25817bf88d75bf65d61405f268198bc097e1526671f3c06a8845121b7be1d9a0","created_at":"2019-03-04T11:26:28.978Z","modified_at":"2019-03-04T11:26:28.978Z"},"usergroup":{"_id":"5c7d089243b97d06cb4efa8b","type":"WHOLESALER","role":"CHIEF_EXECUTIVE_OFFICER","priority":0,"created_at":"2019-03-04T11:14:25.928Z","modified_at":"2019-03-04T11:14:25.928Z"}}},"minimum_order_quantity":20,"maximum_order_quantity":200,"quantity":2000,"primary":true},{"_id":"5ced02516ff59e0000d60b7f","feature_id":"5ca681d9d0a37b307e733050","unit":{"_id":"5ca6848ed0a37b307e733054","created_at":"2019-04-04T22:26:21.819Z","modified_at":"2019-04-04T22:26:21.819Z","key":"BOX"},"warehouse":{"_id":"5c86e2d81f9b524d5a293d86","name":"Second Warehouse","created_at":"2019-03-11T22:36:08.218Z","modified_at":"2019-03-11T22:36:08.218Z","products":{"count":0},"enduser":{"_id":"5c7d0b6543b97d06cb4efa98","user":{"_id":"5c7d0b6543b97d06cb4efa97","personal":{"first_name":"Ali","last_name":"Alizade Haqiqi"},"email":{"content":"alializade@peedes.com","validation":{"token":"0b43e8f60ce68e43f8c07ce10441cb552216efe9e2620a9c78e33973e8160c67","value":true}},"phone":{"landline":"+982177521988","mobile":{"content":"+989122122897","validation":{"token":"149510","value":false,"created_at":"2019-03-04T11:26:28.978Z","modified_at":"2019-04-14T22:28:27.715Z"}}},"address":{"coordinates":{"latitude":35.6958349,"longitude":51.4364755},"apartment_suite_building":"Block 1","street":"Mojahedin Eslam St, Estenkafi Ave, Gol Narges DE","city":"Tehran","province":"Tehran","zip_code":"1154815863","country":"Iran"},"password":"6dc69ae7e44cbe1ec9c5ce04ba68cbfd228beb2d3c28a85e58a4d608ab4f69e636edf66bb7cce93c7ef1be5ccc565a0c10b044d89835fd2c4e7a31906b5005da25817bf88d75bf65d61405f268198bc097e1526671f3c06a8845121b7be1d9a0","created_at":"2019-03-04T11:26:28.978Z","modified_at":"2019-03-04T11:26:28.978Z"},"usergroup":{"_id":"5c7d089243b97d06cb4efa8b","type":"WHOLESALER","role":"CHIEF_EXECUTIVE_OFFICER","priority":0,"created_at":"2019-03-04T11:14:25.928Z","modified_at":"2019-03-04T11:14:25.928Z"}}},"minimum_order_quantity":30,"maximum_order_quantity":300,"quantity":3000},{"_id":"5ced02626ff59e0000d60b80","feature_id":"5ca681d9d0a37b307e733050","unit":{"_id":"5ca684a9d0a37b307e733055","created_at":"2019-04-04T22:26:48.960Z","modified_at":"2019-04-04T22:26:48.960Z","key":"KILOGRAM"},"warehouse":{"_id":"5c86e2cf1f9b524d5a293d85","name":"First Warehouse","created_at":"2019-03-11T22:35:59.194Z","modified_at":"2019-03-11T22:35:59.194Z","products":{"count":0},"enduser":{"_id":"5c7d0b6543b97d06cb4efa98","user":{"_id":"5c7d0b6543b97d06cb4efa97","personal":{"first_name":"Ali","last_name":"Alizade Haqiqi"},"email":{"content":"alializade@peedes.com","validation":{"token":"0b43e8f60ce68e43f8c07ce10441cb552216efe9e2620a9c78e33973e8160c67","value":true}},"phone":{"landline":"+982177521988","mobile":{"content":"+989122122897","validation":{"token":"149510","value":false,"created_at":"2019-03-04T11:26:28.978Z","modified_at":"2019-04-14T22:28:27.715Z"}}},"address":{"coordinates":{"latitude":35.6958349,"longitude":51.4364755},"apartment_suite_building":"Block 1","street":"Mojahedin Eslam St, Estenkafi Ave, Gol Narges DE","city":"Tehran","province":"Tehran","zip_code":"1154815863","country":"Iran"},"password":"6dc69ae7e44cbe1ec9c5ce04ba68cbfd228beb2d3c28a85e58a4d608ab4f69e636edf66bb7cce93c7ef1be5ccc565a0c10b044d89835fd2c4e7a31906b5005da25817bf88d75bf65d61405f268198bc097e1526671f3c06a8845121b7be1d9a0","created_at":"2019-03-04T11:26:28.978Z","modified_at":"2019-03-04T11:26:28.978Z"},"usergroup":{"_id":"5c7d089243b97d06cb4efa8b","type":"WHOLESALER","role":"CHIEF_EXECUTIVE_OFFICER","priority":0,"created_at":"2019-03-04T11:14:25.928Z","modified_at":"2019-03-04T11:14:25.928Z"}}},"minimum_order_quantity":40,"maximum_order_quantity":400,"quantity":4000,"primary":true}])
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newFragment;

    var _FORM_FIELDS_VALIDITY = false;

    if (_PROPS.shippingPlans.length > 0){
      if (_PROPS.shippingPlans.every((shippingPlan) => ((Object.keys(shippingPlan.feature).length > 0) && (Object.keys(shippingPlan.shippingMethod).length > 0)))){
        _FORM_FIELDS_VALIDITY = true;
      }
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    if (Object.keys(props.newFragment.language).length > 0){
      var _SHIPPING_METHODS_CONTENT, _APPEND_PRODUCT_BUTTON;

      const _LANGUAGE = Functions._convertTokenToKeyword(props.newFragment.language.key),
            _PRODUCT_TITLE = (props.newFragment.name != '')? props.newFragment.name: __CONSTANTS.pilot.title[_LANGUAGE],
            _VALIDATED = this._componentWillCheckValidation(props),
            _PRODUCT_UNIT_DEPENDED_OTHER_PROPS = {
              language: props.newFragment.language
            },
            _PRODUCT_SHIPPING_METHODS_OTHER_PROPS = {
              language: props.newFragment.language
            };

      if (props.newFragment.shippingPlans.length > 0){
        if (props.newFragment.appendProductLoading){
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
          if (!props.newFragment.connected.status){
            _APPEND_PRODUCT_BUTTON = (
              <Input
                type={__CONSTANTS.content.submitButton.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
                value={props.newFragment.connected.content}
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
                props.newFragment.shippingPlans.map((shippingPlanItem, i, totalShippingPlans) => {
                  var _CUSTOM_STYLE = {
                        marginHorizontal: Styles.Content.marginHorizontal
                      },
                      _SHIPPING_METHOD_DELETE_ACTION = () => props.setProductShippingPlans(props.newFragment.shippingPlans.filter((checkingItem, j) => {
                        return (checkingItem._id != shippingPlanItem._id);
                      })),
                      SHIPPING_METHOD_OPTION_CUSTOM_CONTAINER = {
                        height: Styles.ShippingMethodsContainer.height
                      };

                  if (i < totalShippingPlans.length){
                    _CUSTOM_STYLE.marginBottom = Styles.Content.marginVertical;
                  }

                  const _SHIPPING_PLAN_UNIT_FEATURE = (Object.keys(shippingPlanItem.feature).length > 0)? shippingPlanItem.feature: {},
                        _SHIPPING_PLAN_UNIT = (Object.keys(_SHIPPING_PLAN_UNIT_FEATURE).length > 0)? ((Object.keys(_SHIPPING_PLAN_UNIT_FEATURE.unit).length > 0)? `${Functions._getAppropriateTaxonomyBaseOnLocale(_SHIPPING_PLAN_UNIT_FEATURE.unit.key, _LANGUAGE)}${((I18nManager.isRTL)? '،': ',')} ${shippingPlanItem.feature.warehouse.name}`: ''): '',
                        _SHIPPING_PLAN_METHOD = (Object.keys(shippingPlanItem.shippingMethod).length > 0)? Functions._getAppropriateTaxonomyBaseOnLocale(shippingPlanItem.shippingMethod.value, _LANGUAGE): '';

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
                                props.setUnitDependedModalVisibility(true);
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
                                props.setShippingMethodsModalVisibility(true);
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
                onPress={() => props.appendShippingPlan({
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

      return (
        <Container
          title={Functions._convertKeywordToToken(_PRODUCT_TITLE)}
          subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle[_LANGUAGE])}
          rightIcon={__CONSTANTS.pilot.rightIcon}
          onRightIconPress={() => props.appendShippingPlan({
            _id: Functions._generateNewBSONObjectID(),
            feature: {},
            shippingMethod: {},
            animation: new Animated.Value(0)
          })}
          {...props}>
            {_SHIPPING_METHODS_CONTENT}

            <ProductUnitsDependedModal
              data={props.newFragment.features}
              visibility={props.newFragment.unitDependedModalVisibility}
              onBlur={() => props.setUnitDependedModalVisibility(false)}
              onProgressSuccess={(response) => props.setShippingPlans(props.newFragment.shippingPlans.map((shippingPlanItem, i) => {
                const _ON_FETCHING_MODE_SHIPPING_METHOD = props.newFragment.onFetchingModeShippingPlan;

                if (shippingPlanItem._id === _ON_FETCHING_MODE_SHIPPING_METHOD._id){
                  const _TARGET_SHIPPING_PLAN_NODE = {
                    ...shippingPlanItem,
                    feature: response
                  };

                  return _TARGET_SHIPPING_PLAN_NODE;
                }else{
                  return shippingPlanItem;
                }
              }))}
              {..._PRODUCT_UNIT_DEPENDED_OTHER_PROPS} />

            <ProductShippingMethodsModal
              visibility={props.newFragment.shippingMethodsModalVisibility}
              onBlur={() => props.setShippingMethodsModalVisibility(false)}
              onProgressSuccess={(response) => props.setShippingPlans(props.newFragment.shippingPlans.map((shippingPlanItem, i) => {
                const _ON_FETCHING_MODE_SHIPPING_METHOD = props.newFragment.onFetchingModeShippingPlan;

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

export default connect(mapStateToProps, mapDispatchToProps)(NewFragmentShippingMethods);
