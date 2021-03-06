import React, { Component } from 'react';

import { View, TouchableOpacity, Text, Dimensions, Platform, I18nManager, Animated, Easing } from 'react-native';
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

import { layouts_constants, months as __MONTHS } from '../../flows/knowledge/index';
const __CONSTANTS = layouts_constants.modals.wallet_modal;

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
        const _IS_WALLET_INITIAL_CREDIT_AMOUNT_VALID = Functions._checkIsAValidNumericOnlyField(_PROPS.walletInitialCreditAmount.toString(), 2);

        if (_IS_WALLET_INITIAL_CREDIT_AMOUNT_VALID){
          _FORM_FIELDS_VALIDITY = true;
        }
      }
      break;
    case 3:
      if ((_PROPS.creditCard.number.extracted != '') && ((Object.keys(_PROPS.creditCard.expirationDate.month).length > 0) && (typeof _PROPS.creditCard.expirationDate.month.value != 'undefined')) && (_PROPS.creditCard.expirationDate.year != '') && (_PROPS.creditCard.cvv != '')){
        const _IS_CREDIT_CARD_NUMBER_VALID = Functions._checkIsAValidCreditCardNumber(_PROPS.creditCard.number.extracted),
              _IS_CREDIT_CARD_EXPIRATION_DATE_VALID = Functions._checkIsAValidCreditCardExpirationDate(_PROPS.creditCard.expirationDate.month.value.toString(), _PROPS.creditCard.expirationDate.year),
              _IS_CREDIT_CARD_CVV_VALID = Functions._checkIsAValidCreditCardCVV(_PROPS.creditCard.cvv);

        if (_IS_CREDIT_CARD_NUMBER_VALID && _IS_CREDIT_CARD_EXPIRATION_DATE_VALID && _IS_CREDIT_CARD_CVV_VALID){
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

  if ((typeof props.data != 'undefined') || (typeof props.wallet != 'undefined') || (typeof props.walletData != 'undefined') || (typeof props.wallet_data != 'undefined')){
    attitude.data = props.data || props.wallet || props.walletData || props.wallet_data;

    if ((Object.keys(attitude.data).length > 0) && (attitude.visibility === true)){
      const _TARGET_INDEX = props.walletModal.currentHiddenTabIndex + 1;

      if (Object.keys(props.walletModal.wallet).length > 0){
        if (props.walletModal.wallet._id !== attitude.data._id){
          props.setWallet(attitude.data);

          props.setCurrentHiddenTabIndex(_TARGET_INDEX);
        }
      }else{
        props.setWallet(attitude.data);

        props.setCurrentHiddenTabIndex(_TARGET_INDEX);
      }
    }
  }else{
    if ((typeof props.currenciesData != 'undefined') || (typeof props.currencies_data != 'undefined') || (typeof props.currenciesItems != 'undefined') || (typeof props.currencies_items != 'undefined')){
      attitude.currenciesData = props.currenciesData || props.currencies_data || props.currenciesItems || props.currencies_items;

      if ((props.walletModal.currencies.length === 0 && attitude.currenciesData.length > 0) && (attitude.visibility === true)){
        props.setCurrenciesItems(attitude.currenciesData);
      }
    }

    if ((typeof props.currentCurrenciesItem != 'undefined') || (typeof props.current_currencies_item != 'undefined')){
      attitude.currentCurrenciesItem = props.currentCurrenciesItem || props.current_currencies_item;

      if (!props.walletModal.currentCurrency.hasOwnProperty('type') && attitude.currentCurrenciesItem.hasOwnProperty('type') && (attitude.visibility === true)){
        props.setCurrentCurrency(attitude.currentCurrenciesItem);
      }
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

  attitude.language = (typeof props.language != 'undefined')? Functions._convertTokenToKeyword(props.language.key): 'en';

  const MODAL = {
          BACKDROP_BLUR_TYPE: "dark",
          ON_BLUR: (status) => {
            attitude.onBlur(status);
            props.resetModal();
          },
          ON_PROGRESS_SUCCESS: async (response) => attitude.onProgressSuccess(response),
          ITEMS: {
            ACTIVE_OPACITY: 0.7
          }
        };

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
          ),
          _CURRENCIES_CONTENT_SUBMIT_BUTTON = (
            <Input
              type={__CONSTANTS.modalContainer.content.firstHiddenTab.submitInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstHiddenTab.submitInput.state.normal.title.en)}
              value={__CONSTANTS.modalContainer.content.firstHiddenTab.submitInput.state.normal.title[attitude.language]}
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
          );

      if (_VALIDATED){
        if (props.walletModal.walletName != ''){
          const _IS_WALLET_NAME_VALID = Functions._checkIsAValidTextOnlyField(props.walletModal.walletName, 7);

          if (!_IS_WALLET_NAME_VALID){
            _CURRENCIES_CONTENT_SUBMIT_BUTTON = (
              <Input
                type={__CONSTANTS.modalContainer.content.firstHiddenTab.submitInput.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstHiddenTab.submitInput.state.normal.title.en)}
                value={__CONSTANTS.modalContainer.content.firstHiddenTab.verification.firstInput.warnning[attitude.language]}
                style={Styles.WarningContainer}
                textStyle={Styles.WarningContent} />
            );
          }
        }
      }

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

        let _FIRST_CAROUSEL_OTHER_OPTIONS = {},
            _ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((_CURRENCIES.length > 1)? ((Platform.OS !== 'ios')? 2: 2): 2);

        if (Platform.OS !== 'ios'){
          _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';

          if (I18nManager.isRTL){
            _FIRST_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = {
              flexDirection: 'row-reverse'
            };
          }
        }

        _CURRENCIES_CONTENT = (
          <Carousel
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstHiddenTab.firstCarouselContainer.title.en)}
            data={_CURRENCIES}
            style={Styles.WalletContainer}
            itemWidth={_Screen.width - (Styles.Content.marginHorizontal * _ITEM_WIDTH_COEFFICIENT)}
            firstItem={_CURRENT_CURRENCY_INDEX}
            onLayout={({ item, index }) => {
              var _UNKNOWN_LOCALE_CURRENT_CURRENCY = (props.walletModal.currentCurrency.type || props.walletModal.currentCurrency),
                  _CURRENT_CURRENCY = Functions._returnCurrencyDependOnLanguage(_UNKNOWN_LOCALE_CURRENT_CURRENCY);
                  _CURRENCY_NAME = item;
                  _CURRENCY_VALUE = _CURRENCY_NAME[attitude.language],
                  _ITEM_GRADIENT = Global.colors.pair.tilan;

              if (_CURRENT_CURRENCY.en === _CURRENCY_NAME.en){
                _ITEM_GRADIENT = Global.colors.pair.aqrulean;
              }

              return (
                <Input
                  type={__CONSTANTS.modalContainer.content.firstHiddenTab.firstCarouselContainer.content.self.type}
                  name={Functions._convertTokenToKeyword(_CURRENCY_NAME.en)}
                  gradient={_ITEM_GRADIENT}
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
                        {__CONSTANTS.modalContainer.content.firstHiddenTab.firstCarouselContainer.content.self.title[attitude.language]}
                    </Text>
                </Input>
              );
            }}
            onSnap={(selectedItemIndex) => props.setCurrentCurrency(props.walletModal.currencies[selectedItemIndex])}
            {..._FIRST_CAROUSEL_OTHER_OPTIONS}/>
        );
      }

      _CURRENT_TAB_CONTENT = [
        (
          <Input
            type={__CONSTANTS.modalContainer.content.firstHiddenTab.firstInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.firstHiddenTab.firstInput.title.en)}
            placeholder={__CONSTANTS.modalContainer.content.firstHiddenTab.firstInput.title[attitude.language]}
            value={props.walletModal.walletName}
            style={Styles.WalletNameInput}
            onChangeText={(currentValue) => props.setWalletName(currentValue)} />
        ),
        _CURRENCIES_CONTENT,
        _CURRENCIES_CONTENT_SUBMIT_BUTTON
      ];
      break;
    case 1:
      _CURRENT_TAB_CONTENT = [
        (
          <Input
            type={__CONSTANTS.modalContainer.content.secondHiddenTab.firstInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.secondHiddenTab.firstInput.title.en)}
            placeholder={__CONSTANTS.modalContainer.content.secondHiddenTab.firstInput.title[attitude.language]}
            value={(props.walletModal.walletInitialCreditAmount > 0)? props.walletModal.walletInitialCreditAmount.toString(): ''}
            style={Styles.WalletNameInput}
            onChangeText={(currentValue) => props.setWalletInitialCreditAmount((!isNaN(currentValue) && currentValue != '')? parseInt(currentValue): 0)} />
        )
      ];

      if (
        ((Object.keys(props.walletModal.currentCurrency).length > 0) && (typeof props.walletModal.currentCurrency.type != 'undefined')) ||
        (Object.keys(props.walletModal.wallet).length > 0)
      ){
        const _CURRENT_CURRENCY_TYPE = (Object.keys(props.walletModal.wallet).length > 0)? Functions._convertTokenToKey(props.walletModal.wallet.currency.type): Functions._convertTokenToKey(props.walletModal.currentCurrency.type);

        if ((_CURRENT_CURRENCY_TYPE === "TP") || (_CURRENT_CURRENCY_TYPE === "T.P") || (_CURRENT_CURRENCY_TYPE === "T.P.") || (_CURRENT_CURRENCY_TYPE === "TRANSACTION_POINT")){
          _CURRENT_TAB_CONTENT = [
            ..._CURRENT_TAB_CONTENT,
            (
              <Input
                type={__CONSTANTS.modalContainer.content.secondHiddenTab.optionalLinkInput.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.secondHiddenTab.optionalLinkInput.state.normal.title.en)}
                value={__CONSTANTS.modalContainer.content.secondHiddenTab.optionalLinkInput.state.normal.title[attitude.language]}
                gradient={Global.colors.pair.Brilue}
                style={[
                  Styles.NormalContent,
                  {
                    marginBottom: Styles.Content.marginVertical
                  }
                ]}
                onPress={() => {
                  const _TARGET_INDEX = props.walletModal.currentHiddenTabIndex + 1;

                  props.setCurrentHiddenTabIndex(_TARGET_INDEX);
                  props.setWalletInitialCreditAmount(0);
                }} />
            )
          ];
        }

        var _CREDIT_AMOUNT_CONTENT_SUBMIT_BUTTON = (
          <Input
            type={__CONSTANTS.modalContainer.content.secondHiddenTab.submitInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.secondHiddenTab.submitInput.state.normal.title.en)}
            value={__CONSTANTS.modalContainer.content.secondHiddenTab.submitInput.state.normal.title[attitude.language]}
            gradient={Global.colors.pair.ongerine}
            style={[
              Styles.NormalContent,
              {
                marginBottom: Styles.Content.marginVertical
              }
            ]}
            onPress={() => {
              var _INDEX_COEFFICIENT = 2;

              const _TARGET_INDEX = props.walletModal.currentHiddenTabIndex + 2;

              props.setCurrentHiddenTabIndex(_TARGET_INDEX);
            }}
            forcedDisable={_VALIDATED} />
        );

        if (_VALIDATED){
          if (props.walletModal.walletInitialCreditAmount > 0){
            const _IS_WALLET_INITIAL_CREDIT_AMOUNT_VALID = Functions._checkIsAValidNumericOnlyField(props.walletModal.walletInitialCreditAmount.toString(), 2);

            if (!_IS_WALLET_INITIAL_CREDIT_AMOUNT_VALID){
              _CREDIT_AMOUNT_CONTENT_SUBMIT_BUTTON = (
                <Input
                  type={__CONSTANTS.modalContainer.content.secondHiddenTab.submitInput.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.secondHiddenTab.submitInput.state.normal.title.en)}
                  value={__CONSTANTS.modalContainer.content.secondHiddenTab.verification.firstInput.warnning[attitude.language]}
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
        }

        _CURRENT_TAB_CONTENT = [
          ..._CURRENT_TAB_CONTENT,
          _CREDIT_AMOUNT_CONTENT_SUBMIT_BUTTON
        ];

        if (Object.keys(props.walletModal.wallet).length === 0){
          _CURRENT_TAB_CONTENT.push(
            <Link
              containerStyle={[
                Styles.NormalContent,
                Styles.Center_ContentAlignment
              ]}
              style={Styles.Center_TextAlignment}
              value={__CONSTANTS.modalContainer.content.secondHiddenTab.quickLink.title[attitude.language]}
              onPress={() => {
                const _TARGET_INDEX = props.walletModal.currentHiddenTabIndex - 1;

                props.setCurrentHiddenTabIndex(_TARGET_INDEX);
              }} />
          );
        }
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
                });

          let _FIRST_CAROUSEL_OTHER_OPTIONS = {},
              _ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((_PLANS_CAROUSEL_DATA.length > 1)? ((Platform.OS !== 'ios')? 2: 2): 2);

          if (Platform.OS !== 'ios'){
            _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';

            if (I18nManager.isRTL){
              _FIRST_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = {
                flexDirection: 'row-reverse'
              };
            }
          }

          _PLANS_CONTENT = (
            <Carousel
              name={__CONSTANTS.modalContainer.content.thirdHiddenTab.firstCarousel.state.normal.title.en}
              data={_PLANS_CAROUSEL_DATA}
              firstItem={_FIRST_INDEX}
              style={Styles.DetailContainer}
              itemWidth={_Screen.width - (Styles.Content.marginHorizontal * _ITEM_WIDTH_COEFFICIENT)}
              onLayout={({ item, index }) => {
                const _CURRENT_PLAN = props.walletModal.walletCurrentInitialCreditPlan,
                      _PLAN_NAME = Functions._convertKeywordToToken(item.name),
                      _PLAN_CURRENCY_TYPE = (Functions._convertTokenToKey(item.taxonomy.value) == 'TRANSACTION_POINT')? ((attitude.language == 'fa')? 'ترنزکشن پوینت': 'T.P'): Functions._convertKeywordToToken(item.taxonomy.value),
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
                              {_PLAN_NAME} {(attitude.language == 'fa')? 'طرح': 'Plan'}
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
              onSnap={(selectedItemIndex) => props.setWalletCurrentInitialCreditPlan(props.walletModal.walletInitialCreditPlans[selectedItemIndex])}
              {..._FIRST_CAROUSEL_OTHER_OPTIONS}/>
          );
        }
      }

      _CURRENT_TAB_CONTENT = [
        _PLANS_CONTENT,
        (
          <Input
            type={__CONSTANTS.modalContainer.content.thirdHiddenTab.submitInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.thirdHiddenTab.submitInput.state.normal.title.en)}
            value={__CONSTANTS.modalContainer.content.thirdHiddenTab.submitInput.state.normal.title[attitude.language]}
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
            value={__CONSTANTS.modalContainer.content.thirdHiddenTab.quickLink.title[attitude.language]}
            onPress={() => {
              const _TARGET_INDEX = props.walletModal.currentHiddenTabIndex - 1;

              props.setCurrentHiddenTabIndex(_TARGET_INDEX);
            }} />
        )
      ];
      break;
    case 3:
      var _EXPIRATION_MONTH_CONTENT = _EXPIRATION_YEAR_CONTENT = (
        <Input
          type={__CONSTANTS.modalContainer.content.fourthHiddenTab.firstCarousel.type}
          name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.fourthHiddenTab.firstCarousel.title.en)}
          gradient={Global.colors.pair.tilan}
          style={{
            marginHorizontal: Styles.Content.marginHorizontal,
            marginBottom: Styles.Content.marginVertical
          }}
          disable={true}>
            <ActivityIndicator/>
        </Input>
      );

      var _SELECTED_MONTH_INDEX = (Object.keys(props.walletModal.creditCard.expirationDate.month).length > 0)? __MONTHS[attitude.language].findIndex((monthItem, i) => {
            return monthItem.name === props.walletModal.creditCard.expirationDate.month.name;
          }): 0,
          _SELECTED_YEARS_RANGE = Functions._createYearArrayFromToday(),
          _SELECTED_YEAR_INDEX = (props.walletModal.creditCard.expirationDate.year !== '')? _SELECTED_YEARS_RANGE.findIndex((yearItem, i) => {
            return (parseInt(yearItem) === parseInt(props.walletModal.creditCard.expirationDate.year));
          }): 1;

      if (Object.keys(props.walletModal.creditCard.expirationDate.month).length === 0){
        props.setCreditCardExpirationMonth({
          name: __MONTHS[attitude.language][_SELECTED_MONTH_INDEX].name,
          value: (_SELECTED_MONTH_INDEX + 1).toString()
        });
      }

      if (props.walletModal.creditCard.expirationDate.year === ''){
        props.setCreditCardExpirationYear(_SELECTED_YEARS_RANGE[_SELECTED_YEAR_INDEX].toString());
      }

      const _EXPIRATION_DATE_CAROUSEL_ITEM_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? ((Platform.OS === 'ios')? 2.9: 2.8): 6;

      if (__MONTHS[attitude.language].length > 0){
        let _FIRST_CAROUSEL_OTHER_OPTIONS = {};

        if (Platform.OS !== 'ios'){
          _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';
          _FIRST_CAROUSEL_OTHER_OPTIONS.loop = true;

          if (I18nManager.isRTL){
            _FIRST_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = {
              flexDirection: 'row-reverse'
            };
          }
        }

        _EXPIRATION_MONTH_CONTENT = (
          <Carousel
            name={__CONSTANTS.modalContainer.content.fourthHiddenTab.firstCarousel.title.en}
            data={__MONTHS[attitude.language]}
            style={{
              marginBottom: Styles.Content.marginVertical
            }}
            firstItem={_SELECTED_MONTH_INDEX}
            itemWidth={_Screen.width - (Styles.Content.marginHorizontal * _EXPIRATION_DATE_CAROUSEL_ITEM_COEFFICIENT)}
            onLayout={({ item, index }) => {
              const _ITEM_CORRECT_INDEX = __MONTHS[attitude.language].findIndex((monthItem, i) => {
                return monthItem.name === item.name;
              }) + 1;

              var _ITEM_GRADIENT = Global.colors.pair.tilan;

              if (_SELECTED_MONTH_INDEX === (_ITEM_CORRECT_INDEX - 1)){
                _ITEM_GRADIENT = Global.colors.pair.analue;
              }

              return (
                <Input
                  type={__CONSTANTS.modalContainer.content.fourthHiddenTab.firstCarousel.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.fourthHiddenTab.firstCarousel.content.title.en)}
                  value={`${item.name}${__CONSTANTS.modalContainer.content.fourthHiddenTab.firstCarousel.content.splitter[attitude.language]} ${_ITEM_CORRECT_INDEX}`}
                  gradient={_ITEM_GRADIENT} />
              );
            }}
            onSnap={(selectedItemIndex) => {
              if (props.walletModal.connected.status === false){
                props.resetConnection();
              }

              props.setCreditCardExpirationMonth({
                name: __MONTHS[attitude.language][selectedItemIndex].name,
                value: selectedItemIndex + 1
              })
            }}
            {..._FIRST_CAROUSEL_OTHER_OPTIONS}/>
        );
      }

      if (_SELECTED_YEARS_RANGE.length > 0){
        let _SECOND_CAROUSEL_OTHER_OPTIONS = {};

        if (Platform.OS !== 'ios'){
          _SECOND_CAROUSEL_OTHER_OPTIONS.layout = 'default';
          _SECOND_CAROUSEL_OTHER_OPTIONS.loop = true;

          if (I18nManager.isRTL){
            _SECOND_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = {
              flexDirection: 'row-reverse'
            };
          }
        }

        _EXPIRATION_YEAR_CONTENT = (
          <Carousel
            name={__CONSTANTS.modalContainer.content.fourthHiddenTab.secondCarousel.title.en}
            data={_SELECTED_YEARS_RANGE}
            style={{
              marginBottom: Styles.Content.marginVertical
            }}
            firstItem={_SELECTED_YEAR_INDEX}
            itemWidth={_Screen.width - (Styles.Content.marginHorizontal * _EXPIRATION_DATE_CAROUSEL_ITEM_COEFFICIENT)}
            onLayout={({ item, index }) => {
              const _ITEM_CORRECT_INDEX = _SELECTED_YEARS_RANGE.findIndex((yearItem, i) => {
                return parseInt(yearItem) === parseInt(item);
              }) + 1;

              var _ITEM_GRADIENT = Global.colors.pair.tilan;

              if (_SELECTED_YEAR_INDEX === (_ITEM_CORRECT_INDEX - 1)){
                _ITEM_GRADIENT = Global.colors.pair.analue;
              }

              return (
                <Input
                  type={__CONSTANTS.modalContainer.content.fourthHiddenTab.secondCarousel.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.fourthHiddenTab.secondCarousel.content.title.en)}
                  value={item}
                  gradient={_ITEM_GRADIENT} />
              );
            }}
            onSnap={(selectedItemIndex) => {
              if (props.walletModal.connected.status === false){
                props.resetConnection();
              }

              props.setCreditCardExpirationYear(_SELECTED_YEARS_RANGE[selectedItemIndex].toString());
            }}
            {..._SECOND_CAROUSEL_OTHER_OPTIONS}/>
        );
      }

      var _FINAL_BUTTON;

      if (props.walletModal.appendToResourcesLoading === true){
        _FINAL_BUTTON = (
          <Input
            type={__CONSTANTS.modalContainer.content.fourthHiddenTab.submitInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.fourthHiddenTab.submitInput.state.normal.title.en)}
            value={__CONSTANTS.modalContainer.content.fourthHiddenTab.submitInput.state.normal.title[attitude.language]}
            gradient={Global.colors.pair.ongerine}
            style={[
              Styles.NormalContent,
              {
                marginBottom: Styles.Content.marginVertical
              }
            ]}>
              <ActivityIndicator/>
          </Input>
        );
      }else{
        _FINAL_BUTTON = (
          <Input
            type={__CONSTANTS.modalContainer.content.fourthHiddenTab.submitInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.fourthHiddenTab.submitInput.state.normal.title.en)}
            value={__CONSTANTS.modalContainer.content.fourthHiddenTab.submitInput.state.normal.title[attitude.language]}
            gradient={Global.colors.pair.ongerine}
            style={[
              Styles.NormalContent,
              {
                marginBottom: Styles.Content.marginVertical
              }
            ]}
            onPress={async () => await Preparation._prepareWalletTransaction(props, { attitude, MODAL })}
            forcedDisable={_VALIDATED} />
        );

        if (_VALIDATED){
          let _MESSAGE = '';

          if ((props.walletModal.creditCard.number.extracted != '')){
            const _IS_CREDIT_CARD_NUMBER_VALID = (props.walletModal.creditCard.number.extracted.length === 16)? true: false;

            if (!_IS_CREDIT_CARD_NUMBER_VALID){
              _MESSAGE += (_MESSAGE != '')? `\n${__CONSTANTS.modalContainer.content.fourthHiddenTab.verification.firstInput.warnning[attitude.language]}`: __CONSTANTS.modalContainer.content.fourthHiddenTab.verification.firstInput.warnning[attitude.language];
            }
          }

          if (props.walletModal.creditCard.cvv != ''){
            const _IS_CREDIT_CARD_CVV_VALID = Functions._checkIsAValidCreditCardCVV(props.walletModal.creditCard.cvv);

            if (!_IS_CREDIT_CARD_CVV_VALID){
              _MESSAGE += (_MESSAGE != '')? `\n${__CONSTANTS.modalContainer.content.fourthHiddenTab.verification.secondInput.warnning[attitude.language]}`: __CONSTANTS.modalContainer.content.fourthHiddenTab.verification.secondInput.warnning[attitude.language];
            }
          }

          if (_MESSAGE != ''){
            _FINAL_BUTTON = (
              <Input
                type={__CONSTANTS.modalContainer.content.fourthHiddenTab.submitInput.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.fourthHiddenTab.submitInput.state.normal.title.en)}
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
        }else{
          if (!props.walletModal.connected.status){
            let _ERROR_MESSAGE = props.walletModal.connected.content;

            if (typeof props.walletModal.connected.code != 'undefined'){
              if (typeof props.walletModal.connected.decline_code != 'undefined'){
                _ERROR_MESSAGE = Functions._getAppropriateMessageBaseOnLocale(props.walletModal.connected.decline_code, attitude.language);
              }else{
                _ERROR_MESSAGE = Functions._getAppropriateMessageBaseOnLocale(props.walletModal.connected.code, attitude.language);
              }
            }else{
              if (typeof props.walletModal.connected.raw_type != 'undefined'){
                _ERROR_MESSAGE = Functions._getAppropriateMessageBaseOnLocale(props.walletModal.connected.raw_type, attitude.language);
              }
            }

            _FINAL_BUTTON = (
              <Input
                type={__CONSTANTS.modalContainer.content.fourthHiddenTab.submitInput.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.fourthHiddenTab.submitInput.state.normal.title.en)}
                value={_ERROR_MESSAGE}
                style={[
                  Styles.WarningContainer,
                  {
                    backgroundColor: Global.colors.single.carminePink,
                    marginBottom: Styles.Content.marginVertical
                  }
                ]}
                textStyle={Styles.WarningContent}
                onPress={async () => await Preparation._prepareWalletTransaction(props, { attitude, MODAL })} />
            );
          }
        }
      }

      _CURRENT_TAB_CONTENT = [
        (
          <Input
            type={__CONSTANTS.modalContainer.content.fourthHiddenTab.firstInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.fourthHiddenTab.firstInput.title.en)}
            placeholder={__CONSTANTS.modalContainer.content.fourthHiddenTab.firstInput.title[attitude.language]}
            style={[
              Styles.NormalContent,
              {
                marginBottom: Styles.Content.marginVertical
              }
            ]}
            value={props.walletModal.creditCard.number.formatted}
            onChangeText={(currentValue) => {
              if (props.walletModal.connected.status === false){
                props.resetConnection();
              }

              props.setCreditCardNumber({
                formatted: currentValue,
                extracted: currentValue.replace(/\s+/g, '')
              })
            }}
            maxLength={19} />
        ),
        _EXPIRATION_MONTH_CONTENT,
        _EXPIRATION_YEAR_CONTENT,
        (
          <Input
            type={__CONSTANTS.modalContainer.content.fourthHiddenTab.secondInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.fourthHiddenTab.secondInput.title.en)}
            placeholder={__CONSTANTS.modalContainer.content.fourthHiddenTab.secondInput.title[attitude.language]}
            style={[
              Styles.NormalContent,
              {
                marginBottom: Styles.Content.marginVertical
              }
            ]}
            value={props.walletModal.creditCard.cvv}
            onChangeText={(currentValue) => {
              if (props.walletModal.connected.status === false){
                props.resetConnection();
              }

              props.setCreditCardCVV(currentValue);
            }}
            maxLength={3} />
        ),
        _FINAL_BUTTON,
        (
          <Link
            containerStyle={[
              Styles.NormalContent,
              Styles.Center_ContentAlignment
            ]}
            style={Styles.Center_TextAlignment}
            value={((Object.keys(props.walletModal.walletCurrentInitialCreditPlan).length > 0) && (props.walletModal.walletInitialCreditPlans.length > 0))?__CONSTANTS.modalContainer.content.fourthHiddenTab.quickLink.state.plan.title[attitude.language]: __CONSTANTS.modalContainer.content.fourthHiddenTab.quickLink.state.normal.title[attitude.language]}
            onPress={() => {
              var _INDEX_COEFFICIENT = 2;

              if ((Object.keys(props.walletModal.walletCurrentInitialCreditPlan).length > 0) && (props.walletModal.walletInitialCreditPlans.length > 0)){
                if (props.walletModal.walletInitialCreditAmount === 0){
                  _INDEX_COEFFICIENT -= 1;
                }
              }

              props.setCurrentHiddenTabIndex(props.walletModal.currentHiddenTabIndex - _INDEX_COEFFICIENT);
            }} />
        )
      ];
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
