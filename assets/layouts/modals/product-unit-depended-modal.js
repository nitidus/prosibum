import React, { Component } from 'react';

import { View, TouchableOpacity, Text, Dimensions, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Modules } from '../../styles/index';
import { ActivityIndicator } from '../activity-indicator';
import { Icon } from '../icon';
import { Modal } from '../modal';
import { Input, Carousel, Link } from '../../components/index';
const Styles = Modules.Layouts.ProductUnitDependedModal;

import { Functions } from '../../modules/index';
const { Preparation } = Functions;

import { Layouts as LayoutsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.ProductUnitDependedModal;

import { layouts_constants } from '../../flows/knowledge/index';
const __CONSTANTS = layouts_constants.modals.product_unit_depended_modal;

const _componentWillCheckValidation = (props) => {
  const _PROPS = props.productUnitDependedModal;

  var _FORM_FIELDS_VALIDITY = false;

  if ((_PROPS.units.length > 0) && (Object.keys(_PROPS.selectedUnit).length > 0)){
    _FORM_FIELDS_VALIDITY = true;
  }

  return !_FORM_FIELDS_VALIDITY;
}

const ProductUnitDependedModal = (props) => {
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
      (props.productUnitDependedModal.units.length === 0) &&
      (Object.keys(props.productUnitDependedModal.selectedUnit).length === 0)
    ){
      if ((typeof props.data != 'undefined') || (typeof props.dataSource != 'undefined') || (typeof props.data_source != 'undefined') || (typeof props.source != 'undefined') || (typeof props.units != 'undefined')){
        attitude.data = props.data || props.dataSource || props.data_source || props.source || props.units;

        props.setUnits(attitude.data);

        if (attitude.data.length > 0){
          props.setSelectedUnit(attitude.data[0]);
        }else{
          props.setSelectedUnit({});
        }
      }
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

  if (props.productUnitDependedModal.units.length > 0){
    const _SELECTED_INDEX = props.productUnitDependedModal.units.findIndex((unit, i) => {
            return unit._id === props.productUnitDependedModal.selectedUnit._id;
          });

      _MODAL_CONTENT = [
        (
          <Carousel
            name={__CONSTANTS.modalContainer.content.carousel.state.normal.title.en}
            data={props.productUnitDependedModal.units}
            firstItem={_SELECTED_INDEX}
            style={Styles.DetailContainer}
            itemWidth={_Screen.width - (Styles.Content.marginHorizontal * 2)}
            onLayout={({ item, index }) => {
              const _UNIT = item.unit,
                    _MIN_ORDER_QTY = (item.minimumOrderQuantity > 0)? item.minimumOrderQuantity: '',
                    _MAX_ORDER_QTY = (item.maximumOrderQuantity > 0)? item.maximumOrderQuantity: '',
                    _QTY = (item.quantity > 0)? item.quantity: '';

              var _ITEM_GRADIENT = Global.colors.pair.ongerine;

              if (index === _SELECTED_INDEX){
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
                        <View
                          style={Styles.BriefDetailTitleContainer}>
                          <Text
                            style={Styles.BriefDetailTitle}>
                              {Functions._getAppropriateTaxonomyBaseOnLocale(_UNIT.key, attitude.language)}
                          </Text>
                          <Text
                            style={Styles.BriefDetailTitleSuffix}>
                              {Functions._convertKeywordToToken(__CONSTANTS.modalContainer.content.carousel.state.normal.content.title.suffix[attitude.language])}
                          </Text>
                        </View>
                    </View>
                    <View
                      style={[
                        Styles.DetailItemMasterSubInfoContent,
                        {
                          marginBottom: Styles.Content.marginVertical
                        }
                      ]}>
                        <Icon
                          name={__CONSTANTS.modalContainer.content.carousel.state.normal.content.firstFeature.icon.name}
                          color={Global.colors.single.romance} />

                        <Text
                          style={Styles.BriefDetailRowText}>
                            {Functions._convertNumberToHumanReadableFormat(item.minimumOrderQuantity)} {Functions._convertKeywordToToken(__CONSTANTS.modalContainer.content.carousel.state.normal.content.firstFeature.title[attitude.language])}
                        </Text>
                    </View>
                    <View
                      style={[
                        Styles.DetailItemMasterSubInfoContent,
                        {
                          marginBottom: Styles.Content.marginVertical
                        }
                      ]}>
                        <Icon
                          name={__CONSTANTS.modalContainer.content.carousel.state.normal.content.secondFeature.icon.name}
                          color={Global.colors.single.romance} />

                        <Text
                          style={Styles.BriefDetailRowText}>
                            {Functions._convertNumberToHumanReadableFormat(item.maximumOrderQuantity)} {Functions._convertKeywordToToken(__CONSTANTS.modalContainer.content.carousel.state.normal.content.secondFeature.title[attitude.language])}
                        </Text>
                    </View>
                    <View
                      style={Styles.DetailItemMasterSubInfoContent}>
                        <Icon
                          name={__CONSTANTS.modalContainer.content.carousel.state.normal.content.thirdFeature.icon.name}
                          color={Global.colors.single.romance} />

                        <Text
                          style={Styles.BriefDetailRowText}>
                            {Functions._convertNumberToHumanReadableFormat(item.quantity)} {Functions._convertKeywordToToken(__CONSTANTS.modalContainer.content.carousel.state.normal.content.thirdFeature.title[attitude.language])}
                        </Text>
                    </View>
                </Input>
              )
            }}
            onSnap={(selectedItemIndex) => props.setSelectedUnit(props.productUnitDependedModal.units[selectedItemIndex])}/>
        ),
        (
          <Input
            type={__CONSTANTS.modalContainer.content.submitInput.type}
            gradient={Global.colors.pair.ongerine}
            value={`${__CONSTANTS.modalContainer.content.submitInput.prefix[attitude.language]} ${Functions._getAppropriateTaxonomyBaseOnLocale(props.productUnitDependedModal.selectedUnit.unit.key, attitude.language)} ${__CONSTANTS.modalContainer.content.submitInput.suffix[attitude.language]}`}
            style={{
              marginHorizontal: Styles.Content.marginHorizontal
            }}
            onPress={() => {
              attitude.onProgressSuccess(props.productUnitDependedModal.selectedUnit);
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductUnitDependedModal);
