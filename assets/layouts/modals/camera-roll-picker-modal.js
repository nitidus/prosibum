import React, { Component } from 'react';

import { View, Image, CameraRoll, Platform, Dimensions, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Modules } from '../../styles/index';
import { Icon } from '../icon';
import { Modal } from '../modal';
import { Input, Carousel } from '../../components/index';
const Styles = Modules.Layouts.CountriesCodesModal;

import { Functions } from '../../modules/index';

import { Layouts as LayoutsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.CameraRollPickerModal;

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
          }
        };

  if (props.cameraRollPickerModal.cameraRollItems.length === 0){
    var _CAMERA_ROLL_OPTIONS = {
        first: 20,
        mimeTypes: [
          'image/jpeg', 'image/png'
        ],
        assetType: 'Photos'
      };

    if (Platform.OS === 'ios'){
      _CAMERA_ROLL_OPTIONS.groupTypes = 'All';
    }

    CameraRoll.getPhotos(_CAMERA_ROLL_OPTIONS)
    .then((recentItemsOnCameraRoll) => {
      props.setCameraRollItems(recentItemsOnCameraRoll.edges)
    })
    .catch((err) => {

    })
  }

  var content;

  if (props.cameraRollPickerModal.cameraRollItems.length > 0){
    content = props.cameraRollPickerModal.cameraRollItems.map((photo, i) => {
      return (
        <Image
          key={i}
          style={{
            width: 100,
            height: 100
          }}
          source={{ uri: photo.node.image.uri }}/>
      );
    });
  }

  return (
    <Modal
      visible={attitude.visibility}
      backdropBlurType={MODAL.BACKDROP_BLUR_TYPE}
      onBlur={() => MODAL.ON_BLUR(false)}
      onPress={attitude.onPress}
      style={Styles.ModalContainer}>
        <View
          style={Styles.Container}>
            {content}
        </View>
    </Modal>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraRollPickerModal);
