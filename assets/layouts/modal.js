import React, { Component } from 'react';

import { View, Text, Animated, Platform, Easing } from 'react-native';
import PrimaryModal from "react-native-modal";
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

  if ((typeof props.backdropColor != 'undefined') || (typeof props.backdrop_color != 'undefined') || (typeof props.backdrop != 'undefined')){
    attitude.backdropColor = props.backdropColor || props.backdrop_color || props.backdrop;
  }

  if ((typeof props.swipeThreshold != 'undefined') || (typeof props.threshold != 'undefined')){
    attitude.swipeThreshold = props.swipeThreshold || props.threshold;
  }

  if ((typeof props.onBlur != 'undefined') || (typeof props.onModalBlur != 'undefined') || (typeof props.modalOnBlur != 'undefined') || (typeof props.onClose != 'undefined') || (typeof props.onModalClose != 'undefined') || (typeof props.modalOnClose != 'undefined')){
    attitude.onBlur = props.onBlur || props.onModalBlur || props.modalOnBlur || props.onClose || props.onModalClose || props.modalOnClose;
  }

  const MODAL = {
    BACKDROP: {
      COLOR: attitude.backdropColor || Global.colors.single.transparent,
      OPACITY: (Platform.OS === 'ios')? 0.4: 0.7
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
        backdropOpacity={MODAL.BACKDROP.OPACITY}
        swipeDirection={_SWIPE_DIRECTION}
        swipeThreshold={MODAL.SWIPE.THRESHOLD}
        style={Styles.BottomModal}
        onBackdropPress={() => MODAL.ON_BLUR(false)}
        onSwipe={() => MODAL.ON_BLUR(false)}>
          <View
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
          </View>
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
        backdropOpacity={MODAL.BACKDROP.OPACITY}
        style={Styles.BottomModal}
        onBackdropPress={() => MODAL.ON_BLUR(false)}>
          <View
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
          </View>
      </PrimaryModal>
    );
  }

  return (
    <View
      key={attitude.key}
      name={attitude.name}
      style={[
        Styles.Container
      ]}>
        {_PRIMARY_MODAL_CONTENT}
    </View>
  )
}
