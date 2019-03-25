import React, { Component } from 'react';

import { View, TouchableOpacity, Text, Dimensions, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Modules } from '../../styles/index';
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
const __CONSTANTS = layouts_constants.product_categories_modal;

const _componentWillCheckValidation = (props) => {
  const _PROPS = props.productCategoriesModal;

  var _FORM_FIELDS_VALIDITY = false;

  if (Object.keys(_PROPS.currentCategory).length > 0){
    if (_PROPS.currentCategory.key != ''){
      _FORM_FIELDS_VALIDITY = true;
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
        <List
          dataSource={[
            {
              _id: '0',
              children: ['01'],
              key: 'Level 1.0'
            },
            {
              _id: '01',
              ancestors: ['0'],
              children: ['011'],
              key: 'Level 1.1'
            },
            {
              _id: '011',
              ancestors: ['0', '01'],
              children: ['0111'],
              key: 'Level 1.1.1'
            },
            {
              _id: '0111',
              ancestors: ['0', '01', '011'],
              children: ['01111'],
              key: 'Level 1.1.1.1'
            },
            {
              _id: '01111',
              ancestors: ['0', '01', '011', '0111'],
              children: ['011111'],
              key: 'Level 1.1.1.1.1'
            },
            {
              _id: '011111',
              ancestors: ['0', '01', '011', '0111', '01111'],
              key: 'Level 1.1.1.1.1.1'
            },
            {
              _id: '1',
              children: ['11'],
              key: 'Level 2.0'
            },
            {
              _id: '11',
              ancestors: ['1'],
              key: 'Level 2.1'
            },
            {
              _id: '2',
              key: 'Level 3.0'
            }
          ]}
          onLayout={(color) => {
            return (
              <Icon
                name={__CONSTANTS.modalContainer.content.firstList.extraContent.icon.name}
                color={color}
                style={{
                  marginRight: Styles.Content.marginHorizontal
                }}/>
            );
          }}
          onPress={(response) => {
            props.setCurrentCategory(response);
            attitude.onProgressSuccess(response);
          }}/>

        <Input
          type={__CONSTANTS.modalContainer.content.submitInput.type}
          name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.submitInput.state.normal.title.en)}
          value={__CONSTANTS.modalContainer.content.submitInput.state.normal.title.en}
          gradient={Global.colors.pair.ongerine}
          onPress={() => MODAL.ON_BLUR(false)}
          forcedDisable={_VALIDATED}/>
    </Modal>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoriesModal);
