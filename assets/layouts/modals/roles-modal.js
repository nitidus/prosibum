import React, { Component } from 'react';

import { View, ScrollView, TouchableOpacity, Text, Dimensions, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Modules } from '../../styles/index';
import { Icon } from '../icon';
import { Modal } from '../modal';
import { Input, Carousel } from '../../components/index';
const Styles = Modules.Layouts.RolesModal;

import { Functions } from '../../modules/index';
const { Preparation } = Functions;

import { Layouts as LayoutsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.RolesModal;

import { layouts_constants } from '../../flows/knowledge/index';
const __CONSTANTS = layouts_constants.roles_modal;

const RolesModal = (props) => {
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

  if ((typeof props.data != 'undefined') || (typeof props.rolesData != 'undefined') || (typeof props.roles_data != 'undefined') || (typeof props.rolesItems != 'undefined') || (typeof props.roles_items != 'undefined')){
    attitude.data = props.data || props.rolesData || props.roles_data || props.rolesItems || props.roles_items;

    if (props.rolesModal.roles.length === 0){
      props.setRolesItems(attitude.data);
    }
  }

  if ((typeof props.currentRolesItem != 'undefined') || (typeof props.current_roles_item != 'undefined')){
    attitude.currentRolesItem = props.currentRolesItem || props.current_roles_item;

    if (!props.rolesModal.currentRole.hasOwnProperty('role')){
      props.setCurrentRole(attitude.currentRolesItem);
    }
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
          ON_BLUR: (status) => attitude.onBlur(status),
          ON_PROGRESS_SUCCESS: async (response) => attitude.onProgressSuccess(response),
          ITEMS: {
            ACTIVE_OPACITY: 0.7
          }
        }

  var _USER_GROUP_ROLES = [],
      _CURRENT_USER_GROUP_ROLE = '',
      _CURRENT_USER_GROUP_ROLE_INDEX = -1,
      _ROLE_COUNT = '',
      _ROLE_COUNT_DEPENDED_NOUN = '';

  if (attitude.visibility === true){
    _USER_GROUP_ROLES = props.rolesModal.roles.map((item, i) => {
      const _ROW = item,
            _ROLE = _ROW.role;

      return Functions._convertKeywordToToken(_ROLE || _ROLE.en);
    }),
    _CURRENT_USER_GROUP_ROLE = props.rolesModal.currentRole.role || props.rolesModal.currentRole,
    _CURRENT_USER_GROUP_ROLE_INDEX = props.rolesModal.roles.findIndex((item) => {
      const _USER_GROUP_ROLE = item.role || item,
            _CURRENT_USER_GROUP_ROLE = props.rolesModal.currentRole.role || props.rolesModal.currentRole;

      return (_CURRENT_USER_GROUP_ROLE === _USER_GROUP_ROLE);
    }),
    _ROLE_COUNT = props.rolesModal.roleCount.toString(),
    _ROLE_COUNT_DEPENDED_NOUN = (props.rolesModal.roleCount > 1)? __CONSTANTS.modalContainer.content.submitInput.state.normal.preposition.en: '';
  }

  return (
    <Modal
      name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.title.en)}
      visible={attitude.visibility}
      backdropBlurType={MODAL.BACKDROP_BLUR_TYPE}
      onBlur={() => MODAL.ON_BLUR(false)}
      onPress={attitude.onPress}
      style={Styles.ModalContainer}>
        <Carousel
          name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstCarouselContainer.title.en)}
          data={_USER_GROUP_ROLES}
          style={Styles.RolesContainer}
          itemWidth={_Screen.width - (Styles.__Global.marginHorizontal * 2)}
          firstItem={_CURRENT_USER_GROUP_ROLE_INDEX}
          onLayout={({ item, i }) => {
            var _CURRENT_USER_GROUP = Functions._convertKeywordToToken( props.rolesModal.currentRole.role || props.rolesModal.currentRole),
                _ITEM_NAME = item.toLowerCase(),
                _ITEM_VALUE = Functions._convertKeywordToToken(_ITEM_NAME);

            if (_CURRENT_USER_GROUP === item){
              return (
                <Input
                  type={__CONSTANTS.modalContainer.content.firstCarouselContainer.content.self.type}
                  name={_ITEM_NAME}
                  value={_ITEM_VALUE}
                  gradient={Global.colors.pair.aqrulean}
                  disable={true}/>
              );
            }else{
              return (
                <Input
                  type={__CONSTANTS.modalContainer.content.firstCarouselContainer.content.self.type}
                  name={_ITEM_NAME}
                  value={_ITEM_VALUE}
                  gradient={Global.colors.pair.ongerine}
                  disable={true}/>
              );
            }
          }}
          onSnap={(selectedItemIndex) => props.setCurrentRole(props.rolesModal.roles[selectedItemIndex])}/>

        <View
          style={Styles.ModalMajorContent}>
            <Input
              type={__CONSTANTS.modalContainer.content.firstInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstInput.title.en)}
              placeholder={__CONSTANTS.modalContainer.content.firstInput.title.en}
              value={_ROLE_COUNT}
              style={Styles.RolesCountInput}
              onChangeText={(currentValue) => props.setRoleCount(currentValue)} />
            <Input
              type={__CONSTANTS.modalContainer.content.submitInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.submitInput.state.normal.title.en)}
              value={`${__CONSTANTS.modalContainer.content.submitInput.state.normal.title.en} ${Functions._convertKeywordToToken(_CURRENT_USER_GROUP_ROLE)}${_ROLE_COUNT_DEPENDED_NOUN}`}
              gradient={Global.colors.pair.ongerine}
              style={Styles.AppendRolesButton}
              onPress={async () => {
                const _RULES = {
                  user_group_id: props.rolesModal.currentRole._id,
                  roles_count: props.rolesModal.roleCount
                };

                await props.appendRolesToResource(_RULES, (response, state) => {
                  MODAL.ON_PROGRESS_SUCCESS(response);
                  MODAL.ON_BLUR(state);
                });
              }}/>
        </View>
    </Modal>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(RolesModal);
