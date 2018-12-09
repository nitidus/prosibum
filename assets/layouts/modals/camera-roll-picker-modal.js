import React, { Component } from 'react';

import { View, ScrollView, TouchableOpacity, Image, Dimensions, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Modules } from '../../styles/index';
import { Icon } from '../icon';
import { Modal } from '../modal';
import { Input, Carousel } from '../../components/index';
const Styles = Modules.Layouts.CameraRollPickerModal;

import { Functions } from '../../modules/index';
const { Preparation } = Functions;

import { Layouts as LayoutsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.CameraRollPickerModal;

import { layouts_constants } from '../../flows/knowledge/index';
const __CONSTANTS = layouts_constants.camera_roll_picker_modal;

const CameraRollPickerModal = (props) => {
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

  if ((typeof props.selectedItem != 'undefined') || (typeof props.selected != 'undefined') || (typeof props.selectedRow != 'undefined') || (typeof props.firstItem != 'undefined') || (typeof props.onModalClose != 'undefined') || (typeof props.modalOnClose != 'undefined')){
    attitude.selectedItem = props.selectedItem || props.selected || props.selectedRow || props.firstItem || props.onModalClose || props.modalOnClose;
  }

  if ((typeof props.onPress != 'undefined') || (typeof props.onItemPress != 'undefined') || (typeof props.itemOnPress != 'undefined') || (typeof props.onItemSelect != 'undefined') || (typeof props.itemOnSelect != 'undefined') || (typeof props.onRowPress != 'undefined') || (typeof props.rowOnPress != 'undefined') || (typeof props.onRowSelect != 'undefined') || (typeof props.rowOnSelect != 'undefined')){
    attitude.onPress = props.onPress || props.onItemPress || props.itemOnPress || props.onItemSelect || props.itemOnSelect || props.onRowPress || props.rowOnPress || props.onRowSelect || props.rowOnSelect;
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

  if (attitude.visibility === true){
    if (props.cameraRollPickerModal.groupTypes.length === 0 && props.cameraRollPickerModal.currentGroupType === ''){
      const _GROUP_TYPES = __CONSTANTS.modalContainer.content.firstCarouselContainer.content.self.context.map((item, i) => {
        return Functions._convertKeywordToToken(item.en);
      });

      props.setCameraRollGroupTypes(_GROUP_TYPES);
      props.setCurrentCameraRollGroupType(_GROUP_TYPES[0]);
    }

    if (props.cameraRollPickerModal.cameraRollItems.length === 0){
      Preparation._prepareCameraRoll(props);
    }
  }

  var _ROW_CHUNK_SIZE = (_Screen.width >= 1000 || _Screen.height >= 1000)? 5:3,
      _CAMERA_ROLL_ITEMS = Functions._chunkArray(props.cameraRollPickerModal.cameraRollItems, _ROW_CHUNK_SIZE),
      _CAMERA_ROLL_ITEMS_CONTENT;

  if (_CAMERA_ROLL_ITEMS.length > 0){
    _CAMERA_ROLL_ITEMS_CONTENT = _CAMERA_ROLL_ITEMS.map((photosRow, i) => {
      return (
        <View
          style={Styles.CameraRollRowContainer}
          key={i}>
            {
              photosRow.map((photo, j) => {
                var _SINGLE_IMAGE_STYLES = [
                  Styles.CameraRollItemContainer
                ];

                if ((j + 1) % _ROW_CHUNK_SIZE === 0){
                  _SINGLE_IMAGE_STYLES.push({
                    marginRight: 0
                  });
                }

                const _PHOTO_URI = photo.node.image.uri;

                return (
                  <TouchableOpacity
                    key={j}
                    activeOpacity={MODAL.ITEMS.ACTIVE_OPACITY}
                    style={_SINGLE_IMAGE_STYLES}
                    onPress={() => {
                      MODAL.ON_BLUR(false);
                      attitude.onPress(_PHOTO_URI);
                    }}>
                      <Image
                        style={Styles.CameraRollItemContent}
                        source={{ uri: _PHOTO_URI }} />
                  </TouchableOpacity>
                );
              })
            }
        </View>
      )
    });
  }

  const _CURRENT_GROUP_TYPE_INDEX = props.cameraRollPickerModal.groupTypes.findIndex((item) => {
          const _GROUP_TYPE = item,
                _CURRENT_GROUP_TYPE = props.cameraRollPickerModal.currentGroupType;

          return (_CURRENT_GROUP_TYPE === _GROUP_TYPE)
        });

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
          data={props.cameraRollPickerModal.groupTypes}
          style={Styles.CameraRollGroupTypesContainer}
          itemWidth={_Screen.width - (Styles.__Global.marginHorizontal * 2)}
          firstItem={_CURRENT_GROUP_TYPE_INDEX}
          onLayout={({ item, i }) => {
            var _CURRENT_GROUP_TYPE = props.cameraRollPickerModal.currentGroupType,
                _ITEM_NAME = item.toLowerCase(),
                _ITEM_VALUE = Functions._convertKeywordToToken(_ITEM_NAME);

            if (_CURRENT_GROUP_TYPE === item){
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
          onSnap={(selectedItemIndex) => props.setCurrentCameraRollGroupType(props.cameraRollPickerModal.groupTypes[selectedItemIndex])}/>

        <View
          style={Styles.CameraRollMajorContainer}>
            <ScrollView
              style={Styles.CameraRollContainer}
              showsVerticalScrollIndicator={false}>
                {_CAMERA_ROLL_ITEMS_CONTENT}
            </ScrollView>
        </View>
    </Modal>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraRollPickerModal);
