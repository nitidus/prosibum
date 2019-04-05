import React, { Component } from 'react';

import { View, TouchableOpacity, Text, Dimensions, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Modules } from '../../styles/index';
import { ActivityIndicator } from '../activity-indicator';
import { Icon } from '../icon';
import { Modal } from '../modal';
import { Input, Carousel, Link } from '../../components/index';
const Styles = Modules.Layouts.ProductFeaturesModal;

import { Functions } from '../../modules/index';
const { Preparation } = Functions;

import { Layouts as LayoutsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.ProductFeaturesModal;

import { layouts_constants } from '../../flows/knowledge/index';
const __CONSTANTS = layouts_constants.product_categories_modal;

const _componentWillCheckValidation = (props) => {
  const _PROPS = props.productFeaturesModal;

  var _FORM_FIELDS_VALIDITY = false;

  if (Object.keys(_PROPS.currentFeature).length > 0){
    switch (Functions._convertTokenToKeyword(_PROPS.currentFeature.key)) {
      case 'unit':
      default:
        if ((_PROPS.minimumOrderQuantity > 0) && (_PROPS.maximumOrderQuantity > 0)){
          const _IS_MIN_ORDER_QTY_VALID = Functions._checkIsAValidNumericOnlyField(_PROPS.minimumOrderQuantity.toString(), 2),
                _IS_MAX_ORDER_QTY_VALID = Functions._checkIsAValidNumericOnlyField(_PROPS.maximumOrderQuantity.toString(), 2);

          if (_IS_MIN_ORDER_QTY_VALID && _IS_MAX_ORDER_QTY_VALID){
            _FORM_FIELDS_VALIDITY = true;
          }
        }
        break;
      case 'quantity':
        if (_PROPS.quantity > 0){
          const _IS_QTY_VALID = Functions._checkIsAValidNumericOnlyField(_PROPS.quantity.toString(), 1);

          if (_IS_QTY_VALID){
            _FORM_FIELDS_VALIDITY = true;
          }
        }
        break;
      case 'description':
        break;
      case 'customized':
        break;
    }
  }

  return !_FORM_FIELDS_VALIDITY;
}

const ProductFeaturesModal = (props) => {
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

  if (attitude.visibility === true){
    if (
      (props.productFeaturesModal.features.length === 0) &&
      (Object.keys(props.productFeaturesModal.currentFeature).length === 0) &&
      (props.productFeaturesModal.featuresLoading === false)
    ){
      props.fetchAvailableProductFeatures();
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

  if (props.productFeaturesModal.featuresLoading === true){
    _MODAL_CONTENT = (
      <Input
        type="button"
        gradient={Global.colors.pair.ongerine}
        style={[
          Styles.DetailItemContainer,
          {
            marginHorizontal: Styles.Content.marginHorizontal
          }
        ]}
        disable={true}>
          <ActivityIndicator/>
      </Input>
    );
  }else{
    if (!props.productFeaturesModal.connected.status){
      _MODAL_CONTENT = (
        <Input
          type="button"
          style={[
            Styles.DetailItemContainer,
            {
              color: Global.colors.single.carminePink,
              marginHorizontal: Styles.Content.marginHorizontal
            }
          ]}
          value={props.wallets.connected.content}
          disable={true}/>
      );
    }else{
      if (props.productFeaturesModal.features.length > 0){
        const _SELECTED_INDEX = props.productFeaturesModal.features.findIndex((feature, i) => {
                return feature._id === props.productFeaturesModal.currentFeature._id;
              });

        _MODAL_CONTENT = [
          (
            <Carousel
              name="{__CONSTANTS.modalContainer.content.thirdHiddenTab.firstCarousel.state.normal.title.en}"
              data={props.productFeaturesModal.features}
              firstItem={_SELECTED_INDEX}
              style={Styles.DetailContainer}
              itemWidth={_Screen.width - (Styles.Content.marginHorizontal * 2)}
              onLayout={({ item, index }) => {
                var _ITEM_GRADIENT = Global.colors.pair.ongerine;

                if (index === _SELECTED_INDEX){
                  _ITEM_GRADIENT = Global.colors.pair.aqrulean;
                }

                return (
                  <Input
                    type="button"
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
                            {"Feature Type"}
                        </Text>
                    </View>
                    <View
                      style={Styles.DetailItemMasterSubInfoContent}>
                        <Icon
                          name={"grading"}
                          color={Global.colors.single.romance} />

                        <Text
                          style={Styles.BriefDetailRowText}>
                            {Functions._convertKeywordToToken(item.key)}
                        </Text>
                    </View>
                  </Input>
                )
              }}
              onSnap={(selectedItemIndex) => props.setCurrentFeature(props.productFeaturesModal.features[selectedItemIndex])}/>
          )
        ];

        switch (Functions._convertTokenToKeyword(props.productFeaturesModal.currentFeature.key)) {
          case 'unit':
          default:
          const _MIN_ORDER_QTY = (props.productFeaturesModal.minimumOrderQuantity > 0)? props.productFeaturesModal.minimumOrderQuantity: '',
                _MAX_ORDER_QTY = (props.productFeaturesModal.maximumOrderQuantity > 0)? props.productFeaturesModal.maximumOrderQuantity: '';

            _MODAL_CONTENT = [
              ..._MODAL_CONTENT,
              (
                <Input
                  type="numeric"
                  name="{Functions._convertTokenToKeyword(__CONSTANTS.content.firstInput.title.en)}"
                  placeholder="Minimum Order Quantity"
                  value={_MIN_ORDER_QTY}
                  style={[
                    Styles.RegularItemContainer,
                    {
                      marginBottom: Styles.Content.marginVertical,
                      marginHorizontal: Styles.Content.marginHorizontal
                    }
                  ]}
                  maxLength={9}
                  onChangeText={(currentValue) => props.setMinimumOrderQuantity(parseInt(currentValue))} />
              ),
              (
                <Input
                  type="numeric"
                  name="{Functions._convertTokenToKeyword(__CONSTANTS.content.firstInput.title.en)}2"
                  placeholder="Maximum Order Quantity"
                  value={_MAX_ORDER_QTY}
                  style={[
                    Styles.RegularItemContainer,
                    {
                      marginBottom: Styles.Content.marginVertical,
                      marginHorizontal: Styles.Content.marginHorizontal
                    }
                  ]}
                  maxLength={9}
                  onChangeText={(currentValue) => props.setMaximumOrderQuantity(parseInt(currentValue))} />
              )
            ];
            break;

          case 'quantity':
            const _QTY = (props.productFeaturesModal.quantity > 0)? props.productFeaturesModal.quantity: '';

            _MODAL_CONTENT.push(
              <Input
                type="numeric"
                name="{Functions._convertTokenToKeyword(__CONSTANTS.content.firstInput.title.en)}"
                placeholder="Quantity"
                value={_QTY}
                style={[
                  Styles.RegularItemContainer,
                  {
                    marginBottom: Styles.Content.marginVertical,
                    marginHorizontal: Styles.Content.marginHorizontal
                  }
                ]}
                maxLength={9}
                onChangeText={(currentValue) => props.setQuantity(parseInt(currentValue))} />
            );
            break;

          case 'description':
            _MODAL_CONTENT.push(
              <Text>{Functions._convertKeywordToToken(props.productFeaturesModal.currentFeature.key)}</Text>
            );
            break;

          case 'customized':
            _MODAL_CONTENT.push(
              <Text>{Functions._convertKeywordToToken(props.productFeaturesModal.currentFeature.key)}</Text>
            );
            break;
        }

        _MODAL_CONTENT.push(
          <Input
            type="button"
            gradient={Global.colors.pair.ongerine}
            value={`Add ${Functions._convertKeywordToToken(props.productFeaturesModal.currentFeature.key)}`}
            style={{
              marginHorizontal: Styles.Content.marginHorizontal
            }}
            onPress={() => {alert('ok')}}
            forcedDisable={_VALIDATED} />
        );
      }else{
        _MODAL_CONTENT = (
          <Link
            containerStyle={[
              Styles.Center_TextAlignment,
              Styles.Center_ContentAlignment
            ]}
            value={"There's no feature."} />
        );
      }
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductFeaturesModal);
