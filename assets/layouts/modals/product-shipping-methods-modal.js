import React, { Component } from 'react';

import { View, TouchableOpacity, Text, Dimensions, Platform, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Modules } from '../../styles/index';
import { ActivityIndicator } from '../activity-indicator';
import { Icon } from '../icon';
import { Modal } from '../modal';
import { Input, Carousel, Link } from '../../components/index';
const Styles = Modules.Layouts.ProductShippingMethodsModal;

import { Functions } from '../../modules/index';
const { Preparation } = Functions;

import { Layouts as LayoutsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.ProductShippingMethodsModal;

import { layouts_constants } from '../../flows/knowledge/index';
const __CONSTANTS = layouts_constants.modals.product_shipping_methods_modal;

const _componentWillCheckValidation = (props) => {
  const _PROPS = props.productShippingMethodsModal;

  var _FORM_FIELDS_VALIDITY = false;

  if ((_PROPS.shippingMethods.length > 0) && (Object.keys(_PROPS.selectedShippingMethod).length > 0)){
    _FORM_FIELDS_VALIDITY = true;
  }

  return !_FORM_FIELDS_VALIDITY;
}

const ProductShippingMethodsModal = (props) => {
  var attitude = {};

  if (typeof props.key != 'undefined'){
    attitude.key = props.key;
  }else{
    if (typeof props.name != 'undefined'){
      attitude.key = props.name;
    }else{
      attitude.key = Functions._generateNewUniqueObjectKey()
    }
  }

  if ((typeof props.name != 'undefined') || (typeof props.title != 'undefined')){
    attitude.name = props.name || props.title;
  }

  attitude.visibility = props.visibility || props.visible || props.isVisible || false;

  if (typeof props.style != 'undefined'){
    attitude.style = props.style;

    if (typeof attitude.style == 'object' && Array.isArray(attitude.style)){
      attitude.style = attitude.style.reduce((total, item) => {
        return {
          ...total,
          ...item
        };
      })
    }
  }else{
    attitude.style = {};
  }

  if (typeof props.onPress != 'undefined'){
    attitude.onPress = props.onPress;
  }

  if ((typeof props.onBlur != 'undefined') || (typeof props.onModalBlur != 'undefined') || (typeof props.modalOnBlur != 'undefined') || (typeof props.onClose != 'undefined') || (typeof props.onModalClose != 'undefined') || (typeof props.modalOnClose != 'undefined')){
    attitude.onBlur = props.onBlur || props.onModalBlur || props.modalOnBlur || props.onClose || props.onModalClose || props.modalOnClose;
  }

  if ((typeof props.onProgressSuccess != 'undefined') ||(typeof props.onProgressComplete != 'undefined') ||(typeof props.onProgressDone != 'undefined') ||(typeof props.onTaskSuccess != 'undefined') ||(typeof props.onTaskComplete != 'undefined') ||(typeof props.onTaskDone != 'undefined') ||(typeof props.onDutySuccess != 'undefined') ||(typeof props.onDutyComplete != 'undefined') ||(typeof props.onDutyDone != 'undefined') ||(typeof props.onObligationSuccess != 'undefined') ||(typeof props.onObligationComplete != 'undefined') ||(typeof props.onObligationDone != 'undefined') ||(typeof props.onSuccessProgress != 'undefined') ||(typeof props.onCompleteProgress != 'undefined') ||(typeof props.onDoneProgress != 'undefined') ||(typeof props.onSuccessTask != 'undefined') ||(typeof props.onCompleteTask != 'undefined') ||(typeof props.onDoneTask != 'undefined') ||(typeof props.onSuccessDuty != 'undefined') ||(typeof props.onCompleteDuty != 'undefined') ||(typeof props.onDoneDuty != 'undefined') ||(typeof props.onSuccessObligation != 'undefined') ||(typeof props.onCompleteObligation != 'undefined') ||(typeof props.onDoneObligation != 'undefined')){
    attitude.onProgressSuccess = props.onProgressSuccess || props.onProgressComplete || props.onProgressDone || props.onTaskSuccess || props.onTaskComplete || props.onTaskDone || props.onDutySuccess || props.onDutyComplete || props.onDutyDone || props.onObligationSuccess || props.onObligationComplete || props.onObligationDone || props.onSuccessProgress || props.onCompleteProgress || props.onDoneProgress || props.onSuccessTask || props.onCompleteTask || props.onDoneTask || props.onSuccessDuty || props.onCompleteDuty || props.onDoneDuty || props.onSuccessObligation || props.onCompleteObligation || props.onDoneObligation;
  }

  attitude.language = (typeof props.language != 'undefined')? Functions._convertTokenToKeyword(props.language.key): 'en';

  if (attitude.visibility === true){
    if (
      (props.productShippingMethodsModal.shippingMethods.length === 0) &&
      (Object.keys(props.productShippingMethodsModal.selectedShippingMethod).length === 0) &&
      (props.productShippingMethodsModal.shippingMethodsLoading === false)
    ){
      props.fetchAvailableProductShippingMethods();
    }
  }

  const MODAL = {
          BACKDROP_BLUR_TYPE: "dark",
          ON_BLUR: (status) => {
            attitude.onBlur(status);
            props.resetModal();
          },
          ON_PROGRESS_SUCCESS: async (response) => attitude.onProgressSuccess(response),
          ITEMS: {
            ACTIVE_OPACITY: 0.7
          }
        };

  const _VALIDATED = _componentWillCheckValidation(props);

  var _MODAL_CONTENT;

  if (props.productShippingMethodsModal.shippingMethods.length > 0){
    const _SELECTED_INDEX = props.productShippingMethodsModal.shippingMethods.findIndex((shippingMethod, i) => {
            return shippingMethod._id === props.productShippingMethodsModal.selectedShippingMethod._id;
          }),
          _SELECTED_SHIPPING_METHOD = props.productShippingMethodsModal.selectedShippingMethod.value || '';

    let _FIRST_CAROUSEL_OTHER_OPTIONS = {},
        _ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((props.productShippingMethodsModal.shippingMethods.length > 1)? ((Platform.OS !== 'ios')? 2: 2): 2);

    if (Platform.OS !== 'ios'){
      _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';
      _FIRST_CAROUSEL_OTHER_OPTIONS.loop = true;
    }

    _MODAL_CONTENT = [
      (
        <Carousel
          name={__CONSTANTS.modalContainer.content.carousel.state.normal.title.en}
          data={props.productShippingMethodsModal.shippingMethods}
          firstItem={_SELECTED_INDEX}
          style={Styles.DetailContainer}
          itemWidth={_Screen.width - (Styles.Content.marginHorizontal * _ITEM_WIDTH_COEFFICIENT)}
          onLayout={({ item, index }) => {
            const _SHIPPING_METHOD = item.value;

            var _ITEM_GRADIENT = Global.colors.pair.ongerine;

            if (item._id === props.productShippingMethodsModal.selectedShippingMethod._id){
              _ITEM_GRADIENT = Global.colors.pair.aqrulean;
            }

            return (
              <Input
                type={__CONSTANTS.modalContainer.content.carousel.type}
                gradient={_ITEM_GRADIENT}
                style={[
                  Styles.DetailItemContainer,
                  Styles.LTR_ContentAlignment
                ]}
                disable={true}>
                  <View
                    style={Styles.DetailItemMasterInfoContent}>
                      <Text
                        style={Styles.BriefDetailTitle}>
                          {Functions._getAppropriateTaxonomyBaseOnLocale(_SHIPPING_METHOD, attitude.language)}
                      </Text>
                      <Text
                        style={Styles.BriefDetailSubtitle}>
                          {Functions._convertKeywordToToken(__CONSTANTS.modalContainer.content.carousel.state.normal.content.title[attitude.language])}
                      </Text>
                  </View>
              </Input>
            )
          }}
          onSnap={(selectedItemIndex) => props.setSelectedShippingMethod(props.productShippingMethodsModal.shippingMethods[selectedItemIndex])}
          {..._FIRST_CAROUSEL_OTHER_OPTIONS}/>
      ),
      (
        <Input
          type={__CONSTANTS.modalContainer.content.submitInput.type}
          gradient={Global.colors.pair.ongerine}
          value={`${__CONSTANTS.modalContainer.content.submitInput.prefix[attitude.language]} ${Functions._getAppropriateTaxonomyBaseOnLocale(_SELECTED_SHIPPING_METHOD, attitude.language)}`}
          style={{
            marginHorizontal: Styles.Content.marginHorizontal
          }}
          onPress={() => {
            attitude.onProgressSuccess(props.productShippingMethodsModal.selectedShippingMethod);
            MODAL.ON_BLUR(false);
          }}
          forcedDisable={_VALIDATED} />
      )
    ];
  }else{
    _MODAL_CONTENT = (
      <Link
        containerStyle={[
          Styles.Center_TextAlignment,
          Styles.Center_ContentAlignment
        ]}
        value={__CONSTANTS.modalContainer.content.carousel.state.null.title[attitude.language]} />
    );
  }

  if ((typeof _MODAL_CONTENT != 'undefined') && (Array.isArray(_MODAL_CONTENT))){
    _MODAL_CONTENT = _MODAL_CONTENT.map((item, i) => {
      return item;
    });
  }

  return (
    <Modal
      name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.title.en)}
      visible={attitude.visibility}
      backdropBlurType={MODAL.BACKDROP_BLUR_TYPE}
      onBlur={() => MODAL.ON_BLUR(false)}
      onPress={attitude.onPress}
      style={Styles.ModalContainer}
      swipeDirection="down">
        {_MODAL_CONTENT}
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductShippingMethodsModal);
