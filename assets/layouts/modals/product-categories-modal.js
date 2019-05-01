import React, { Component } from 'react';

import { View, TouchableOpacity, Text, Dimensions, Platform, I18nManager, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Modules } from '../../styles/index';
import { ActivityIndicator } from '../activity-indicator';
import { Icon } from '../icon';
import { Modal } from '../modal';
import List from '../list';
import { Input, Carousel, Link } from '../../components/index';
const Styles = Modules.Layouts.ProductCategoriesModal;

import { Functions } from '../../modules/index';
const { Preparation } = Functions;

import { Layouts as LayoutsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.ProductCategoriesModal;

import { layouts_constants } from '../../flows/knowledge/index';
const __CONSTANTS = layouts_constants.modals.product_categories_modal;

const _componentWillCheckValidation = (props) => {
  const _PROPS = props.productCategoriesModal;

  var _FORM_FIELDS_VALIDITY = false;

  if (_PROPS.isAddingMode === true){
    switch (_PROPS.currentHiddenTabIndex) {
      case 1:
        if (_PROPS.newCategoryName != ''){
          _FORM_FIELDS_VALIDITY = true;
        }
        break;
      case 0:
      default:
        _FORM_FIELDS_VALIDITY = true;
        break;
    }
  }else{
    if (Object.keys(_PROPS.currentCategory).length > 0){
      if (_PROPS.currentCategory.key != ''){
        _FORM_FIELDS_VALIDITY = true;
      }
    }
  }

  return !_FORM_FIELDS_VALIDITY;
}

const ProductCategoriesModal = (props) => {
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

  attitude.isAddModeOn = (typeof (props.isAddModeOn || props.addModeOn || props.isAddingModeOn || props.addingModeOn || props.isAdding || props.addMode) != 'undefined')? true: false;

  attitude.language = (typeof props.language != 'undefined')? Functions._convertTokenToKeyword(props.language.key): 'en';

  if (attitude.visibility === true){
    if (
      (props.productCategoriesModal.categories.length === 0) &&
      (Object.keys(props.productCategoriesModal.currentCategory).length === 0) &&
      (props.productCategoriesModal.categoriesLoading === false)
    ){
      props.fetchAvailableProductCategories();
      props.setIsAddingMode(attitude.isAddModeOn);
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

  var _PRODUCT_CATEGORIES_CONTENT;

  if (props.productCategoriesModal.categoriesLoading === true){
    _PRODUCT_CATEGORIES_CONTENT = (
      <Input
        type={__CONSTANTS.modalContainer.content.firstList.state.loading.type}
        name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstList.state.loading.title.en)}
        style={{
          backgroundColor: Global.colors.single.mercury
        }}
        disable={true}>
          <ActivityIndicator color={Global.colors.single.lavenderGray}/>
      </Input>
    );
  }else{
    let _BUTTON_NAME = __CONSTANTS.modalContainer.content.submitInput.state.normal.title.en,
        _BUTTON_VALUE = __CONSTANTS.modalContainer.content.submitInput.state.normal.title[attitude.language];

    if (props.productCategoriesModal.isAddingMode === true){
      if (props.productCategoriesModal.currentHiddenTabIndex !== 1){
        _BUTTON_NAME = __CONSTANTS.modalContainer.content.submitInput.state.adding.title.en;
        _BUTTON_VALUE = __CONSTANTS.modalContainer.content.submitInput.state.adding.title[attitude.language];
      }
    }

    _PRODUCT_CATEGORIES_CONTENT = (
      <View
        name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.title.en)}>
          <List
            dataSource={props.productCategoriesModal.categories}
            onLayout={(color) => {
              var _OTHER_ICON_PROPS = {},
                  _ICON_CUSTOM_STYLE = {};

              if (Platform.OS !== 'ios'){
                if (_Screen.width >= 1000 || _Screen.height >= 1000){
                  _OTHER_ICON_PROPS.height = 28;
                }else{
                  _OTHER_ICON_PROPS.height = 25;
                }
              }

              _ICON_CUSTOM_STYLE.marginRight = Styles.Content.marginVertical;

              return (
                <Icon
                  name={__CONSTANTS.modalContainer.content.firstList.state.normal.extraContent.icon.name}
                  color={color}
                  style={_ICON_CUSTOM_STYLE}
                  {..._OTHER_ICON_PROPS}/>
              );
            }}
            onPress={(response) => props.setCurrentCategory(response)}/>

          <Input
            type={__CONSTANTS.modalContainer.content.submitInput.type}
            name={Functions._convertTokenToKeyword(_BUTTON_NAME)}
            value={_BUTTON_VALUE}
            gradient={Global.colors.pair.ongerine}
            onPress={() => {
              if (attitude.isAddModeOn !== true){
                attitude.onProgressSuccess(props.productCategoriesModal.currentCategory);
                attitude.onBlur(false);
              }else{
                props.setCurrentHiddenTabIndex(1);
              }
            }}
            forcedDisable={_VALIDATED}/>
      </View>
    );

    if (props.productCategoriesModal.isAddingMode === true){
      if (props.productCategoriesModal.currentHiddenTabIndex === 1){
        const _ITEMS_CENTER_STYLE = {
          alignItems: 'center'
        };

        _PRODUCT_CATEGORIES_CONTENT = (
          <View
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.title.en)}>
              <Input
                type={__CONSTANTS.modalContainer.content.firstHiddenTab.firstInput.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstHiddenTab.firstInput.title.en)}
                placeholder={__CONSTANTS.modalContainer.content.firstHiddenTab.firstInput.title[attitude.language]}
                value={props.productCategoriesModal.newCategoryName}
                style={[
                  Styles.RegularItemContainer,
                  {
                    marginBottom: Styles.Content.marginVertical
                  }
                ]}
                onChangeText={(currentValue) => props.setNewCategoryName(currentValue)} />

              <Input
                type={__CONSTANTS.modalContainer.content.submitInput.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.submitInput.state.normal.title.en)}
                value={__CONSTANTS.modalContainer.content.submitInput.state.normal.title[attitude.language]}
                gradient={Global.colors.pair.ongerine}
                style={{
                  marginBottom: Styles.Content.marginVertical
                }}
                onPress={async () => {
                  if (props.productCategoriesModal.isAddingMode === true){
                    let _ANCESTORS = props.productCategoriesModal.currentCategory.ancestors || [],
                        _SEED = {
                          value: props.productCategoriesModal.newCategoryName.trim()
                        };

                    if (Object.keys(props.productCategoriesModal.currentCategory).length > 0){
                      _ANCESTORS.push(props.productCategoriesModal.currentCategory._id);
                    }

                    if (_ANCESTORS.length > 0){
                      _SEED.ancestors = _ANCESTORS;
                    }

                    await props.appendCategory(_SEED);
                    await attitude.onBlur(false);
                    await props.resetModal();
                  }
                }}
                forcedDisable={_VALIDATED}/>

              <Link
                containerStyle={_ITEMS_CENTER_STYLE}
                value={__CONSTANTS.modalContainer.content.secondHiddenTab.link.title[attitude.language]}
                onPress={() => props.setCurrentHiddenTabIndex(0)} />
          </View>
        );
      }
    }
  }

  return (
    <Modal
      name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.title.en)}
      visible={attitude.visibility}
      backdropBlurType={MODAL.BACKDROP_BLUR_TYPE}
      onBlur={() => MODAL.ON_BLUR(false)}
      onPress={attitude.onPress}
      style={[
        Styles.ModalContainer,
        {
          paddingHorizontal: Styles.Content.marginHorizontal
        }
      ]}
      swipeDirection="down">
        {_PRODUCT_CATEGORIES_CONTENT}
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoriesModal);
