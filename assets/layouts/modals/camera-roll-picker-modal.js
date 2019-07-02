import React, { Component } from 'react';

import { View, ScrollView, FlatList, KeyboardAvoidingView, TouchableOpacity, Image, Dimensions, Platform, I18nManager, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import { Global, Modules } from '../../styles/index';
import { Icon } from '../icon';
import { ActivityIndicator } from '../activity-indicator';
import { Modal } from '../modal';
import { Input, Link, Carousel } from '../../components/index';
const Styles = Modules.Layouts.CameraRollPickerModal;

import { Functions } from '../../modules/index';
const { Preparation } = Functions;

import { Layouts as LayoutsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.CameraRollPickerModal;

import { layouts_constants } from '../../flows/knowledge/index';
const __CONSTANTS = layouts_constants.modals.camera_roll_picker_modal;

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

  if ((typeof props.modalTitle != 'undefined') || (typeof props.modalName != 'undefined')){
    attitude.modalTitle = props.modalTitle || props.modalName;
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

  attitude.language = (typeof props.language != 'undefined')? Functions._convertTokenToKeyword(props.language.key): 'en';

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
    if (props.cameraRollPickerModal.groupTypes.length === 0 && Object.keys(props.cameraRollPickerModal.currentGroupType).length === 0){
      const _GROUP_TYPES = __CONSTANTS.modalContainer.content.firstCarouselContainer.content.self.context.map((item, i) => {
        return item;
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
    _CAMERA_ROLL_ITEMS_CONTENT = (
      <FlatList
        data={_CAMERA_ROLL_ITEMS}
        style={Styles.CameraRollContainer}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <View
              style={Styles.CameraRollRowContainer}
              key={i}>
                {
                  item.map((photo, j) => {
                    var _SINGLE_IMAGE_STYLES = [
                      Styles.CameraRollItemContainer
                    ];

                    if ((j + 1) % _ROW_CHUNK_SIZE === 0){
                      _SINGLE_IMAGE_STYLES.push({
                        marginRight: 0
                      });
                    }

                    const _PHOTO_NODE = photo.node,
                          _PHOTO_URI = _PHOTO_NODE.image.uri;

                    return (
                      <TouchableOpacity
                        key={j}
                        activeOpacity={MODAL.ITEMS.ACTIVE_OPACITY}
                        style={_SINGLE_IMAGE_STYLES}
                        onPress={() => {
                          MODAL.ON_BLUR(false);
                          attitude.onPress(_PHOTO_NODE);
                        }}>
                          <Image
                            style={Styles.CameraRollItemContent}
                            source={{ uri: _PHOTO_URI }} />
                      </TouchableOpacity>
                    );
                  })
                }
            </View>
          );
        }}
        onEndReached={() => Preparation._prepareCameraRoll(props)}/>
    );
  }else{
    // <Link
    //   value={__CONSTANTS.modalContainer.content.firstCarouselContainer.content.empty[attitude.language]} />
    
    _CAMERA_ROLL_ITEMS_CONTENT = (
      <View
        style={Styles.CameraRollEmptyContainer}>
          <ActivityIndicator/>
      </View>
    );
  }

  const _CURRENT_GROUP_TYPE_INDEX = props.cameraRollPickerModal.groupTypes.findIndex((item) => {
          const _GROUP_TYPE = item.en,
                _CURRENT_GROUP_TYPE = props.cameraRollPickerModal.currentGroupType.en;

          return (_CURRENT_GROUP_TYPE === _GROUP_TYPE)
        });

  let _FIRST_CAROUSEL_OTHER_OPTIONS = {},
      _FIRST_CAROUSEL_CONTENT = <View/>,
      _ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((props.cameraRollPickerModal.groupTypes.length > 1)? ((Platform.OS !== 'ios')? 4: 2): 2);

  if (Platform.OS !== 'ios'){
    _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';

    if (I18nManager.isRTL){
      _FIRST_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = {
        flexDirection: 'row-reverse'
      };
    }
  }

  if (Platform.OS === 'ios'){
    _FIRST_CAROUSEL_CONTENT = (
      <Carousel
        name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstCarouselContainer.title.en)}
        data={props.cameraRollPickerModal.groupTypes}
        style={Styles.CameraRollGroupTypesContainer}
        itemWidth={_Screen.width - (Styles.__Global.marginHorizontal * _ITEM_WIDTH_COEFFICIENT)}
        firstItem={_CURRENT_GROUP_TYPE_INDEX}
        onLayout={({ item, index }) => {
          var _CURRENT_GROUP_TYPE = props.cameraRollPickerModal.currentGroupType[attitude.language],
              _ITEM_NAME = item[attitude.language],
              _ITEM_VALUE = Functions._convertKeywordToToken(_ITEM_NAME),
              _ITEM_GRADIENT = Global.colors.pair.ongerine;

          if (props.cameraRollPickerModal.currentGroupType.en === item.en){
            _ITEM_GRADIENT = Global.colors.pair.aqrulean;
          }

          return (
            <Input
              type={__CONSTANTS.modalContainer.content.firstCarouselContainer.content.self.type}
              name={_ITEM_NAME}
              value={_ITEM_VALUE}
              gradient={_ITEM_GRADIENT}
              disable={true}/>
          );
        }}
        onSnap={(selectedItemIndex) => props.setCurrentCameraRollGroupType(props.cameraRollPickerModal.groupTypes[selectedItemIndex])}
        {..._FIRST_CAROUSEL_OTHER_OPTIONS}/>
    );
  }else{
    _FIRST_CAROUSEL_CONTENT = (
      <Input
        type={__CONSTANTS.modalContainer.content.firstInput.type}
        name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstInput.title.en)}
        value={__CONSTANTS.modalContainer.content.firstInput.title[attitude.language]}
        gradient={Global.colors.pair.ongerine}
        style={{
          marginBottom: Styles.__Global.marginHorizontal,
          marginHorizontal: (Platform.OS === 'ios')? Styles.__Global.marginHorizontal: Styles.__Global.marginHorizontal * 1.7
        }}
        onPress={() => {
          let options = {
            title: `${__CONSTANTS.modalContainer.content.firstInput.modal.prefix[attitude.language]} ${attitude.modalTitle}`,
            storageOptions: {
              skipBackup: true,
              path: "images"
            }
          };

          if (Platform.OS === 'ios'){
            options.storageOptions.cameraRoll = true;
            options.storageOptions.waitUntilSaved = true;
          }

          ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel){
              Preparation._prepareCameraRoll(props);
            }else if (response.error){
              Preparation._prepareCameraRoll(props);
            }else{
              const source = {
                ...response,
                image: {
                  width: response.width,
                  height: response.height,
                  uri: (Platform.OS !== 'ios') ? response.uri : response.uri.replace('file://', '')
                }
              };

              Preparation._prepareCameraRoll(props);

              MODAL.ON_BLUR(false);
              attitude.onPress(source);
            }
          });
        }}/>
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
        {_FIRST_CAROUSEL_CONTENT}

        <KeyboardAvoidingView
          style={Styles.CameraRollMajorContainer}>
            {_CAMERA_ROLL_ITEMS_CONTENT}
        </KeyboardAvoidingView>
    </Modal>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraRollPickerModal);
