import React, { Component } from 'react';

import { View, TouchableOpacity, Text, Dimensions, Platform, I18nManager, Animated, Easing } from 'react-native';
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
const __CONSTANTS = layouts_constants.modals.product_features_modal;

const _componentWillCheckValidation = (props) => {
  const _PROPS = props.productFeaturesModal;

  var _FORM_FIELDS_VALIDITY = false;

  if (typeof props.units != 'undefined'){
    _FORM_FIELDS_VALIDITY = true;
  }else if (typeof props.features != 'undefined') {
    if ((_PROPS.minimumOrderQuantity > 0) && (_PROPS.maximumOrderQuantity > 0) && (_PROPS.quantity > 0)){
      const _IS_MIN_ORDER_QTY_VALID = Functions._checkIsAValidNumericOnlyField(_PROPS.minimumOrderQuantity.toString(), 2),
            _IS_MAX_ORDER_QTY_VALID = Functions._checkIsAValidNumericOnlyField(_PROPS.maximumOrderQuantity.toString(), 2),
            _IS_QTY_VALID = Functions._checkIsAValidNumericOnlyField(_PROPS.quantity.toString(), 2);

      if (_IS_MIN_ORDER_QTY_VALID && _IS_MAX_ORDER_QTY_VALID && _IS_QTY_VALID){
        if ((_PROPS.maximumOrderQuantity >= _PROPS.minimumOrderQuantity) && (_PROPS.quantity >= _PROPS.minimumOrderQuantity)){
          _FORM_FIELDS_VALIDITY = true;
        }
      }
    }
  }else{
    if (Object.keys(_PROPS.currentFeature).length > 0){
      switch (Functions._convertTokenToKeyword(_PROPS.currentFeature.key)) {
        case 'unit':
        default:
          if ((_PROPS.minimumOrderQuantity > 0) && (_PROPS.maximumOrderQuantity > 0) && (_PROPS.quantity > 0)){
            const _IS_MIN_ORDER_QTY_VALID = Functions._checkIsAValidNumericOnlyField(_PROPS.minimumOrderQuantity.toString(), 2),
                  _IS_MAX_ORDER_QTY_VALID = Functions._checkIsAValidNumericOnlyField(_PROPS.maximumOrderQuantity.toString(), 2),
                  _IS_QTY_VALID = Functions._checkIsAValidNumericOnlyField(_PROPS.quantity.toString(), 2);

            if (_IS_MIN_ORDER_QTY_VALID && _IS_MAX_ORDER_QTY_VALID && _IS_QTY_VALID){
              if ((_PROPS.maximumOrderQuantity >= _PROPS.minimumOrderQuantity) && (_PROPS.quantity >= _PROPS.minimumOrderQuantity)){
                _FORM_FIELDS_VALIDITY = true;
              }
            }
          }
          break;
        case 'description':
          if (_PROPS.description != ''){
            _FORM_FIELDS_VALIDITY = true;
          }
          break;
        case 'customized':
          if ((_PROPS.customizedFeatureName != '') && (_PROPS.customizedFeatureValue != '')){
            _FORM_FIELDS_VALIDITY = true;
          }
          break;
      }
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

  if (typeof props.units != 'undefined'){
    attitude.units = props.units;
  }

  if (typeof props.features != 'undefined'){
    attitude.features = props.features;
  }

  attitude.language = (typeof props.language != 'undefined')? Functions._convertTokenToKeyword(props.language.key): 'en';

  if (attitude.visibility === true){
    if (
      (props.productFeaturesModal.features.length === 0) &&
      (Object.keys(props.productFeaturesModal.currentFeature).length === 0) &&
      (props.productFeaturesModal.featuresLoading === false)
    ){
      if (typeof attitude.units != 'undefined'){
        if (attitude.units.length !== props.productFeaturesModal.features.length){
          props.setFeatures(attitude.units);
        }
      }else if (typeof attitude.features != 'undefined') {
        if (props.productFeaturesModal.patternBasedFeatures.length === 0){
          props.setPatternBasedFeatures(attitude.features);
        }

        props.fetchAvailableProductFeatures();
      }else{
        props.fetchAvailableProductFeatures([ 'unit' ]);
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

  if (props.productFeaturesModal.featuresLoading === true){
    _MODAL_CONTENT = (
      <Input
        type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.type}
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
          type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.type}
          style={[
            Styles.DetailItemContainer,
            {
              backgroundColor: Global.colors.single.carminePink,
              marginHorizontal: Styles.Content.marginHorizontal
            }
          ]}
          textStyle={{
            color: Global.colors.single.romance
          }}
          value={props.productFeaturesModal.connected.content}
          disable={true}/>
      );
    }else{
      if (typeof attitude.units != 'undefined'){
        if (
          (props.productFeaturesModal.units.length === 0) &&
          (Object.keys(props.productFeaturesModal.selectedUnit).length === 0) &&
          (props.productFeaturesModal.unitsLoading === false) &&
          (attitude.visibility === true)
        ){
          props.fetchAvailableProductUnits();
        }

        const _SELECTED_UNIT_INDEX = props.productFeaturesModal.units.findIndex((unit, i) => {
                return unit._id === props.productFeaturesModal.selectedUnit._id;
              }),
              _AVAILABLE_UNITS = props.productFeaturesModal.units.filter((unit, i) => {
                return props.productFeaturesModal.features.every(feature => {
                  if (typeof feature._id != 'undefined'){
                    return (feature._id !== unit._id);
                  }
                })
              });

        if (
          (_AVAILABLE_UNITS.length > 0) &&
          (Object.keys(props.productFeaturesModal.selectedUnit).length > 0) &&
          (props.productFeaturesModal.unitsLoading === false) &&
          (attitude.visibility === true)
        ){
          const _DOES_SELECTED_UNIT_EXIST = _AVAILABLE_UNITS.findIndex((unit) => {
            return (unit._id === props.productFeaturesModal.selectedUnit._id);
          })

          if (_DOES_SELECTED_UNIT_EXIST === -1){
            if (props.productFeaturesModal.selectedUnit._id !== _AVAILABLE_UNITS[0]._id){
              props.setSelectedUnit(_AVAILABLE_UNITS[0]);
            }
          }
        }

        let _FIRST_CAROUSEL_OTHER_OPTIONS = {},
            _FIRST_CAROUSEL_ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((props.productFeaturesModal.features.length > 1)? ((Platform.OS !== 'ios')? 2: 2): 2);

        if (Platform.OS !== 'ios'){
          _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';

          if (I18nManager.isRTL){
            _FIRST_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = {
              flexDirection: 'row-reverse'
            };
          }
        }

        if (_AVAILABLE_UNITS.length > 0){
          const _SELECTED_UNIT = (Object.keys(props.productFeaturesModal.selectedUnit).length > 0)? props.productFeaturesModal.selectedUnit.key: '';

          _MODAL_CONTENT = [
            (
              <Carousel
                name={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstCarousel.title.en}
                data={_AVAILABLE_UNITS}
                firstItem={_SELECTED_UNIT_INDEX}
                style={Styles.DetailContainer}
                itemWidth={_Screen.width - (Styles.Content.marginHorizontal * _FIRST_CAROUSEL_ITEM_WIDTH_COEFFICIENT)}
                onLayout={({ item, index }) => {
                  var _ITEM_GRADIENT = Global.colors.pair.ongerine;

                  if (item._id === props.productFeaturesModal.selectedUnit._id){
                    _ITEM_GRADIENT = Global.colors.pair.aqrulean;
                  }

                  return (
                    <Input
                      type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstCarousel.content.self.type}
                      gradient={_ITEM_GRADIENT}
                      style={Styles.DetailItemContainer}
                      disable={true}>
                      <View
                        style={[
                          Styles.DetailItemMasterInfoContent
                        ]}>
                          <Text
                            style={[
                              Styles.BriefDetailTitle
                            ]}>
                              {Functions._convertKeywordToToken(__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstCarousel.content.self.title[attitude.language])}
                          </Text>
                      </View>
                      <View
                        style={Styles.DetailItemMasterSubInfoContent}>
                          <Icon
                            name={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstCarousel.content.self.icon.name}
                            color={Global.colors.single.romance} />

                          <Text
                            style={[
                              Styles.BriefDetailRowText
                            ]}>
                              {Functions._getAppropriateTaxonomyBaseOnLocale(item.key, attitude.language)}
                          </Text>
                      </View>
                    </Input>
                  )
                }}
                onSnap={(selectedItemIndex) => props.setSelectedUnit(props.productFeaturesModal.units[selectedItemIndex])}
                {..._FIRST_CAROUSEL_OTHER_OPTIONS}/>
            ),
            (
              <Input
                type={__CONSTANTS.modalContainer.content.submitInput.type}
                gradient={Global.colors.pair.ongerine}
                value={`${__CONSTANTS.modalContainer.content.submitInput.prefix[attitude.language]} ${Functions._getAppropriateTaxonomyBaseOnLocale(_SELECTED_UNIT, attitude.language)}`}
                style={{
                  marginHorizontal: Styles.Content.marginHorizontal
                }}
                onPress={() => {
                  attitude.onProgressSuccess(props.productFeaturesModal.selectedUnit);

                  MODAL.ON_BLUR(false);
                }} />
            )
          ];
        }else{
          _MODAL_CONTENT = (
            <Link
              containerStyle={[
                Styles.Center_TextAlignment,
                Styles.Center_ContentAlignment
              ]}
              value={__CONSTANTS.modalContainer.content.firstCarousel.content.empty.state.unit.title[attitude.language]} />
          );
        }
      }else if (typeof attitude.features != 'undefined') {
        if (
          (props.productFeaturesModal.units.length === 0) &&
          (Object.keys(props.productFeaturesModal.selectedUnit).length === 0) &&
          (props.productFeaturesModal.unitsLoading === false) &&
          (props.productFeaturesModal.warehouses.length === 0) &&
          (Object.keys(props.productFeaturesModal.selectedWarehouse).length === 0) &&
          (props.productFeaturesModal.warehousesLoading === false) &&
          (attitude.visibility === true)
        ){
          props.fetchAvailableProductUnits();
          props.fetchAvailableProductWarehouses();
        }

        const _SELECTED_WAREHOUSE_INDEX = props.productFeaturesModal.warehouses.findIndex((warehouse, i) => {
                return warehouse._id === props.productFeaturesModal.selectedWarehouse._id;
              }),
              _AVAILABLE_WAREHOUSES = props.productFeaturesModal.warehouses,
              _SELECTED_UNIT_INDEX = props.productFeaturesModal.units.findIndex((unit, i) => {
                return unit._id === props.productFeaturesModal.selectedUnit._id;
              }),
              _AVAILABLE_UNITS = props.productFeaturesModal.units;

        if (
          (_AVAILABLE_UNITS.length > 0) &&
          (Object.keys(props.productFeaturesModal.selectedUnit).length > 0) &&
          (props.productFeaturesModal.unitsLoading === false) &&
          (attitude.visibility === true)
        ){
          const _DOES_SELECTED_UNIT_EXIST = _AVAILABLE_UNITS.findIndex((unit) => {
            return (unit._id === props.productFeaturesModal.selectedUnit._id);
          })

          if (_DOES_SELECTED_UNIT_EXIST === -1){
            if (props.productFeaturesModal.selectedUnit._id !== _AVAILABLE_UNITS[0]._id){
              props.setSelectedUnit(_AVAILABLE_UNITS[0]);
            }
          }
        }

        if (
          (_AVAILABLE_WAREHOUSES.length > 0) &&
          (Object.keys(props.productFeaturesModal.selectedWarehouse).length > 0) &&
          (props.productFeaturesModal.warehousesLoading === false) &&
          (attitude.visibility === true)
        ){
          const _DOES_SELECTED_WAREHOUSE_EXIST = _AVAILABLE_WAREHOUSES.findIndex((warehouse) => {
            return (warehouse._id === props.productFeaturesModal.selectedWarehouse._id);
          })

          if (_DOES_SELECTED_WAREHOUSE_EXIST === -1){
            if (props.productFeaturesModal.selectedWarehouse._id !== _AVAILABLE_WAREHOUSES[0]._id){
              props.setSelectedWarehouse(_AVAILABLE_WAREHOUSES[0]);
            }
          }
        }

        let _FIRST_CAROUSEL_OTHER_OPTIONS = _SECOND_CAROUSEL_OTHER_OPTIONS = {},
            _FIRST_CAROUSEL_ITEM_WIDTH_COEFFICIENT = _SECOND_CAROUSEL_ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((props.productFeaturesModal.features.length > 1)? ((Platform.OS !== 'ios')? 2: 2): 2);

        if (Platform.OS !== 'ios'){
          _FIRST_CAROUSEL_OTHER_OPTIONS.layout = _SECOND_CAROUSEL_OTHER_OPTIONS.layout = 'default';

          if (I18nManager.isRTL){
            _FIRST_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = _SECOND_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = {
              flexDirection: 'row-reverse'
            };
          }
        }

        if (_AVAILABLE_UNITS.length > 0){
          const _SELECTED_UNIT = (Object.keys(props.productFeaturesModal.selectedUnit).length > 0)? props.productFeaturesModal.selectedUnit.key: '',
                _SELECTED_WAREHOUSE = (Object.keys(props.productFeaturesModal.selectedWarehouse).length > 0)? props.productFeaturesModal.selectedWarehouse.name: '',
                _MIN_ORDER_QTY = (props.productFeaturesModal.minimumOrderQuantity > 0)? props.productFeaturesModal.minimumOrderQuantity: '',
                _MAX_ORDER_QTY = (props.productFeaturesModal.maximumOrderQuantity > 0)? props.productFeaturesModal.maximumOrderQuantity: '',
                _QTY = (props.productFeaturesModal.quantity > 0)? props.productFeaturesModal.quantity: '';

          var _FINAL_BUTTON = (
            <Input
              type={__CONSTANTS.modalContainer.content.submitInput.type}
              gradient={Global.colors.pair.ongerine}
              value={__CONSTANTS.modalContainer.content.submitInput.fullName[attitude.language]}
              style={{
                marginHorizontal: Styles.Content.marginHorizontal
              }}
              onPress={() => {
                const _FOUNDED_INDEX_OF_UNIT_FEATURE = props.productFeaturesModal.features.findIndex((singleFeature, k) => {
                  return (Functions._convertTokenToKeyword(singleFeature.key) == 'unit');
                });

                if (_FOUNDED_INDEX_OF_UNIT_FEATURE > -1){
                  attitude.onProgressSuccess({
                    _id: Functions._generateNewBSONObjectID(),
                    feature_id: props.productFeaturesModal.features[_FOUNDED_INDEX_OF_UNIT_FEATURE]._id,
                    unit: props.productFeaturesModal.selectedUnit,
                    warehouse: props.productFeaturesModal.selectedWarehouse,
                    minimum_order_quantity: props.productFeaturesModal.minimumOrderQuantity,
                    maximum_order_quantity: props.productFeaturesModal.maximumOrderQuantity,
                    quantity: props.productFeaturesModal.quantity
                  });

                  MODAL.ON_BLUR(false);
                }
              }}
              forcedDisable={_VALIDATED} />
          );

          if (_VALIDATED){
            var _MESSAGE = '';

            if ((props.productFeaturesModal.minimumOrderQuantity > 0) && (props.productFeaturesModal.maximumOrderQuantity > 0) && (props.productFeaturesModal.quantity > 0)){
              const _IS_MIN_ORDER_QTY_VALID = Functions._checkIsAValidNumericOnlyField(props.productFeaturesModal.minimumOrderQuantity.toString(), 2),
                    _IS_MAX_ORDER_QTY_VALID = Functions._checkIsAValidNumericOnlyField(props.productFeaturesModal.maximumOrderQuantity.toString(), 2),
                    _IS_QTY_VALID = Functions._checkIsAValidNumericOnlyField(props.productFeaturesModal.quantity.toString(), 2);

              if (_IS_MIN_ORDER_QTY_VALID && _IS_MAX_ORDER_QTY_VALID && _IS_QTY_VALID){
                if (props.productFeaturesModal.maximumOrderQuantity < props.productFeaturesModal.minimumOrderQuantity){
                  _MESSAGE += `${((_MESSAGE != '')? '\n': '')} ${__CONSTANTS.modalContainer.content.warning.thirdLevel.firstPart[attitude.language]}`;
                }

                if (props.productFeaturesModal.quantity < props.productFeaturesModal.minimumOrderQuantity){
                  _MESSAGE += `${((_MESSAGE != '')? '\n': '')} ${__CONSTANTS.modalContainer.content.warning.thirdLevel.secondPart[attitude.language]}`;
                }
              }else{
                let countOfMessageItem = 0;

                if (_IS_MAX_ORDER_QTY_VALID === false){
                  _MESSAGE += `${((countOfMessageItem > 0)? __CONSTANTS.modalContainer.content.warning.delimiter[attitude.language]: '')} ${__CONSTANTS.modalContainer.content.warning.secondLevel.firstPart[attitude.language]}`;
                  countOfMessageItem++;
                }

                if (_IS_MIN_ORDER_QTY_VALID === false){
                  _MESSAGE += `${((countOfMessageItem > 0)? __CONSTANTS.modalContainer.content.warning.delimiter[attitude.language]: '')} ${__CONSTANTS.modalContainer.content.warning.secondLevel.secondPart[attitude.language]}`;
                  countOfMessageItem++;
                }

                if (_IS_QTY_VALID === false){
                  _MESSAGE += `${((countOfMessageItem > 0)? __CONSTANTS.modalContainer.content.warning.delimiter[attitude.language]: '')} ${__CONSTANTS.modalContainer.content.warning.secondLevel.thirdPart[attitude.language]}`;
                  countOfMessageItem++;
                }

                if (countOfMessageItem > 1){
                  _MESSAGE += ` ${__CONSTANTS.modalContainer.content.warning.secondLevel.verbComposition.more[attitude.language]}`;
                }else{
                  _MESSAGE += ` ${__CONSTANTS.modalContainer.content.warning.secondLevel.verbComposition.one[attitude.language]}`;
                }
              }
            }else{
              let countOfMessageItem = 0;

              if (props.productFeaturesModal.maximumOrderQuantity === 0){
                _MESSAGE += `${((countOfMessageItem > 0)? __CONSTANTS.modalContainer.content.warning.delimiter[attitude.language]: '')} ${__CONSTANTS.modalContainer.content.warning.firstLevel.firstPart[attitude.language]}`;
                countOfMessageItem++;
              }

              if (props.productFeaturesModal.minimumOrderQuantity === 0){
                _MESSAGE += `${((countOfMessageItem > 0)? __CONSTANTS.modalContainer.content.warning.delimiter[attitude.language]: '')} ${__CONSTANTS.modalContainer.content.warning.firstLevel.secondPart[attitude.language]}`;
                countOfMessageItem++;
              }

              if (props.productFeaturesModal.quantity === 0){
                _MESSAGE += `${((countOfMessageItem > 0)? __CONSTANTS.modalContainer.content.warning.delimiter[attitude.language]: '')} ${__CONSTANTS.modalContainer.content.warning.firstLevel.thirdPart[attitude.language]}`;
                countOfMessageItem++;
              }

              if (countOfMessageItem > 1){
                _MESSAGE += ` ${__CONSTANTS.modalContainer.content.warning.firstLevel.verbComposition.more[attitude.language]}`;
              }else{
                _MESSAGE += ` ${__CONSTANTS.modalContainer.content.warning.firstLevel.verbComposition.one[attitude.language]}`;
              }
            }

            if (_MESSAGE != ''){
              _FINAL_BUTTON = (
                <Input
                  type={__CONSTANTS.modalContainer.content.submitInput.type}
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

          _MODAL_CONTENT = [
            (
              <Carousel
                name={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstCarousel.title.en}
                data={_AVAILABLE_UNITS}
                firstItem={_SELECTED_UNIT_INDEX}
                style={Styles.DetailContainer}
                contentContainerCustomStyle={{
                  flexDirection: 'row-reverse'
                }}
                itemWidth={_Screen.width - (Styles.Content.marginHorizontal * _FIRST_CAROUSEL_ITEM_WIDTH_COEFFICIENT)}
                onLayout={({ item, index }) => {
                  var _ITEM_GRADIENT = Global.colors.pair.ongerine;

                  if (item._id === props.productFeaturesModal.selectedUnit._id){
                    _ITEM_GRADIENT = Global.colors.pair.aqrulean;
                  }

                  return (
                    <Input
                      type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstCarousel.content.self.type}
                      gradient={_ITEM_GRADIENT}
                      style={Styles.DetailItemContainer}
                      disable={true}>
                      <View
                        style={[
                          Styles.DetailItemMasterInfoContent
                        ]}>
                          <Text
                            style={[
                              Styles.BriefDetailTitle
                            ]}>
                              {Functions._convertKeywordToToken(__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstCarousel.content.self.title[attitude.language])}
                          </Text>
                      </View>
                      <View
                        style={Styles.DetailItemMasterSubInfoContent}>
                          <Icon
                            name={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstCarousel.content.self.icon.name}
                            color={Global.colors.single.romance} />

                          <Text
                            style={[
                              Styles.BriefDetailRowText
                            ]}>
                              {Functions._getAppropriateTaxonomyBaseOnLocale(item.key, attitude.language)}
                          </Text>
                      </View>
                    </Input>
                  )
                }}
                onSnap={(selectedItemIndex) => props.setSelectedUnit(props.productFeaturesModal.units[selectedItemIndex])}
                {..._FIRST_CAROUSEL_OTHER_OPTIONS}/>
            ),
            (
              <Carousel
                name={__CONSTANTS.modalContainer.content.secondCarousel.content.self.context.firstCarousel.title.en}
                data={_AVAILABLE_WAREHOUSES}
                firstItem={_SELECTED_WAREHOUSE_INDEX}
                style={Styles.DetailContainer}
                contentContainerCustomStyle={{
                  flexDirection: 'row-reverse'
                }}
                itemWidth={_Screen.width - (Styles.Content.marginHorizontal * _SECOND_CAROUSEL_ITEM_WIDTH_COEFFICIENT)}
                onLayout={({ item, index }) => {
                  var _ITEM_GRADIENT = Global.colors.pair.ongerine;

                  if (item._id === props.productFeaturesModal.selectedWarehouse._id){
                    _ITEM_GRADIENT = Global.colors.pair.aqrulean;
                  }

                  return (
                    <Input
                      type={__CONSTANTS.modalContainer.content.secondCarousel.content.self.context.firstCarousel.content.self.type}
                      gradient={_ITEM_GRADIENT}
                      style={Styles.DetailItemContainer}
                      disable={true}>
                      <View
                        style={[
                          Styles.DetailItemMasterInfoContent
                        ]}>
                          <Text
                            style={[
                              Styles.BriefDetailTitle
                            ]}>
                              {Functions._convertKeywordToToken(__CONSTANTS.modalContainer.content.secondCarousel.content.self.context.firstCarousel.content.self.title[attitude.language])}
                          </Text>
                      </View>
                      <View
                        style={Styles.DetailItemMasterSubInfoContent}>
                          <Icon
                            name={__CONSTANTS.modalContainer.content.secondCarousel.content.self.context.firstCarousel.content.self.icon.name}
                            color={Global.colors.single.romance} />

                          <Text
                            style={[
                              Styles.BriefDetailRowText
                            ]}>
                              {item.name}
                          </Text>
                      </View>
                    </Input>
                  )
                }}
                onSnap={(selectedItemIndex) => props.setSelectedWarehouse(props.productFeaturesModal.warehouses[selectedItemIndex])}
                {..._SECOND_CAROUSEL_OTHER_OPTIONS}/>
            ),
            (
              <Input
                type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstInput.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstInput.title.en)}
                placeholder={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstInput.title[attitude.language]}
                value={_MIN_ORDER_QTY}
                style={[
                  Styles.RegularItemContainer,
                  {
                    marginBottom: Styles.Content.marginVertical,
                    marginHorizontal: Styles.Content.marginHorizontal
                  }
                ]}
                onChangeText={(currentValue) => props.setMinimumOrderQuantity(parseInt(currentValue))}
                {...__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstInput.options} />
            ),
            (
              <Input
                type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.secondInput.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.secondInput.title.en)}
                placeholder={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.secondInput.title[attitude.language]}
                value={_MAX_ORDER_QTY}
                style={[
                  Styles.RegularItemContainer,
                  {
                    marginBottom: Styles.Content.marginVertical,
                    marginHorizontal: Styles.Content.marginHorizontal
                  }
                ]}
                onChangeText={(currentValue) => props.setMaximumOrderQuantity(parseInt(currentValue))}
                {...__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.secondInput.options} />
            ),
            (
              <Input
                  type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.thirdInput.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.thirdInput.title.en)}
                  placeholder={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.thirdInput.title[attitude.language]}
                  value={_QTY}
                  style={[
                    Styles.RegularItemContainer,
                    {
                      marginBottom: Styles.Content.marginVertical,
                      marginHorizontal: Styles.Content.marginHorizontal
                    }
                  ]}
                  onChangeText={(currentValue) => props.setQuantity(parseInt(currentValue))}
                  {...__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.thirdInput.options} />
            ),
            _FINAL_BUTTON
          ];
        }else{
          _MODAL_CONTENT = (
            <Link
              containerStyle={[
                Styles.Center_TextAlignment,
                Styles.Center_ContentAlignment
              ]}
              value={__CONSTANTS.modalContainer.content.firstCarousel.content.empty.state.unit.title[attitude.language]} />
          );
        }
      }else{
        if (props.productFeaturesModal.features.length > 0){
          const _SELECTED_INDEX = props.productFeaturesModal.features.findIndex((feature, i) => {
                  return feature._id === props.productFeaturesModal.currentFeature._id;
                });

          let _FIRST_CAROUSEL_OTHER_OPTIONS = {},
              _FIRST_CAROUSEL_ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((props.productFeaturesModal.features.length > 1)? ((Platform.OS !== 'ios')? 2: 2): 2);

          if (Platform.OS !== 'ios'){
            _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';

            if (I18nManager.isRTL){
              _FIRST_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = {
                flexDirection: 'row-reverse'
              };
            }
          }

          _MODAL_CONTENT = [
            (
              <Carousel
                name={__CONSTANTS.modalContainer.content.firstCarousel.content.self.type}
                data={props.productFeaturesModal.features}
                firstItem={_SELECTED_INDEX}
                style={Styles.DetailContainer}
                contentContainerCustomStyle={{
                  flexDirection: 'row-reverse'
                }}
                itemWidth={_Screen.width - (Styles.Content.marginHorizontal * _FIRST_CAROUSEL_ITEM_WIDTH_COEFFICIENT)}
                onLayout={({ item, index }) => {
                  var _ITEM_GRADIENT = Global.colors.pair.ongerine;

                  if (item._id === props.productFeaturesModal.currentFeature._id){
                    _ITEM_GRADIENT = Global.colors.pair.aqrulean;
                  }

                  return (
                    <Input
                      type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.type}
                      gradient={_ITEM_GRADIENT}
                      style={[
                        Styles.DetailItemContainer
                      ]}
                      disable={true}>
                        <View
                          style={Styles.DetailItemMasterInfoContent}>
                            <Text
                              style={Styles.BriefDetailTitle}>
                                {Functions._convertKeywordToToken(__CONSTANTS.modalContainer.content.firstCarousel.content.self.title[attitude.language])}
                            </Text>
                        </View>
                        <View
                          style={Styles.DetailItemMasterSubInfoContent}>
                            <Icon
                              name={__CONSTANTS.modalContainer.content.firstCarousel.content.self.icon.name}
                              color={Global.colors.single.romance} />

                            <Text
                              style={Styles.BriefDetailRowText}>
                                {Functions._getAppropriateTaxonomyBaseOnLocale(item.key, attitude.language)}
                            </Text>
                        </View>
                    </Input>
                  )
                }}
                onSnap={(selectedItemIndex) => {
                  props.setCurrentFeature(props.productFeaturesModal.features[selectedItemIndex]);
                  props.resetModalIndependly();
                }}
                {..._FIRST_CAROUSEL_OTHER_OPTIONS}/>
            )
          ];

          var _IS_ALL_EXTRA_DEPENDED_FIELDS_PREPARED = false;

          switch (Functions._convertTokenToKeyword(props.productFeaturesModal.currentFeature.key)) {
            case 'unit':
            default:
              if (
                (props.productFeaturesModal.units.length === 0) &&
                (Object.keys(props.productFeaturesModal.selectedUnit).length === 0) &&
                (props.productFeaturesModal.unitsLoading === false)
              ){
                props.fetchAvailableProductUnits();
              }

              if (props.productFeaturesModal.unitsLoading === true){
                _MODAL_CONTENT.push(
                  <Input
                    type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstCarousel.content.self.type}
                    gradient={Global.colors.pair.ongerine}
                    style={[
                      Styles.DetailItemContainer,
                      {
                        marginBottom: Styles.Content.marginVertical,
                        marginHorizontal: Styles.Content.marginHorizontal
                      }
                    ]}
                    disable={true}>
                      <ActivityIndicator/>
                  </Input>
                );
              }else{
                if (!props.productFeaturesModal.connected.status){
                  _MODAL_CONTENT.push(
                    <Input
                      type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstCarousel.content.self.type}
                      style={[
                        Styles.DetailItemContainer,
                        {
                          backgroundColor: Global.colors.single.carminePink,
                          marginHorizontal: Styles.Content.marginHorizontal
                        }
                      ]}
                      textStyle={{
                        color: Global.colors.single.romance
                      }}
                      value={props.productFeaturesModal.connected.content}
                      disable={true}/>
                  );
                }else{
                  if (props.productFeaturesModal.units.length > 0){
                    const _MIN_ORDER_QTY = (props.productFeaturesModal.minimumOrderQuantity > 0)? props.productFeaturesModal.minimumOrderQuantity: '',
                          _MAX_ORDER_QTY = (props.productFeaturesModal.maximumOrderQuantity > 0)? props.productFeaturesModal.maximumOrderQuantity: '',
                          _QTY = (props.productFeaturesModal.quantity > 0)? props.productFeaturesModal.quantity: '',
                          _SELECTED_UNIT_INDEX = props.productFeaturesModal.units.findIndex((unit, i) => {
                            return unit._id === props.productFeaturesModal.selectedUnit._id;
                          });

                    let _SECOND_CAROUSEL_OTHER_OPTIONS = {},
                        _SECOND_CAROUSEL_ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((props.productFeaturesModal.units.length > 1)? ((Platform.OS !== 'ios')? 2: 2): 2);

                    if (Platform.OS !== 'ios'){
                      _SECOND_CAROUSEL_OTHER_OPTIONS.layout = 'default';

                      if (I18nManager.isRTL){
                        _SECOND_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = {
                          flexDirection: 'row-reverse'
                        };
                      }
                    }

                    _MODAL_CONTENT = [
                      ..._MODAL_CONTENT,
                      (
                        <Carousel
                          name={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstCarousel.title.en}
                          data={props.productFeaturesModal.units}
                          firstItem={_SELECTED_UNIT_INDEX}
                          style={Styles.DetailContainer}
                          contentContainerCustomStyle={{
                            flexDirection: 'row-reverse'
                          }}
                          itemWidth={_Screen.width - (Styles.Content.marginHorizontal * _SECOND_CAROUSEL_ITEM_WIDTH_COEFFICIENT)}
                          onLayout={({ item, index }) => {
                            var _ITEM_GRADIENT = Global.colors.pair.ongerine;

                            if (item._id === props.productFeaturesModal.selectedUnit._id){
                              _ITEM_GRADIENT = Global.colors.pair.aqrulean;
                            }

                            return (
                              <Input
                                type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstCarousel.content.self.type}
                                gradient={_ITEM_GRADIENT}
                                style={Styles.DetailItemContainer}
                                disable={true}>
                                <View
                                  style={[
                                    Styles.DetailItemMasterInfoContent
                                  ]}>
                                    <Text
                                      style={[
                                        Styles.BriefDetailTitle
                                      ]}>
                                        {Functions._convertKeywordToToken(__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstCarousel.content.self.title[attitude.language])}
                                    </Text>
                                </View>
                                <View
                                  style={Styles.DetailItemMasterSubInfoContent}>
                                    <Icon
                                      name={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstCarousel.content.self.icon.name}
                                      color={Global.colors.single.romance} />

                                    <Text
                                      style={[
                                        Styles.BriefDetailRowText
                                      ]}>
                                        {Functions._getAppropriateTaxonomyBaseOnLocale(item.key, attitude.language)}
                                    </Text>
                                </View>
                              </Input>
                            )
                          }}
                          onSnap={(selectedItemIndex) => props.setSelectedUnit(props.productFeaturesModal.units[selectedItemIndex])}
                          {..._SECOND_CAROUSEL_OTHER_OPTIONS}/>
                      ),
                      (
                        <Input
                          type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstInput.type}
                          name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstInput.title.en)}
                          placeholder={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstInput.title[attitude.language]}
                          value={_MIN_ORDER_QTY}
                          style={[
                            Styles.RegularItemContainer,
                            {
                              marginBottom: Styles.Content.marginVertical,
                              marginHorizontal: Styles.Content.marginHorizontal
                            }
                          ]}
                          onChangeText={(currentValue) => props.setMinimumOrderQuantity(parseInt(currentValue))}
                          {...__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstInput.options} />
                      ),
                      (
                        <Input
                          type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.secondInput.type}
                          name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.secondInput.title.en)}
                          placeholder={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.secondInput.title[attitude.language]}
                          value={_MAX_ORDER_QTY}
                          style={[
                            Styles.RegularItemContainer,
                            {
                              marginBottom: Styles.Content.marginVertical,
                              marginHorizontal: Styles.Content.marginHorizontal
                            }
                          ]}
                          onChangeText={(currentValue) => props.setMaximumOrderQuantity(parseInt(currentValue))}
                          {...__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.secondInput.options} />
                      ),
                      (
                        <Input
                            type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.thirdInput.type}
                            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.thirdInput.title.en)}
                            placeholder={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.thirdInput.title[attitude.language]}
                            value={_QTY}
                            style={[
                              Styles.RegularItemContainer,
                              {
                                marginBottom: Styles.Content.marginVertical,
                                marginHorizontal: Styles.Content.marginHorizontal
                              }
                            ]}
                            onChangeText={(currentValue) => props.setQuantity(parseInt(currentValue))}
                            {...__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.thirdInput.options} />
                      )
                    ];

                    _IS_ALL_EXTRA_DEPENDED_FIELDS_PREPARED = true;
                  }else{
                    _MODAL_CONTENT.push(
                      <Link
                        containerStyle={[
                          Styles.Center_TextAlignment,
                          Styles.Center_ContentAlignment,
                          {
                            marginBottom: Styles.Content.marginVertical
                          }
                        ]}
                        value={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.unit.firstCarousel.content.empty.title[attitude.language]} />
                    );
                  }
                }
              }
              break;

            case 'description':
              _MODAL_CONTENT.push(
                <Input
                    type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.description.firstInput.type}
                    name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.description.firstInput.title.en)}
                    placeholder={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.description.firstInput.title[attitude.language]}
                    value={props.productFeaturesModal.description}
                    style={[
                      Styles.RegularItemContainer,
                      {
                        marginBottom: Styles.Content.marginVertical,
                        marginHorizontal: Styles.Content.marginHorizontal
                      }
                    ]}
                    onChangeText={(currentValue) => props.setDescription(currentValue)}
                    {...__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.description.firstInput.options} />
              );

              _IS_ALL_EXTRA_DEPENDED_FIELDS_PREPARED = true;
              break;

            case 'customized':
              _MODAL_CONTENT = [
                ..._MODAL_CONTENT,
                (
                  <Input
                      type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.customized.firstInput.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.customized.firstInput.title.en)}
                      placeholder={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.customized.firstInput.title[attitude.language]}
                      value={props.productFeaturesModal.customizedFeatureName}
                      style={[
                        Styles.RegularItemContainer,
                        {
                          marginBottom: Styles.Content.marginVertical,
                          marginHorizontal: Styles.Content.marginHorizontal
                        }
                      ]}
                      onChangeText={(currentValue) => props.setCustomizedFeatureName(currentValue)} />
                ),
                (
                  <Input
                      type={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.customized.secondInput.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.customized.secondInput.title.en)}
                      placeholder={__CONSTANTS.modalContainer.content.firstCarousel.content.self.context.customized.secondInput.title[attitude.language]}
                      value={props.productFeaturesModal.customizedFeatureValue}
                      style={[
                        Styles.RegularItemContainer,
                        {
                          marginBottom: Styles.Content.marginVertical,
                          marginHorizontal: Styles.Content.marginHorizontal
                        }
                      ]}
                      onChangeText={(currentValue) => props.setCustomizedFeatureValue(currentValue)} />
                )
              ];

              _IS_ALL_EXTRA_DEPENDED_FIELDS_PREPARED = true;
              break;
          }

          if (_IS_ALL_EXTRA_DEPENDED_FIELDS_PREPARED){
            var _FINAL_BUTTON = (
              <Input
                type={__CONSTANTS.modalContainer.content.submitInput.type}
                gradient={Global.colors.pair.ongerine}
                value={`${__CONSTANTS.modalContainer.content.submitInput.prefix[attitude.language]} ${Functions._getAppropriateTaxonomyBaseOnLocale(props.productFeaturesModal.currentFeature.key, attitude.language)}`}
                style={{
                  marginHorizontal: Styles.Content.marginHorizontal
                }}
                onPress={() => {
                  var _RESPONSE = {
                    feature: props.productFeaturesModal.currentFeature
                  };

                  switch (Functions._convertTokenToKeyword(props.productFeaturesModal.currentFeature.key)) {
                    case 'unit':
                    default:
                      _RESPONSE = {
                        ..._RESPONSE,
                        unit: props.productFeaturesModal.selectedUnit,
                        minimumOrderQuantity: props.productFeaturesModal.minimumOrderQuantity,
                        maximumOrderQuantity: props.productFeaturesModal.maximumOrderQuantity,
                        quantity: props.productFeaturesModal.quantity
                      };
                      break;
                    case 'description':
                      _RESPONSE.description = props.productFeaturesModal.description;
                      break;
                    case 'customized':
                      _RESPONSE = {
                        ..._RESPONSE,
                        featureName: props.productFeaturesModal.customizedFeatureName,
                        featureValue: props.productFeaturesModal.customizedFeatureValue
                      };
                      break;
                  }

                  attitude.onProgressSuccess(_RESPONSE);
                  MODAL.ON_BLUR(false);
                }}
                forcedDisable={_VALIDATED} />
            );

            if (_VALIDATED){
              var _MESSAGE = '';

              switch (Functions._convertTokenToKeyword(props.productFeaturesModal.currentFeature.key)) {
                case 'unit':
                default:
                  if ((props.productFeaturesModal.minimumOrderQuantity > 0) && (props.productFeaturesModal.maximumOrderQuantity > 0) && (props.productFeaturesModal.quantity > 0)){
                    const _IS_MIN_ORDER_QTY_VALID = Functions._checkIsAValidNumericOnlyField(props.productFeaturesModal.minimumOrderQuantity.toString(), 2),
                          _IS_MAX_ORDER_QTY_VALID = Functions._checkIsAValidNumericOnlyField(props.productFeaturesModal.maximumOrderQuantity.toString(), 2),
                          _IS_QTY_VALID = Functions._checkIsAValidNumericOnlyField(props.productFeaturesModal.quantity.toString(), 2);

                    if (_IS_MIN_ORDER_QTY_VALID && _IS_MAX_ORDER_QTY_VALID && _IS_QTY_VALID){
                      if (props.productFeaturesModal.maximumOrderQuantity < props.productFeaturesModal.minimumOrderQuantity){
                        _MESSAGE += `${((_MESSAGE != '')? '\n': '')} ${__CONSTANTS.modalContainer.content.warning.thirdLevel.firstPart[attitude.language]}`;
                      }

                      if (props.productFeaturesModal.quantity < props.productFeaturesModal.minimumOrderQuantity){
                        _MESSAGE += `${((_MESSAGE != '')? '\n': '')} ${__CONSTANTS.modalContainer.content.warning.thirdLevel.secondPart[attitude.language]}`;
                      }
                    }else{
                      let countOfMessageItem = 0;

                      if (_IS_MAX_ORDER_QTY_VALID === false){
                        _MESSAGE += `${((countOfMessageItem > 0)? __CONSTANTS.modalContainer.content.warning.delimiter[attitude.language]: '')} ${__CONSTANTS.modalContainer.content.warning.secondLevel.firstPart[attitude.language]}`;
                        countOfMessageItem++;
                      }

                      if (_IS_MIN_ORDER_QTY_VALID === false){
                        _MESSAGE += `${((countOfMessageItem > 0)? __CONSTANTS.modalContainer.content.warning.delimiter[attitude.language]: '')} ${__CONSTANTS.modalContainer.content.warning.secondLevel.secondPart[attitude.language]}`;
                        countOfMessageItem++;
                      }

                      if (_IS_QTY_VALID === false){
                        _MESSAGE += `${((countOfMessageItem > 0)? __CONSTANTS.modalContainer.content.warning.delimiter[attitude.language]: '')} ${__CONSTANTS.modalContainer.content.warning.secondLevel.thirdPart[attitude.language]}`;
                        countOfMessageItem++;
                      }

                      if (countOfMessageItem > 1){
                        _MESSAGE += ` ${__CONSTANTS.modalContainer.content.warning.secondLevel.verbComposition.more[attitude.language]}`;
                      }else{
                        _MESSAGE += ` ${__CONSTANTS.modalContainer.content.warning.secondLevel.verbComposition.one[attitude.language]}`;
                      }
                    }
                  }else{
                    let countOfMessageItem = 0;

                    if (props.productFeaturesModal.maximumOrderQuantity === 0){
                      _MESSAGE += `${((countOfMessageItem > 0)? __CONSTANTS.modalContainer.content.warning.delimiter[attitude.language]: '')} ${__CONSTANTS.modalContainer.content.warning.firstLevel.firstPart[attitude.language]}`;
                      countOfMessageItem++;
                    }

                    if (props.productFeaturesModal.minimumOrderQuantity === 0){
                      _MESSAGE += `${((countOfMessageItem > 0)? __CONSTANTS.modalContainer.content.warning.delimiter[attitude.language]: '')} ${__CONSTANTS.modalContainer.content.warning.firstLevel.secondPart[attitude.language]}`;
                      countOfMessageItem++;
                    }

                    if (props.productFeaturesModal.quantity === 0){
                      _MESSAGE += `${((countOfMessageItem > 0)? __CONSTANTS.modalContainer.content.warning.delimiter[attitude.language]: '')} ${__CONSTANTS.modalContainer.content.warning.firstLevel.thirdPart[attitude.language]}`;
                      countOfMessageItem++;
                    }

                    if (countOfMessageItem > 1){
                      _MESSAGE += ` ${__CONSTANTS.modalContainer.content.warning.firstLevel.verbComposition.more[attitude.language]}`;
                    }else{
                      _MESSAGE += ` ${__CONSTANTS.modalContainer.content.warning.firstLevel.verbComposition.one[attitude.language]}`;
                    }
                  }
                  break;
                case 'description':
                  if (props.productFeaturesModal.description == ''){
                    _MESSAGE += __CONSTANTS.modalContainer.content.warning.fourthLevel[attitude.language];
                  }
                  break;
                case 'customized':
                  let countOfMessageItem = 0;

                  if (props.productFeaturesModal.customizedFeatureName == ''){
                    _MESSAGE += `${((countOfMessageItem > 0)? __CONSTANTS.modalContainer.content.warning.delimiter[attitude.language]: '')} ${__CONSTANTS.modalContainer.content.warning.fifthLevel.firstPart[attitude.language]}`;
                    countOfMessageItem++;
                  }

                  if (props.productFeaturesModal.customizedFeatureValue == ''){
                    _MESSAGE += `${((countOfMessageItem > 0)? __CONSTANTS.modalContainer.content.warning.delimiter[attitude.language]: '')} ${__CONSTANTS.modalContainer.content.warning.fifthLevel.secondPart[attitude.language]}`;
                    countOfMessageItem++;
                  }

                  _MESSAGE = _MESSAGE.replace(__CONSTANTS.modalContainer.content.warning.delimiter[attitude.language], ` ${__CONSTANTS.modalContainer.content.warning.finalDelimiter[attitude.language]}`);

                  if (countOfMessageItem > 1){
                    _MESSAGE += ` ${__CONSTANTS.modalContainer.content.warning.fifthLevel.verbComposition.more[attitude.language]}`;
                  }else{
                    _MESSAGE += ` ${__CONSTANTS.modalContainer.content.warning.fifthLevel.verbComposition.one[attitude.language]}`;
                  }
                  break;
              }

              if (_MESSAGE != ''){
                _FINAL_BUTTON = (
                  <Input
                    type={__CONSTANTS.modalContainer.content.submitInput.type}
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

            _MODAL_CONTENT.push(_FINAL_BUTTON);
          }
        }else{
          _MODAL_CONTENT = (
            <Link
              containerStyle={[
                Styles.Center_TextAlignment,
                Styles.Center_ContentAlignment
              ]}
              value={__CONSTANTS.modalContainer.content.firstCarousel.content.empty.state.complex.title[attitude.language]} />
          );
        }
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
