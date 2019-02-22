import React, { Component } from 'react';

import { View, TouchableOpacity, Text, Dimensions, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Modules } from '../../styles/index';
import { ActivityIndicator } from '../activity-indicator';
import { Icon } from '../icon';
import { Modal } from '../modal';
import { Input, Carousel, Link } from '../../components/index';
const Styles = Modules.Layouts.WalletModal;

import { Functions } from '../../modules/index';
const { Preparation } = Functions;

import { Layouts as LayoutsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.WalletModal;

import { layouts_constants } from '../../flows/knowledge/index';
const __CONSTANTS = layouts_constants.wallet_modal;

const _componentWillCheckValidation = (props) => {
  const _PROPS = props.walletModal;

  var _FORM_FIELDS_VALIDITY = false;

  switch (_PROPS.currentHiddenTabIndex) {
    case 0:
    default:
      if ((_PROPS.walletName != '') && (Object.keys(_PROPS.currentCurrency).length > 0) && (typeof _PROPS.currentCurrency._id != 'undefined')){
        const _IS_WALLET_NAME_VALID = Functions._checkIsAValidTextOnlyField(_PROPS.walletName, 7);

        if (_IS_WALLET_NAME_VALID){
          _FORM_FIELDS_VALIDITY = true;
        }
      }
      break;
    case 1:
      if ((!isNaN(_PROPS.walletInitialCreditAmount)) && (_PROPS.walletInitialCreditAmount > 0)){
        const _IS_WALLET_INITIAL_CREDIT_AMOUNT_VALID = Functions._checkIsAValidNumericOnlyField(_PROPS.walletInitialCreditAmount, 2);

        if (_IS_WALLET_INITIAL_CREDIT_AMOUNT_VALID){
          _FORM_FIELDS_VALIDITY = true;
        }
      }
      break;
  }

  return !_FORM_FIELDS_VALIDITY;
}

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

  var _CURRENT_TAB_CONTENT;

  const _VALIDATED = _componentWillCheckValidation(props);

  switch (props.walletModal.currentHiddenTabIndex) {
    case 0:
    default:
      var _CURRENCIES = [],
          _CURRENT_USER_GROUP_ROLE = '',
          _CURRENT_CURRENCY_INDEX = -1,
          _CURRENCIES_CONTENT = (
            <Input
              type={__CONSTANTS.modalContainer.content.firstHiddenTab.firstCarouselContainer.content.self.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstHiddenTab.firstCarouselContainer.title.en)}
              gradient={Global.colors.pair.tilan}
              style={[
                Styles.WalletContainer,
                {
                  marginHorizontal: Styles.Content.marginHorizontal,
                  height: 102
                }
              ]}
              disable={true}>
                <ActivityIndicator/>
            </Input>
          );

      if ((attitude.visibility === true) && (props.walletModal.currencies.length > 0)){
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

        _CURRENCIES_CONTENT = (
          <Carousel
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstHiddenTab.firstCarouselContainer.title.en)}
            data={_CURRENCIES}
            style={Styles.WalletContainer}
            itemWidth={_Screen.width - (Styles.Content.marginHorizontal * 2)}
            firstItem={_CURRENT_CURRENCY_INDEX}
            onLayout={({ item, i }) => {
              var _CURRENT_CURRENCY = Functions._returnCurrencyDependOnLanguage(props.walletModal.currentCurrency.type || props.walletModal.currentCurrency),
                  _CURRENCY_NAME = item.toLowerCase(),
                  _CURRENCY_VALUE = Functions._returnCurrencyDependOnLanguage(_CURRENCY_NAME);

              if (_CURRENT_CURRENCY === item){
                return (
                  <Input
                    type={__CONSTANTS.modalContainer.content.firstHiddenTab.firstCarouselContainer.content.self.type}
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
                          {__CONSTANTS.modalContainer.content.firstHiddenTab.firstCarouselContainer.content.self.title.en}
                      </Text>
                  </Input>
                );
              }else{
                return (
                  <Input
                    type={__CONSTANTS.modalContainer.content.firstHiddenTab.firstCarouselContainer.content.self.type}
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
                          {__CONSTANTS.modalContainer.content.firstHiddenTab.firstCarouselContainer.content.self.title.en}
                      </Text>
                  </Input>
                );
              }
            }}
            onSnap={(selectedItemIndex) => props.setCurrentCurrency(props.walletModal.currencies[selectedItemIndex])}/>
        );
      }

      _CURRENT_TAB_CONTENT = [
        (
          <Input
            type={__CONSTANTS.modalContainer.content.firstHiddenTab.firstInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstHiddenTab.firstInput.title.en)}
            placeholder={__CONSTANTS.modalContainer.content.firstHiddenTab.firstInput.title.en}
            value={props.walletModal.walletName}
            style={Styles.WalletNameInput}
            onChangeText={(currentValue) => props.setWalletName(currentValue)} />
        ),
        _CURRENCIES_CONTENT,
        (
          <Input
            type={__CONSTANTS.modalContainer.content.firstHiddenTab.submitInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstHiddenTab.submitInput.state.normal.title.en)}
            value={__CONSTANTS.modalContainer.content.firstHiddenTab.submitInput.state.normal.title.en}
            gradient={Global.colors.pair.ongerine}
            style={[
              Styles.NormalContent,
              {
                marginBottom: Styles.Content.marginBottom
              }
            ]}
            onPress={() => {
              const _TARGET_INDEX = props.walletModal.currentHiddenTabIndex + 1;

              props.setCurrentHiddenTabIndex(_TARGET_INDEX);
            }}
            forcedDisable={_VALIDATED} />
        )
      ];
      break;
    case 1:
      _CURRENT_TAB_CONTENT = [
        (
          <Input
            type={__CONSTANTS.modalContainer.content.secondHiddenTab.firstInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.secondHiddenTab.firstInput.title.en)}
            placeholder={__CONSTANTS.modalContainer.content.secondHiddenTab.firstInput.title.en}
            value={props.walletModal.walletInitialCreditAmount}
            style={Styles.WalletNameInput}
            onChangeText={(currentValue) => props.setWalletInitialCreditAmount(currentValue)} />
        )
      ];

      if ((Object.keys(props.walletModal.currentCurrency).length > 0) && (typeof props.walletModal.currentCurrency.type != 'undefined')){
        const _CURRENT_CURRENCY_TYPE = Functions._convertTokenToKey(props.walletModal.currentCurrency.type);

        if ((_CURRENT_CURRENCY_TYPE === "RIAL") || (_CURRENT_CURRENCY_TYPE === "TOMAN")){
          _CURRENT_TAB_CONTENT = [
            ..._CURRENT_TAB_CONTENT,
            (
              <Input
                type={__CONSTANTS.modalContainer.content.secondHiddenTab.optionalLinkInput.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.secondHiddenTab.optionalLinkInput.state.normal.title.en)}
                value={__CONSTANTS.modalContainer.content.secondHiddenTab.optionalLinkInput.state.normal.title.en}
                gradient={Global.colors.pair.Brilue}
                style={[
                  Styles.NormalContent,
                  {
                    marginBottom: Styles.Content.marginBottom
                  }
                ]}
                onPress={() => {
                  const _TARGET_INDEX = props.walletModal.currentHiddenTabIndex + 1;

                  props.setCurrentHiddenTabIndex(_TARGET_INDEX);
                }} />
            )
          ];
        }

        _CURRENT_TAB_CONTENT = [
          ..._CURRENT_TAB_CONTENT,
          (
            <Input
              type={__CONSTANTS.modalContainer.content.secondHiddenTab.submitInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.secondHiddenTab.submitInput.state.normal.title.en)}
              value={__CONSTANTS.modalContainer.content.secondHiddenTab.submitInput.state.normal.title.en}
              gradient={Global.colors.pair.ongerine}
              style={[
                Styles.NormalContent,
                {
                  marginBottom: Styles.Content.marginVertical
                }
              ]}
              onPress={() => {
                var _INDEX_COEFFICIENT = 2;

                if ((Object.keys(props.walletModal.currentCurrency).length > 0) && (typeof props.walletModal.currentCurrency.type != 'undefined')){
                  const _CURRENT_CURRENCY_TYPE = Functions._convertTokenToKey(props.walletModal.currentCurrency.type);

                  if ((_CURRENT_CURRENCY_TYPE === "TP") || (_CURRENT_CURRENCY_TYPE === "T.P") || (_CURRENT_CURRENCY_TYPE === "T.P.") || (_CURRENT_CURRENCY_TYPE === "TRANSACTION_POINT")){
                    _INDEX_COEFFICIENT -= 1;
                  }
                }

                const _TARGET_INDEX = props.walletModal.currentHiddenTabIndex + _INDEX_COEFFICIENT;

                props.setCurrentHiddenTabIndex(_TARGET_INDEX);
              }}
              forcedDisable={_VALIDATED} />
          ),
          (
            <Link
              containerStyle={[
                Styles.NormalContent,
                Styles.Center_ContentAlignment
              ]}
              style={Styles.Center_TextAlignment}
              value={__CONSTANTS.modalContainer.content.secondHiddenTab.quickLink.title.en}
              onPress={() => {
                const _TARGET_INDEX = props.walletModal.currentHiddenTabIndex - 1;

                props.setCurrentHiddenTabIndex(_TARGET_INDEX);
              }} />
          )
        ];
      }
      break;
    case 2:
      var _PLANS_CONTENT = (
        <Input
          type={__CONSTANTS.modalContainer.content.thirdHiddenTab.firstCarousel.type}
          name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.thirdHiddenTab.firstCarousel.state.loading.title.en)}
          gradient={Global.colors.pair.tilan}
          style={[
            Styles.DetailItemContainer,
            {
              marginHorizontal: Styles.Content.marginHorizontal,
              marginBottom: Styles.Content.marginVertical
            }
          ]}
          disable={true}>
            <ActivityIndicator/>
        </Input>
      );

      if ((attitude.visibility === true) && (props.walletModal.walletInitialCreditPlansLoading === false)){
        if ((props.walletModal.walletInitialCreditPlans.length === 0) && (Object.keys(props.walletModal.walletCurrentInitialCreditPlan).length === 0)) {
          props.fetchWalletInitialCreditPlans();
        }else {
          // if (typeof props.walletModal.walletCurrentInitialCreditPlan.taxonomy != 'undefined'){
          //   if ((typeof props.walletModal.walletCurrentInitialCreditPlan.taxonomy.value != 'undefined') && (typeof props.walletModal.walletCurrentInitialCreditPlan.type != 'undefined')){
          //     const _CURRENT_PLAN_TAXONOMY_TYPE = Functions._convertTokenToKey(props.walletModal.walletCurrentInitialCreditPlan.taxonomy.value),
          //           _CURRENT_CURRENCY_TYPE = Functions._convertTokenToKey(props.walletModal.currentCurrency.type);
          //
          //     if (_CURRENT_PLAN_TAXONOMY_TYPE !== _CURRENT_CURRENCY_TYPE){
          //       props.fetchWalletInitialCreditPlans();
          //     }
          //   }
          // }

          const _PLANS_CAROUSEL_DATA = props.walletModal.walletInitialCreditPlans,
                _FIRST_INDEX = _PLANS_CAROUSEL_DATA.findIndex((planItem) => {
                  const _CURRENT_PLAN_TOKEN = props.walletModal.walletCurrentInitialCreditPlan._id,
                        _PLAN_TOKEN = planItem._id;

                  return (_CURRENT_PLAN_TOKEN === _PLAN_TOKEN);
                })

          _PLANS_CONTENT = (
            <Carousel
              name={__CONSTANTS.modalContainer.content.thirdHiddenTab.firstCarousel.state.normal.title.en}
              data={_PLANS_CAROUSEL_DATA}
              firstItem={_FIRST_INDEX}
              style={Styles.DetailContainer}
              itemWidth={_Screen.width - (Styles.Content.marginHorizontal * 2)}
              onLayout={({ item, i }) => {
                const _CURRENT_PLAN = props.walletModal.walletCurrentInitialCreditPlan,
                      _PLAN_NAME = Functions._convertKeywordToToken(item.name),
                      _PLAN_CURRENCY_TYPE = (Functions._convertTokenToKey(item.taxonomy.value) == 'TRANSACTION_POINT')? 'T.P': Functions._convertKeywordToToken(item.taxonomy.value),
                      _PLAN_PRICE = Functions._convertDigitsToMoneyFormat(item.price),
                      _PLAN_PRICE_SIGN = '$';

                var _ITEM_GRADIENT = Global.colors.pair.tilan;

                if (_CURRENT_PLAN._id === item._id){
                  _ITEM_GRADIENT = Global.colors.pair.analue;
                }

                return (
                  <Input
                    type={__CONSTANTS.modalContainer.content.thirdHiddenTab.firstCarousel.type}
                    name={__CONSTANTS.modalContainer.content.thirdHiddenTab.firstCarousel.state.normal.content.title.en}
                    gradient={_ITEM_GRADIENT}
                    style={[
                      Styles.DetailItemContainer,
                      Styles.LTR_ContentAlignment
                    ]}
                    disable={true}>
                      <View
                        style={Styles.DetailItemMasterInfoContent}>
                          <Text
                            style={Styles.BriefDetailTitle}>
                              {_PLAN_NAME} Plan
                          </Text>
                      </View>

                      <View
                        style={[
                          Styles.DetailItemMasterSubInfoContent,
                          {
                            marginBottom: Styles.Content.marginVertical
                          }
                        ]}>
                        <Icon
                          name={__CONSTANTS.modalContainer.content.thirdHiddenTab.firstCarousel.state.normal.content.quantityIcon}
                          style={Styles.BriefDetailSubRowIconContainer}
                          color={Global.colors.single.romance} />

                          <Text
                            style={Styles.BriefDetailRowText}>
                              {item.amount} {_PLAN_CURRENCY_TYPE}
                          </Text>
                      </View>
                      <View
                        style={Styles.DetailItemMasterSubInfoContent}>
                          <Icon
                            name={__CONSTANTS.modalContainer.content.thirdHiddenTab.firstCarousel.state.normal.content.priceIcon}
                            style={Styles.BriefDetailSubRowIconContainer}
                            color={Global.colors.single.romance} />

                          <Text
                            style={Styles.BriefDetailRowText}>
                              {_PLAN_PRICE_SIGN}{_PLAN_PRICE}
                          </Text>
                      </View>
                  </Input>
                );
              }}
              onSnap={(selectedItemIndex) => props.setWalletCurrentInitialCreditPlan(props.walletModal.walletInitialCreditPlans[selectedItemIndex])}/>
          );
        }
      }

      _CURRENT_TAB_CONTENT = [
        _PLANS_CONTENT,
        (
          <Input
            type={__CONSTANTS.modalContainer.content.thirdHiddenTab.submitInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.thirdHiddenTab.submitInput.state.normal.title.en)}
            value={__CONSTANTS.modalContainer.content.thirdHiddenTab.submitInput.state.normal.title.en}
            gradient={Global.colors.pair.ongerine}
            style={[
              Styles.NormalContent,
              {
                marginBottom: Styles.Content.marginVertical
              }
            ]}
            onPress={() => {
              const _TARGET_INDEX = props.walletModal.currentHiddenTabIndex + 1;

              props.setCurrentHiddenTabIndex(_TARGET_INDEX);
            }} />
        ),
        (
          <Link
            containerStyle={[
              Styles.NormalContent,
              Styles.Center_ContentAlignment
            ]}
            style={Styles.Center_TextAlignment}
            value={__CONSTANTS.modalContainer.content.thirdHiddenTab.quickLink.title.en}
            onPress={() => {
              const _TARGET_INDEX = props.walletModal.currentHiddenTabIndex - 1;

              props.setCurrentHiddenTabIndex(_TARGET_INDEX);
            }} />
        )
      ];
      break;
    case 3:
      _CURRENT_TAB_CONTENT = (
        <Text>Choose Payment Gateway</Text>
      )
      break;
  }

  if ((typeof _CURRENT_TAB_CONTENT != 'undefined') && (Array.isArray(_CURRENT_TAB_CONTENT))){
    _CURRENT_TAB_CONTENT = _CURRENT_TAB_CONTENT.map((item, i) => {
      return item;
    });
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
        {_CURRENT_TAB_CONTENT}
    </Modal>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletModal);
