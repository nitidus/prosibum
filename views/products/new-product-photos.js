import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, Keyboard, I18nManager, Text, Image, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';
import Interactable from 'react-native-interactable';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Options, CameraRollPickerModal } from '../../assets/layouts/index';
import { Input, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewProduct,
      Container = ViewsContainer.Products.NewProductContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewProduct;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_product_photos;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewProductPhotos extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this;

    if (Object.keys(props.newProduct.language).length === 0){
      const _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
            _LANGUAGE = _NATIVE_SETTINGS.language;

      await props.setLanguage(_LANGUAGE);
    }
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newProduct;

    var _FORM_FIELDS_VALIDITY = false;

    if ((_PROPS.photos.length > 0) && (Object.keys(_PROPS.primaryPhoto).length > 0)){
      if (_PROPS.photos.every((photo) => (Object.keys(photo.content).length > 0)))
      _FORM_FIELDS_VALIDITY = true;
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    if (Object.keys(props.newProduct.language).length > 0){
      const _LANGUAGE = Functions._convertTokenToKeyword(props.newProduct.language.key),
            _CAMERA_ROLL_OTHER_PROPS = {
              language: props.newProduct.language
            };

      var _PHOTOS_CONTENT;

      const _PRODUCT_TITLE = (props.newProduct.name != '')? props.newProduct.name: __CONSTANTS.pilot.title[_LANGUAGE],
            _VALIDATED = this._componentWillCheckValidation(props);

      if (props.newProduct.photos.length > 0){
        var _FINAL_BUTTON = (
          <Input
            type={__CONSTANTS.content.submitButton.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
            value={__CONSTANTS.content.submitButton.state.normal.title[_LANGUAGE]}
            gradient={Global.colors.pair.ongerine}
            style={{
              marginHorizontal: Styles.Content.marginHorizontal
            }}
            onPress={() => {
              const { navigation } = props;

              // navigation.navigate('NewProductPrices');
              alert('ok')
            }}
            forcedDisable={_VALIDATED} />
        );

        if (_VALIDATED) {
          var _MESSAGE = '';

          if (props.newProduct.photos.length > 0){
            if (props.newProduct.photos.every((photo) => (Object.keys(photo.content).length > 0)) === false){
              _MESSAGE += `${((_MESSAGE != '')? '\n': '')} ${__CONSTANTS.content.warning.firstLevel[_LANGUAGE]}`;
            }
          }else{
            _MESSAGE += `${((_MESSAGE != '')? '\n': '')} ${__CONSTANTS.content.warning.secondLevel[_LANGUAGE]}`;
          }

          if (Object.keys(props.newProduct.primaryPhoto).length === 0){
            _MESSAGE += `${((_MESSAGE != '')? '\n': '')} ${__CONSTANTS.content.warning.thirdLevel[_LANGUAGE]}`;
          }

          if (_MESSAGE != ''){
            _FINAL_BUTTON = (
              <Input
                type={__CONSTANTS.content.submitButton.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
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

        _PHOTOS_CONTENT = (
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={Styles.ScrollableListContainer}>
              {
                props.newProduct.photos.map((photoItem, i, totalPhotos) => {
                  var _CUSTOM_STYLE = {
                        marginHorizontal: Styles.Content.marginHorizontal
                      },
                      _PHOTO_DELETE_ACTION = () => {
                        const _TARGET_PHOTOS_NODE = props.newProduct.photos.filter((checkingItem, j) => {
                          return (checkingItem._id != photoItem._id);
                        });

                        props.setPhotos(_TARGET_PHOTOS_NODE);

                        if (_TARGET_PHOTOS_NODE.length > 0){
                          if (photoItem._id === props.newProduct.primaryPhoto._id){
                            props.setPrimaryPhoto(_TARGET_PHOTOS_NODE[0]);
                          }
                        }else{
                          props.setPrimaryPhoto({});
                        }
                      },
                      _PHOTO_CONTENT = photoItem.content,
                      _PHOTO_URI = '',
                      _SINGLE_PHOTO_OTHER_PROPS = {
                        language: this._language
                      },
                      PHOTO_OPTION_CUSTOM_CONTAINER = {
                        height: ((Platform.OS !== 'ios') && (_Screen.width >= 1000 || _Screen.height >= 1000))? Styles.PhotoContainer.height + 11: Styles.PhotoContainer.height
                      };

                  if (i < totalPhotos.length){
                    _CUSTOM_STYLE.marginBottom = Styles.Content.marginVertical
                  }

                  if ((Object.keys(_PHOTO_CONTENT).length > 0) && (typeof _PHOTO_CONTENT.image != 'undefined')){
                    _PHOTO_URI = _PHOTO_CONTENT.image.uri;
                  }

                  if (photoItem._id === props.newProduct.primaryPhoto._id){
                    _SINGLE_PHOTO_OTHER_PROPS.gradient = Global.colors.pair.aqrulean;
                  }

                  PHOTO_OPTION_CUSTOM_CONTAINER.right = Styles.Content.marginHorizontal;

                  return (
                    <Options
                      style={PHOTO_OPTION_CUSTOM_CONTAINER}
                      onDeletePress={_PHOTO_DELETE_ACTION}
                      {...__CONSTANTS.content.list.state.normal.options}>
                        <Input
                          type={__CONSTANTS.content.list.state.normal.type}
                          name={Functions._convertTokenToKeyword(__CONSTANTS.content.list.state.normal.title.en)}
                          value={__CONSTANTS.content.list.state.normal.title[_LANGUAGE]}
                          style={_CUSTOM_STYLE}
                          photoURI={_PHOTO_URI}
                          onPress={() => {
                            Keyboard.dismiss();
                            props.setPhotoModalVisibility(true);
                            props.setOnFetchingModePhoto(photoItem);
                          }}
                          onLongPress={() => {
                            if (_PHOTO_URI != ''){
                              props.setPrimaryPhoto(photoItem);
                            }
                          }}
                          {..._SINGLE_PHOTO_OTHER_PROPS} />
                    </Options>
                  );
                })
              }

              <Input
                type={__CONSTANTS.content.appendHandlerButton.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.appendHandlerButton.state.normal.title.en)}
                value={__CONSTANTS.content.appendHandlerButton.state.normal.title[_LANGUAGE]}
                gradient={Global.colors.pair.ongerine}
                style={{
                  marginHorizontal: Styles.Content.marginHorizontal,
                  marginBottom: Styles.Content.marginVertical
                }}
                onPress={() => props.appendPhoto({
                  _id: Functions._generateNewBSONObjectID(),
                  content: {}
                })} />

              {_FINAL_BUTTON}
          </ScrollView>
        );
      }else{
        _PHOTOS_CONTENT = (
          <View
            style={[
              Styles.Content,
              Styles.EmptyContent
            ]}>
              <Link
                containerStyle={Styles.EmptyContentLink}
                value={__CONSTANTS.content.list.state.null.title[_LANGUAGE]} />
          </View>
        );
      }

      return (
        <Container
          title={Functions._convertKeywordToToken(_PRODUCT_TITLE)}
          subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle[_LANGUAGE])}
          rightIcon={__CONSTANTS.pilot.rightIcon}
          onRightIconPress={() => {
            const _TARGET_PHOTO_NODE = {
              _id: Functions._generateNewBSONObjectID(),
              content: {}
            };

            if (Object.keys(props.newProduct.primaryPhoto).length === 0){
              props.setPrimaryPhoto(_TARGET_PHOTO_NODE);
            }

            props.appendPhoto(_TARGET_PHOTO_NODE);
          }}
          {...props}>
            {_PHOTOS_CONTENT}

            <CameraRollPickerModal
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.modalContainer.title.en)}
              visible={props.newProduct.photoModalVisibility}
              onBlur={(status) => props.setPhotoModalVisibility(status)}
              onPress={(photo) => props.setPhotos(props.newProduct.photos.map((photoItem, i) => {
                const _ON_FETCHING_MODE_PHOTO = props.newProduct.onFetchingModePhoto;

                if (photoItem._id === _ON_FETCHING_MODE_PHOTO._id){
                  const _TARGET_PHOTO_NODE = {
                    ...photoItem,
                    content: photo
                  };

                  if (Object.keys(props.newProduct.primaryPhoto).length === 0){
                    props.setPrimaryPhoto(_TARGET_PHOTO_NODE);
                  }else{
                    if (props.newProduct.primaryPhoto._id === photoItem._id){
                      props.setPrimaryPhoto(_TARGET_PHOTO_NODE);
                    }
                  }

                  return _TARGET_PHOTO_NODE;
                }else{
                  return photoItem;
                }
              }))}
              {..._CAMERA_ROLL_OTHER_PROPS}/>
        </Container>
      );
    }else{
      return (
        <ActivityIndicator/>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductPhotos);
