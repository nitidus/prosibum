import React, { Component } from 'react';

import { View, Text, Dimensions, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Modules } from '../styles/index';
import { Icon } from './icon';
import Modal from './modal';
import { Input, Carousel } from '../components/index';
const Styles = Modules.Layouts.CountriesCodesModal;

import { Functions } from '../modules/index';

import { Layouts as LayoutsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.Modal;

import { countries } from '../flows/knowledge/countries.json';

export const CountriesCodesModal = (props) => {
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

  const _SELECTED_INDEX = countries.findIndex((country) => {
          const _SELECTED_COUNTRY_CODE = attitude.selectedItem.code,
                _COUNTRY_CODE = country.code;
          return (_COUNTRY_CODE === _SELECTED_COUNTRY_CODE);
        }),
        MODAL = {
          ON_BLUR: (status) => {
            attitude.onBlur(status);
            props.setModalVisibility(status);
          }
        };

  return (
    <Modal
      name="countries-codes-modal"
      visible={attitude.visibility}
      onBlur={attitude.onBlur}
      onPress={attitude.onPress}
      style={Styles.ModalContainer}>
        <View
          style={Styles.Container}>
            <Carousel
              name="group"
              data={countries}
              style={Styles.CarouselContainer}
              itemWidth={_Screen.width - (Styles.changeButton.marginHorizontal * 2)}
              firstItem={_SELECTED_INDEX}
              onLayout={({ item, i }) => {
                var _SELECTED_COUNTRY_CODE = attitude.selectedItem || 0,
                    _ITEM_NAME = item.code.toLowerCase(),
                    _ITEM_VALUE = (item.name.length > 21)? `${item.name.slice(0, 20)}...`: item.name,
                    _ITEM_AREA_CODE = item.area_code;

                if (_SELECTED_COUNTRY_CODE.code === item.code){
                  return (
                    <Input
                      type="BUTTON"
                      name={_ITEM_NAME}
                      gradient={Global.colors.pair.aqrulean}
                      disable={true}
                      style={Styles.CarouselItemContainer}>
                        <Text
                          style={Styles.CarouselItemTitle}>
                          {_ITEM_VALUE}
                        </Text>
                        <Text
                          style={Styles.CarouselItemSubtitle}>
                          {_ITEM_AREA_CODE}
                        </Text>
                    </Input>
                  );
                }else{
                  return (
                    <Input
                      type="BUTTON"
                      name={_ITEM_NAME}
                      gradient={Global.colors.pair.ongerine}
                      disable={true}
                      style={Styles.CarouselItemContainer}>
                        <Text
                          style={Styles.CarouselItemTitle}>
                          {_ITEM_VALUE}
                        </Text>
                        <Text
                          style={Styles.CarouselItemSubtitle}>
                          {_ITEM_AREA_CODE}
                        </Text>
                    </Input>
                  );
                }
              }}
              onSnap={(selectedItemIndex) => {
                attitude.onPress(countries[selectedItemIndex]);
              }}/>
            <Input
              style={Styles.changeButton}
              type="BUTTON"
              name="change-country-code"
              value="Change"
              gradient={Global.colors.pair.ongerine}
              onPress={() => MODAL.ON_BLUR(false)} />
        </View>
    </Modal>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(CountriesCodesModal);
