import React, { Component } from 'react';

import { View, TouchableOpacity, Text, Dimensions, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Modules } from '../../styles/index';
import { Icon } from '../icon';
import { Modal } from '../modal';
import { Input, Carousel, Link } from '../../components/index';
const Styles = Modules.Layouts.RolesModal;

import { Functions } from '../../modules/index';
const { Preparation } = Functions;

import { Layouts as LayoutsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.RolesModal;

import { layouts_constants } from '../../flows/knowledge/index';
import { name as appName } from '../../../app.json';
import { GLOBAL } from '../../flows/states/types/index';
const __CONSTANTS = layouts_constants.roles_modal;

const _componentWillCheckValidation = (props) => {
  const _PROPS = props.rolesModal;

  var _FORM_FIELDS_VALIDITY = false;

  if (_PROPS.email != ''){
    const _IS_EMAIL_VALID = Functions._checkIsAValidEmail(_PROPS.email)

    if (_IS_EMAIL_VALID){
      _FORM_FIELDS_VALIDITY = true;
    }
  }

  return !_FORM_FIELDS_VALIDITY;
}

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

  if ((typeof props.reference != 'undefined') || (typeof props.referenceRole != 'undefined') || (typeof props.role != 'undefined')){
    attitude.reference = props.reference || props.referenceRole || props.role;

    if (attitude.visibility === true){
      if (Object.keys(props.rolesModal.reference).length > 0){
        if ((typeof attitude.reference._id != 'undefined') && (typeof props.rolesModal.reference._id != 'undefined')){
          if (attitude.reference._id !== props.rolesModal.reference._id){
            props.setReference(attitude.reference);

            props.fetchAvailableRolesType(GLOBAL.TARGET, attitude.reference.usergroup);
          }
        }
      }else{
        props.setReference(attitude.reference);

        props.fetchAvailableRolesType(GLOBAL.TARGET, attitude.reference.usergroup);
      }
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
          ON_BLUR: (status) => {
            attitude.onBlur(status);
            props.resetModal();
          },
          ON_PROGRESS_SUCCESS: async (response) => attitude.onProgressSuccess(response),
          ITEMS: {
            ACTIVE_OPACITY: 0.7
          }
        }

  var _USER_GROUP_ROLES = [],
      _CURRENT_USER_GROUP_ROLE = '',
      _CURRENT_USER_GROUP_ROLE_INDEX = -1,
      _ROLE_COUNT = '',
      _ROLE_COUNT_DEPENDED_NOUN = '',
      _MODAL_CONTENT;

  if ((props.rolesModal.roles.length > 0) && (Object.keys(props.rolesModal.currentRole).length > 0)){
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
      });
    }

    const _VALIDATED = _componentWillCheckValidation(props);

    _MODAL_CONTENT = (
      <View>
        <Carousel
          name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstCarouselContainer.title.en)}
          data={_USER_GROUP_ROLES}
          style={Styles.RolesContainer}
          itemWidth={_Screen.width - (Styles.__Global.marginHorizontal * 2)}
          firstItem={_CURRENT_USER_GROUP_ROLE_INDEX}
          onLayout={({ item, index }) => {
            var _CURRENT_USER_GROUP = Functions._convertKeywordToToken(props.rolesModal.currentRole.role || props.rolesModal.currentRole),
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
            value={props.rolesModal.token}
            style={Styles.TokenInput}
            autoCapitalize="none"
            onChangeText={(currentValue) => props.setEmail(currentValue)} />

          <Input
            type={__CONSTANTS.modalContainer.content.submitInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.submitInput.state.normal.title.en)}
            value={`${__CONSTANTS.modalContainer.content.submitInput.state.normal.title.en}`}
            gradient={Global.colors.pair.ongerine}
            style={Styles.AppendRolesButton}
            onPress={async () => {
              var _RULES = {
                user_group_id: props.rolesModal.currentRole._id,
                email: props.rolesModal.email
              };

              const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
                    _AUTH = JSON.parse(_SERIALIZED_AUTH);

              if (typeof _AUTH.brand != 'undefined'){
                _RULES.target = {
                  app_name: appName,
                  brand: {
                    name: _AUTH.brand.name,
                    url: `http://${Functions._convertTokenToKeyword(_AUTH.brand.name)}.${appName}.com`
                  }
                };

                if (typeof _AUTH.brand.photo != 'undefined'){
                  _RULES.target.brand.photo = _AUTH.brand.photo;
                }
              }else{
                if ((typeof _AUTH.reference_id != 'undefined') && (typeof _AUTH.cardinal_ancestors != 'undefined')){
                  _RULES.reference_id = _AUTH.reference_id;

                  _AUTH.cardinal_ancestors = [
                    ..._AUTH.cardinal_ancestors,
                    _RULES.reference_id
                  ];
                }

                if (typeof _AUTH.cardinal_id != 'undefined'){
                  await props.fetchCardinal(_AUTH.cardinal_id);

                  const _CARDINAL = await props.rolesModal.cardinal;

                  if (_CARDINAL != null){
                    _RULES.target = {
                      app_name: appName,
                      brand: {
                        name: _CARDINAL.brand.name,
                        url: `http://${Functions._convertTokenToKeyword(_CARDINAL.brand.name)}.${appName}.com`
                      }
                    };

                    if (typeof _CARDINAL.brand.photo != 'undefined'){
                      _RULES.target.brand.photo = _CARDINAL.brand.photo;
                    }
                  }
                }
              }

              await props.appendRolesToResource(_RULES, (response, state) => {
                MODAL.ON_PROGRESS_SUCCESS(response);
                MODAL.ON_BLUR(state);
              });
            }}
            forcedDisable={_VALIDATED}/>
      </View>
    );

  }else{
    _MODAL_CONTENT = (
      <Link
        containerStyle={Styles.EmptyContent}
        value={__CONSTANTS.modalContainer.noContent.title.en} />
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(RolesModal);
