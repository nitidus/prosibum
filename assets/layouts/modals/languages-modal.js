import React, { Component } from 'react';

import { View, FlatList, Text, Dimensions, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Modules } from '../../styles/index';
import { Icon } from '../icon';
import { Modal } from '../modal';
import { Input, Carousel } from '../../components/index';
const Styles = Modules.Layouts.LanguagesModal;

import { Functions } from '../../modules/index';

import { Layouts as LayoutsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.LanguagesModal;

import { layouts_constants } from '../../flows/knowledge/index';
const __CONSTANTS = layouts_constants.modals.languages_modal;

const LanguagesModal = (props) => {
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

  if ((typeof props.onPress != 'undefined') || (typeof props.onItemPress != 'undefined') || (typeof props.itemOnPress != 'undefined') || (typeof props.onItemSelect != 'undefined') || (typeof props.itemOnSelect != 'undefined') || (typeof props.onRowPress != 'undefined') || (typeof props.rowOnPress != 'undefined') || (typeof props.onRowSelect != 'undefined') || (typeof props.rowOnSelect != 'undefined')){
    attitude.onPress = props.onPress || props.onItemPress || props.itemOnPress || props.onItemSelect || props.itemOnSelect || props.onRowPress || props.rowOnPress || props.onRowSelect || props.rowOnSelect;
  }

  if ((typeof props.onBlur != 'undefined') || (typeof props.onModalBlur != 'undefined') || (typeof props.modalOnBlur != 'undefined') || (typeof props.onClose != 'undefined') || (typeof props.onModalClose != 'undefined') || (typeof props.modalOnClose != 'undefined')){
    attitude.onBlur = props.onBlur || props.onModalBlur || props.modalOnBlur || props.onClose || props.onModalClose || props.modalOnClose;
  }

  attitude.language = props.language;

  if (attitude.visibility !== props.languagesModal.visibility){
    props.setModalVisibility(attitude.visibility);

    if (props.languagesModal.languages.length === 0){
      const _ALL_AVAILABLE_LANGUAGES = Functions._getAllAvailableLanguages();

      props.setLanguages(_ALL_AVAILABLE_LANGUAGES);
    }

    if (typeof attitude.language != 'undefined'){
      if (Object.keys(props.languagesModal.selectedLanguage).length === 0){
        props.setSelectedLanguage(attitude.language);
      }else{
        if (props.languagesModal.selectedLanguage.key === attitude.language.key){
          props.setSelectedLanguage(attitude.language);
        }
      }
    }
  }

  const MODAL = {
          ON_BLUR: (status) => {
            attitude.onBlur(status);
            props.setModalVisibility(status);
            props.resetModal();
          }
        };

  return (
    <Modal
      name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.title.en)}
      visible={props.languagesModal.visibility}
      onBlur={() => MODAL.ON_BLUR(false)}
      onPress={attitude.onPress}
      style={Styles.ModalContainer}
      swipeDirection="down">
        <FlatList
          name={__CONSTANTS.modalContainer.content.firstCarouselContainer.title.en}
          data={props.languagesModal.languages}
          contentContainerStyle={Styles.MajorContainer}
          style={Styles.Container}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }, i) => {
            var _LANGUAGE_KEY = Functions._convertTokenToKeyword(item.key),
                _SELECTED_LANGUAGE = (Object.keys(props.languagesModal.selectedLanguage).length > 0)? Functions._convertTokenToKeyword(props.languagesModal.selectedLanguage.key): '';

            if (_LANGUAGE_KEY === _SELECTED_LANGUAGE){
              return (
                <Input
                  type={__CONSTANTS.modalContainer.content.firstCarouselContainer.content.self.type}
                  name={_LANGUAGE_KEY}
                  gradient={Global.colors.pair.aqrulean}
                  style={Styles.CarouselItemContainer}
                  disable={true}>
                    <Text
                      style={Styles.CarouselItemTitle}>
                      {item.name}
                    </Text>
                    <Text
                      style={Styles.CarouselItemSubtitle}>
                      {item.native}
                    </Text>
                </Input>
              );
            }else{
              return (
                <Input
                  type={__CONSTANTS.modalContainer.content.firstCarouselContainer.content.self.type}
                  name={_LANGUAGE_KEY}
                  gradient={Global.colors.pair.ongerine}
                  style={Styles.CarouselItemContainer}
                  onPress={async () => {
                    await Functions._setDefaultNativeSettingsItemWithKey('language', item);
                    await attitude.onPress();
                    await MODAL.ON_BLUR(false);
                  }}>
                    <Text
                      style={Styles.CarouselItemTitle}>
                      {item.name}
                    </Text>
                    <Text
                      style={Styles.CarouselItemSubtitle}>
                      {item.native}
                    </Text>
                </Input>
              );
            }
          }} />
    </Modal>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesModal);
