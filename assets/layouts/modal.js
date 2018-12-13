import React, { Component } from 'react';

import { KeyboardAvoidingView, View, Text, Animated, Platform, Easing } from 'react-native';
import PrimaryModal from 'react-native-modal-with-blur-support-background';
import { BlurView } from 'react-native-blur';

import { Global, Modules } from '../styles/index';
import { Icon } from './icon';
const Styles = Modules.Layouts.Modal;

import { Functions } from '../modules/index';

export const Modal = (props) => {
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

  if (typeof props.children != 'undefined'){
    attitude.children = [];

    if (Array.isArray(props.children)){
      attitude.children = attitude.children.concat(props.children);
    }else{
      attitude.children.push(props.children);
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

  if ((typeof props.swipeDirection != 'undefined') || (typeof props.directionSwipe != 'undefined')){
    attitude.swipeDirection = (props.swipeDirection || props.directionSwipe).toLowerCase();
  }

    attitude.backdropColor = props.backdropColor || props.backdrop_color || ((Platform.OS === 'ios')? Functions._convertHexColorToRGBA(Global.colors.single.rangoonGreen, 0.4): Global.colors.single.rangoonGreen);

    attitude.backdropBlurType = props.backdropBlurType || props.backdrop_blur_type || "dark";
    attitude.backdropBlurAmount = props.backdropBlurAmount || props.backdrop_blur_amount || 10;

  if ((typeof props.swipeThreshold != 'undefined') || (typeof props.threshold != 'undefined')){
    attitude.swipeThreshold = props.swipeThreshold || props.threshold;
  }

  if ((typeof props.onBlur != 'undefined') || (typeof props.onModalBlur != 'undefined') || (typeof props.modalOnBlur != 'undefined') || (typeof props.onClose != 'undefined') || (typeof props.onModalClose != 'undefined') || (typeof props.modalOnClose != 'undefined')){
    attitude.onBlur = props.onBlur || props.onModalBlur || props.modalOnBlur || props.onClose || props.onModalClose || props.modalOnClose;
  }

  const MODAL = {
    BACKDROP: {
      COLOR: attitude.backdropColor
    },
    SWIPE: {
      DIRECTION: "down",
      THRESHOLD: attitude.swipeThreshold || 50
    },
    ON_BLUR: (status) => {
      attitude.onBlur(status);
    }
  };

  var _PRIMARY_MODAL_CONTENT;

  if (attitude.swipeDirection){
    const _SWIPE_DIRECTION = (attitude.swipeDirection == 'up' || attitude.swipeDirection == 'down' || attitude.swipeDirection == 'left' || attitude.swipeDirection == 'right')? attitude.swipeDirection: MODAL.SWIPE.DIRECTION,
          _PRIMARY_MODAL_CONTENT_OVERLAY = (Platform.OS === 'ios')? (
            <BlurView
              style={Styles.ModalContentBlurOverlay} />
          ): (
            <View
              style={Styles.ModalContentBlurOverlay} />
          );

    _PRIMARY_MODAL_CONTENT = (
      <PrimaryModal
        isVisible={attitude.visibility}
        backdropColor={MODAL.BACKDROP.COLOR}
        swipeDirection={_SWIPE_DIRECTION}
        swipeThreshold={MODAL.SWIPE.THRESHOLD}
        backdropBlurType={attitude.backdropBlurType}
        backdropBlurAmount={attitude.backdropBlurAmount}
        style={Styles.BottomModal}
        onBackdropPress={() => MODAL.ON_BLUR(false)}
        onSwipe={() => MODAL.ON_BLUR(false)}>
          <KeyboardAvoidingView
            style={[
              Styles.ModalContent,
              attitude.style
            ]}>
              {_PRIMARY_MODAL_CONTENT_OVERLAY}

              <Icon
                name="indicator"
                style={Styles.ModalIndicator} />
              <View>
                {
                  attitude.children.map((child, i) => {
                    var childProps = {...child.props};

                    const ultimateKey = Functions._generateNewUniqueObjectKey()

                    childProps.key = childProps.name || ultimateKey;

                    return React.cloneElement(child, childProps);
                  })
                }
              </View>
          </KeyboardAvoidingView>
      </PrimaryModal>
    );
  }else{
    const _PRIMARY_MODAL_CONTENT_OVERLAY = (Platform.OS === 'ios')? (
      <BlurView
        style={Styles.ModalContentBlurOverlay} />
    ): (
      <View
        style={Styles.ModalContentBlurOverlay} />
    );

    _PRIMARY_MODAL_CONTENT = (
      <PrimaryModal
        isVisible={attitude.visibility}
        backdropColor={MODAL.BACKDROP.COLOR}
        backdropBlurType={attitude.backdropBlurType}
        backdropBlurAmount={attitude.backdropBlurAmount}
        style={Styles.BottomModal}
        onBackdropPress={() => MODAL.ON_BLUR(false)}>
          <KeyboardAvoidingView
            style={[
              Styles.ModalContent,
              attitude.style
            ]}>
              {_PRIMARY_MODAL_CONTENT_OVERLAY}

              <Icon
                name="indicator"
                style={Styles.ModalIndicator} />
              <View>
                {
                  attitude.children.map((child, i) => {
                    var childProps = {...child.props};

                    const ultimateKey = Functions._generateNewUniqueObjectKey()

                    childProps.key = childProps.name || ultimateKey;

                    return React.cloneElement(child, childProps);
                  })
                }
              </View>
          </KeyboardAvoidingView>
      </PrimaryModal>
    );
  }

  return _PRIMARY_MODAL_CONTENT;
}
