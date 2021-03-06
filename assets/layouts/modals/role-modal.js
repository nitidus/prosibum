import React, { Component } from 'react';

import { View, KeyboardAvoidingView, TouchableOpacity, Text, Dimensions, Platform, I18nManager, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Modules } from '../../styles/index';
import { ActivityIndicator } from '../activity-indicator';
import { Icon } from '../icon';
import { Modal } from '../modal';
import { Input, Carousel, Link } from '../../components/index';
const Styles = Modules.Layouts.RoleModal;

import { Functions } from '../../modules/index';
const { Preparation } = Functions;

import { Layouts as LayoutsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.RoleModal;

import { layouts_constants } from '../../flows/knowledge/index';
import { name as appName } from '../../../app.json';
import { GLOBAL } from '../../flows/states/types/index';
const __CONSTANTS = layouts_constants.modals.role_modal;

const _componentWillCheckValidation = (props) => {
  const _PROPS = props.roleModal;

  var _FORM_FIELDS_VALIDITY = false;

  if (_PROPS.email != ''){
    const _IS_EMAIL_VALID = Functions._checkIsAValidEmail(_PROPS.email)

    if (_IS_EMAIL_VALID){
      _FORM_FIELDS_VALIDITY = true;
    }
  }

  return !_FORM_FIELDS_VALIDITY;
}

const RoleModal = (props) => {
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

    if ((attitude.visibility === true) && (props.roleModal.loadingRolesType === false)){
      if (Object.keys(props.roleModal.reference).length > 0){
        if ((typeof attitude.reference._id != 'undefined') && (typeof props.roleModal.reference._id != 'undefined')){
          if (attitude.reference._id !== props.roleModal.reference._id){
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

  attitude.language = (typeof props.language != 'undefined')? Functions._convertTokenToKeyword(props.language.key): 'en';

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

  if ((props.roleModal.roles.length > 0) && (Object.keys(props.roleModal.currentRole).length > 0)){
    if (attitude.visibility === true){
      _USER_GROUP_ROLES = props.roleModal.roles.map((item, i) => {
        const _ROW = item,
              _ROLE = _ROW.role;

        return Functions._convertKeywordToToken(_ROLE);
      }),
      _CURRENT_USER_GROUP_ROLE = props.roleModal.currentRole.role || props.roleModal.currentRole,
      _CURRENT_USER_GROUP_ROLE_INDEX = props.roleModal.roles.findIndex((item) => {
        const _USER_GROUP_ROLE = item,
              _CURRENT_USER_GROUP_ROLE = props.roleModal.currentRole;

        return (_CURRENT_USER_GROUP_ROLE === _USER_GROUP_ROLE);
      });
    }

    const _VALIDATED = _componentWillCheckValidation(props);

    const _KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR = (Platform.OS === 'ios')? 'height': '';

    let _FIRST_CAROUSEL_OTHER_OPTIONS = {},
        _FINAL_BUTTON = (
          <Input
            type={__CONSTANTS.modalContainer.content.submitInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.submitInput.state.normal.title.en)}
            value={`${__CONSTANTS.modalContainer.content.submitInput.state.normal.title[attitude.language]}`}
            gradient={Global.colors.pair.ongerine}
            style={Styles.AppendRolesButton}
            onPress={async () => {
              var _RULES = {
                user_group_id: props.roleModal.currentRole._id,
                email: props.roleModal.email
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

                  const _CARDINAL = await props.roleModal.cardinal;

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

              await props.appendRolesToResource(_RULES, async (response, state) => {
                await MODAL.ON_PROGRESS_SUCCESS(response);
                await MODAL.ON_BLUR(state);
              });
            }}
            forcedDisable={_VALIDATED}/>
        ),
        _ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((_USER_GROUP_ROLES.length > 1)? ((Platform.OS !== 'ios')? 2: 2): 2);

    if (Platform.OS !== 'ios'){
      _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';

      if (I18nManager.isRTL){
        _FIRST_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = {
          flexDirection: 'row-reverse'
        };
      }
    }

    if (_VALIDATED){
      var _MESSAGE = '';

      if (props.roleModal.email != ''){
        const _IS_EMAIL_VALID = Functions._checkIsAValidEmail(props.roleModal.email)

        if (!_IS_EMAIL_VALID){
          _MESSAGE += __CONSTANTS.modalContainer.warning.firstLevel[attitude.language];
        }
      }else{
        _MESSAGE += __CONSTANTS.modalContainer.warning.secondLevel[attitude.language];
      }

      if (_MESSAGE != ''){
        _FINAL_BUTTON = (
          <Input
            type={__CONSTANTS.modalContainer.content.submitInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.submitInput.state.normal.title.en)}
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

    _MODAL_CONTENT = (
      <KeyboardAvoidingView
        behavior={_KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR}
        name={__CONSTANTS.modalContainer.context.title.en}>
          <Carousel
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstCarouselContainer.title.en)}
            data={_USER_GROUP_ROLES}
            style={Styles.RolesContainer}
            itemWidth={_Screen.width - (Styles.__Global.marginHorizontal * _ITEM_WIDTH_COEFFICIENT)}
            firstItem={_CURRENT_USER_GROUP_ROLE_INDEX}
            onLayout={({ item, index }) => {
              var _CURRENT_USER_GROUP = Functions._convertKeywordToToken(props.roleModal.currentRole.role || props.roleModal.currentRole),
                  _ITEM_NAME = item.toLowerCase(),
                  _ROLE = '',
                  _DID_FETCH_APPROPRIATE_ROLE = Functions._getAppropriateRoleBaseOnLocale(item, attitude.language),
                  _ITEM_GRADIENT = Global.colors.pair.ongerine;

              if (_DID_FETCH_APPROPRIATE_ROLE !== false){
                _ROLE = _DID_FETCH_APPROPRIATE_ROLE;
              }

              if (Functions._convertKeywordToToken(props.roleModal.currentRole.role) === Functions._convertKeywordToToken(item)){
                _ITEM_GRADIENT = Global.colors.pair.aqrulean;
              }

              return (
                <Input
                  type={__CONSTANTS.modalContainer.content.firstCarouselContainer.content.self.type}
                  name={_ITEM_NAME}
                  value={_ROLE}
                  gradient={_ITEM_GRADIENT}
                  disable={true}/>
              );
            }}
            onSnap={(selectedItemIndex) => props.setCurrentRole(props.roleModal.roles[selectedItemIndex])}
            {..._FIRST_CAROUSEL_OTHER_OPTIONS}/>

          <Input
            type={__CONSTANTS.modalContainer.content.firstInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstInput.title.en)}
            placeholder={__CONSTANTS.modalContainer.content.firstInput.title[attitude.language]}
            value={props.roleModal.email}
            style={Styles.TokenInput}
            autoCapitalize="none"
            onChangeText={(currentValue) => props.setEmail(currentValue)} />

          {_FINAL_BUTTON}
      </KeyboardAvoidingView>
    );

  }else{
    // <Link
    //   containerStyle={Styles.EmptyContent}
    //   value={__CONSTANTS.modalContainer.noContent.title[attitude.language]} />

    _MODAL_CONTENT = (
      <ActivityIndicator/>
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

export default connect(mapStateToProps, mapDispatchToProps)(RoleModal);
