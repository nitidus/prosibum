import React, { Component } from 'react';

import { View, ScrollView, TouchableOpacity, Text, Dimensions, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Modules } from '../../styles/index';
import { Icon } from '../icon';
import { Modal } from '../modal';
import { Input, Carousel } from '../../components/index';
const Styles = Modules.Layouts.WalletModal;

import { Functions } from '../../modules/index';
const { Preparation } = Functions;

import { Layouts as LayoutsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.WalletModal;

import { layouts_constants } from '../../flows/knowledge/index';
const __CONSTANTS = layouts_constants.wallet_modal;

export const WalletModal = (props) => {
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

  if ((typeof props.data != 'undefined') || (typeof props.walletData != 'undefined') || (typeof props.wallet_data != 'undefined') || (typeof props.walletItems != 'undefined') || (typeof props.wallet_items != 'undefined') || (typeof props.currenciesData != 'undefined') || (typeof props.currencies_data != 'undefined') || (typeof props.currenciesItems != 'undefined') || (typeof props.currencies_items != 'undefined')){
    attitude.data = props.data || props.walletData || props.wallet_data || props.walletItems || props.wallet_items || props.currenciesData || props.currencies_data || props.currenciesItems || props.currencies_items;

    if (props.walletModal.currencies.length === 0 && attitude.data.length > 0){
      props.setCurrenciesItems(attitude.data);
    }
  }

  if ((typeof props.currentWalletItem != 'undefined') || (typeof props.current_wallet_item != 'undefined') || (typeof props.currentCurrenciesItem != 'undefined') || (typeof props.current_currencies_item != 'undefined')){
    attitude.currentWalletItem = props.currentWalletItem || props.current_wallet_item || props.currentCurrenciesItem || props.current_currencies_item;

    if (!props.walletModal.currentCurrency.hasOwnProperty('type') && attitude.currentWalletItem.hasOwnProperty('type')){
      props.setCurrentCurrency(attitude.currentWalletItem);
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
          ON_BLUR: (status) => attitude.onBlur(status),
          ON_PROGRESS_SUCCESS: async (response) => attitude.onProgressSuccess(response),
          ITEMS: {
            ACTIVE_OPACITY: 0.7
          }
        }

  var _CURRENCIES = [],
      _CURRENT_USER_GROUP_ROLE = '',
      _CURRENT_CURRENCY_INDEX = -1;

  if (attitude.visibility === true){
    _CURRENCIES = props.walletModal.currencies.map((currency, i) => {
      const _CURRENCY = currency;

      return Functions._returnCurrencyDependOnLanguage(_CURRENCY.type || _CURRENCY);
    }),
    _CURRENT_CURRENCY = Functions._returnCurrencyDependOnLanguage(props.walletModal.currentCurrency.type || props.walletModal.currentCurrency),
    _CURRENT_CURRENCY_INDEX = props.walletModal.currencies.findIndex((currency) => {
      const _CURRENCY = currency.type || currency,
            _CURRENT_CURRENCY = props.walletModal.currentCurrency.type || props.walletModal.currentCurrency;

      return (_CURRENT_CURRENCY === _CURRENCY);
    });
  }

  return (
    <Modal
      name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.title.en)}
      visible={attitude.visibility}
      backdropBlurType={MODAL.BACKDROP_BLUR_TYPE}
      onBlur={() => MODAL.ON_BLUR(false)}
      onPress={attitude.onPress}
      style={Styles.ModalContainer}>
        <View>
          <View
            style={Styles.ModalMajorContent}>
              <Input
                type={__CONSTANTS.modalContainer.content.firstInput.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstInput.title.en)}
                placeholder={__CONSTANTS.modalContainer.content.firstInput.title.en}
                value={props.walletModal.walletName}
                style={Styles.WalletNameInput}
                onChangeText={(currentValue) => props.setWalletName(currentValue)} />
          </View>

          <Carousel
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstCarouselContainer.title.en)}
            data={_CURRENCIES}
            style={Styles.WalletContainer}
            itemWidth={_Screen.width - (Styles.__Global.marginHorizontal * 2)}
            firstItem={_CURRENT_CURRENCY_INDEX}
            onLayout={({ item, i }) => {
              var _CURRENT_CURRENCY = Functions._returnCurrencyDependOnLanguage(props.walletModal.currentCurrency.type || props.walletModal.currentCurrency),
                  _CURRENCY_NAME = item.toLowerCase(),
                  _CURRENCY_VALUE = Functions._returnCurrencyDependOnLanguage(_CURRENCY_NAME);

              if (_CURRENT_CURRENCY === item){
                return (
                  <Input
                    type={__CONSTANTS.modalContainer.content.firstCarouselContainer.content.self.type}
                    name={_CURRENCY_NAME}
                    gradient={Global.colors.pair.aqrulean}
                    style={[
                      Styles.WalletItemContainer,
                      Styles.LTR_ContentAlignment
                    ]}
                    disable={true}>
                      <Text
                        style={Styles.WalletItemTitle}>
                          {_CURRENCY_VALUE}
                      </Text>
                      <Text
                        style={Styles.WalletItemSubtitle}>
                          {__CONSTANTS.modalContainer.content.firstCarouselContainer.content.self.title.en}
                      </Text>
                  </Input>
                );
              }else{
                return (
                  <Input
                    type={__CONSTANTS.modalContainer.content.firstCarouselContainer.content.self.type}
                    name={_CURRENCY_NAME}
                    gradient={Global.colors.pair.tilan}
                    style={[
                      Styles.WalletItemContainer,
                      Styles.LTR_ContentAlignment
                    ]}
                    disable={true}>
                      <Text
                        style={Styles.WalletItemTitle}>
                          {_CURRENCY_VALUE}
                      </Text>
                      <Text
                        style={Styles.WalletItemSubtitle}>
                          {__CONSTANTS.modalContainer.content.firstCarouselContainer.content.self.title.en}
                      </Text>
                  </Input>
                );
              }
            }}
            onSnap={(selectedItemIndex) => props.setCurrentCurrency(props.walletModal.currencies[selectedItemIndex])}/>

          <View
            style={Styles.ModalMajorContent}>
              <Input
                type={__CONSTANTS.modalContainer.content.submitInput.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.submitInput.state.normal.title.en)}
                value={__CONSTANTS.modalContainer.content.submitInput.state.normal.title.en}
                gradient={Global.colors.pair.ongerine}
                style={[
                  Styles.AppendRolesButton,
                  {
                    marginBottom: Styles.__Global.marginBottom
                  }
                ]}
                onPress={async () => {
                  // const _RULES = {
                  //   user_group_id: props.rolesModal.currentRole._id,
                  //   roles_count: props.rolesModal.roleCount
                  // };
                  //
                  // await props.appendRolesToResource(_RULES, (response, state) => {
                  //   MODAL.ON_PROGRESS_SUCCESS(response);
                  //   MODAL.ON_BLUR(state);
                  // });
                }}/>
          </View>
        </View>

    </Modal>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletModal);
