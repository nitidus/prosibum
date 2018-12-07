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

    if (props.rolesModal.currentRole === ''){
      props.setCurrentRole(attitude.currentRolesItem);
    }
  }

  if (typeof props.onPress != 'undefined'){
    attitude.onPress = props.onPress;
  }

  if ((typeof props.onBlur != 'undefined') || (typeof props.onModalBlur != 'undefined') || (typeof props.modalOnBlur != 'undefined') || (typeof props.onClose != 'undefined') || (typeof props.onModalClose != 'undefined') || (typeof props.modalOnClose != 'undefined')){
    attitude.onBlur = props.onBlur || props.onModalBlur || props.modalOnBlur || props.onClose || props.onModalClose || props.modalOnClose;
  }

  const MODAL = {
          BACKDROP_BLUR_TYPE: "dark",
          ON_BLUR: (status) => {
            attitude.onBlur(status);
          },
          ITEMS: {
            ACTIVE_OPACITY: 0.7
          }
        }

  const _CURRENT_USER_GROUP_ROLE_INDEX = props.rolesModal.roles.findIndex((item) => {
          const _USER_GROUP_ROLE = item,
                _CURRENT_USER_GROUP_ROLE = props.rolesModal.currentRole;

          return (_CURRENT_USER_GROUP_ROLE === _USER_GROUP_ROLE)
        }),
        _ROLE_COUNT = props.rolesModal.roleCount.toString(),
        _ROLE_COUNT_DEPENDED_NOUN = (props.rolesModal.roleCount > 1)? __CONSTANTS.modalContainer.content.submitInput.state.normal.preposition.en: '';

  return (
    <Modal
      name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.title.en)}
      visible={attitude.visibility}
      backdropBlurType={MODAL.BACKDROP_BLUR_TYPE}
      onBlur={() => MODAL.ON_BLUR(false)}
      onPress={attitude.onPress}
      style={Styles.ModalContainer}>
        <View
          style={Styles.RolesMajorContainer}>
            <ScrollView
              style={Styles.CameraRollContainer}
              showsVerticalScrollIndicator={false}>
                <Carousel
                  name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstCarouselContainer.title.en)}
                  data={props.rolesModal.roles}
                  style={Styles.RolesContainer}
                  itemWidth={_Screen.width - (19 * 2)}
                  firstItem={_CURRENT_USER_GROUP_ROLE_INDEX}
                  onLayout={({ item, i }) => {
                    var _CURRENT_USER_GROUP = props.rolesModal.currentRole,
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
                  value={`${__CONSTANTS.modalContainer.content.submitInput.state.normal.title.en} ${props.rolesModal.currentRole}${_ROLE_COUNT_DEPENDED_NOUN}`}
                  gradient={Global.colors.pair.ongerine}
                  style={Styles.AppendRolesButton}
                  onPress={() => {
                    //append role as initialized end user
                  }}/>
            </ScrollView>
        </View>
    </Modal>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(RolesModal);
