import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, I18nManager, Text, Image } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Views } from '../../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Pin } from '../../../assets/layouts/index';
import { Input, Link, Carousel } from '../../../assets/components/index';
import { Views as ViewsContainer } from '../../../assets/layouts/container/index';
const Styles = Views.Dashboard.WalletsSubsets.SelectedWallet,
      Container = ViewsContainer.Dashboard.Wallets.SelectedWalletContainer;

import { Views as ViewsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Dashboard.SelectedWallet;

import { views_constants, currencies as __CURRENCIES } from '../../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.dashboard.selected_wallet;

import { Functions } from '../../../assets/modules/index';
const { Preparation } = Functions;

class SelectedWallet extends Component<{}> {
  static navigationOptions = {

  };

  async _initializeTheSelectedWallet(props) {
    var attitude = {};

    if ((typeof props.data != 'undefined') || (typeof props.walletData != 'undefined') || (typeof props.wallet_data != 'undefined')){
      attitude.data = props.data || props.walletData || props.wallet_data;
    }else{
      const { navigation } = props,
            _ROUTE_PARAMS = navigation.state.params;

      if (typeof _ROUTE_PARAMS != 'undefined'){
        attitude.data = _ROUTE_PARAMS;
      }
    }

    if (Object.keys(props.selectedWallet.referenceWallet).length === 0){
      await props.setReferenceWallet(attitude.data);
      await props.fetchTransactions(attitude.data);
    }

    this.attitude = attitude;
  }

  async componentDidMount() {
    const { props } = this,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = _NATIVE_SETTINGS.language;

    props.setLanguage(_LANGUAGE);
    await this._initializeTheSelectedWallet(props);
  }

  async componentWillReceiveProps(props) {
    // this._initializeTheSelectedWallet(props);
  }

  render() {
    const { props } = this;

    if (Object.keys(props.selectedWallet.language).length > 0){
      var _LANGUAGE = Functions._convertTokenToKeyword(props.selectedWallet.language.key),
            containerOtherProps = {
              language: props.selectedWallet.language
            };

      if (props.selectedWallet.loadingTransactions){
        return (
          <View
            style={Styles.Container}>
              <ActivityIndicator />
          </View>
        );
      }else{
        if (!props.selectedWallet.connected.status){
          const _TOP_PINNED_TOAST = (
            <Toast
              message={props.wallets.connected.content}
              launched={!props.wallets.connected.status}
              color={Global.colors.single.carminePink}
              onPress={() => props.fetchAvailableWalletCurrenciesType()} />
          );

          return (
            <View
              style={Styles.Container}>
                {_TOP_PINNED_TOAST}
            </View>
          );
        }else{
          var _TAB_CONTENT,
              _CONTAINER_TITLE = '',
              _CONTAINER_SUBTITLE = '';

          if (props.selectedWallet.transactions.length > 0){
            const _POSSIBLE_SUBTITLE_SUFFIX_INDEX = __CURRENCIES.findIndex((item, i) => {
                    var _REFERENCE_WALLET_CURRENCY_SIGN = Functions._convertTokenToKey(props.selectedWallet.referenceWallet.currency.sign);

                    if ((_REFERENCE_WALLET_CURRENCY_SIGN === "TP") || (_REFERENCE_WALLET_CURRENCY_SIGN === "T.P") || (_REFERENCE_WALLET_CURRENCY_SIGN === "T.P.") || (_REFERENCE_WALLET_CURRENCY_SIGN === "TRANSACTION_POINT")){
                      _REFERENCE_WALLET_CURRENCY_SIGN = "TRANSACTION_POINT";
                    }

                    return (Functions._convertTokenToKey(item.title.en) === _REFERENCE_WALLET_CURRENCY_SIGN);
                  }),
                  _TARGET_SIGN = (_POSSIBLE_SUBTITLE_SUFFIX_INDEX > -1)? __CURRENCIES[_POSSIBLE_SUBTITLE_SUFFIX_INDEX].title[_LANGUAGE]: props.selectedWallet.referenceWallet.currency.sign;

            _CONTAINER_TITLE = Functions._convertKeywordToToken(Functions._stripLongString(props.selectedWallet.referenceWallet.name, 13));
            _CONTAINER_SUBTITLE = `${_TARGET_SIGN}${Functions._convertDigitsToMoneyFormat(props.selectedWallet.referenceWallet.balance)}`;

            if (I18nManager.isRTL){
              if ((_TARGET_SIGN === "ریال") || (_TARGET_SIGN === "تومان") || (_TARGET_SIGN === "درهم") || (_TARGET_SIGN === "لیر")){
                _CONTAINER_SUBTITLE = `${Functions._convertDigitsToMoneyFormat((props.selectedWallet.referenceWallet.balance * 10000), 0)} ${_TARGET_SIGN}`;
              }else if ((_TARGET_SIGN === "ترنزکشن پوینت")) {
                _CONTAINER_SUBTITLE = `${Functions._convertDigitsToMoneyFormat(props.selectedWallet.referenceWallet.balance)} ${_TARGET_SIGN}`;
              }
            }

            _TAB_CONTENT = (
              <ScrollView
                showsVerticalScrollIndicator={true}
                contentContainerStyle={[
                  {
                    direction: 'ltr',
                    paddingVertical: Styles.Content.marginVertical,
                    paddingHorizontal: Styles.Content.marginHorizontal
                  }
                ]}>
                  {
                    props.selectedWallet.transactions.map((transaction, i) => {
                      var _ITEM_STYLE = [
                            Styles.TransactionItemContainer,
                            Styles.LTR_ContentAlignment
                          ],
                          _ITEM_GRADIENT = Global.colors.pair.peroly,
                          _ITEM_TITLE = __CONSTANTS.transactions.state.withdraw.title[_LANGUAGE],
                          _ITEM_HUMAN_READABLE_CREATED_DATE = Functions._convertDateToHumanReadableFormat(transaction.created_at, _LANGUAGE),
                          _ITEM_BALANCE_DIFFERENCE_AMOUNT = Math.abs(transaction.new_balance - transaction.previous_balance);

                      if (transaction.new_balance > transaction.previous_balance){
                        _ITEM_GRADIENT = Global.colors.pair.aqrulean;
                        _ITEM_TITLE = __CONSTANTS.transactions.state.deposit.title[_LANGUAGE];
                      }

                      if (i !== (props.selectedWallet.transactions.length - 1)){
                        _ITEM_STYLE.push({
                          marginBottom: Styles.Content.marginVertical
                        });
                      }

                      var _PREVIOUS_BALANCE = `${__CONSTANTS.transactions.previous_balance.sign[_LANGUAGE]}${Functions._convertDigitsToMoneyFormat(transaction.previous_balance)} ${__CONSTANTS.transactions.previous_balance.suffix[_LANGUAGE]}`,
                          _NEW_BALANCE = `${__CONSTANTS.transactions.difference_balance.sign[_LANGUAGE]}${Functions._convertDigitsToMoneyFormat(_ITEM_BALANCE_DIFFERENCE_AMOUNT)} ${__CONSTANTS.transactions.difference_balance.suffix[_LANGUAGE]}`;

                      if (I18nManager.isRTL){
                        const _PREVIOUS_BALANCE_SIGN = __CONSTANTS.transactions.previous_balance.sign[_LANGUAGE],
                              _NEW_BALANCE_SIGN = __CONSTANTS.transactions.difference_balance.sign[_LANGUAGE];

                        if ((_PREVIOUS_BALANCE_SIGN === "ریال") || (_PREVIOUS_BALANCE_SIGN === "تومان") || (_PREVIOUS_BALANCE_SIGN === "درهم") || (_PREVIOUS_BALANCE_SIGN === "لیر")){
                          _PREVIOUS_BALANCE = `${Functions._convertDigitsToMoneyFormat((transaction.previous_balance * 10000), 0)} ${_PREVIOUS_BALANCE_SIGN} ${__CONSTANTS.transactions.previous_balance.suffix[_LANGUAGE]}`;
                        }else if ((_PREVIOUS_BALANCE_SIGN === "ترنزکشن پوینت")) {
                          _PREVIOUS_BALANCE = `${Functions._convertDigitsToMoneyFormat(transaction.previous_balance)} ${_PREVIOUS_BALANCE_SIGN} ${__CONSTANTS.transactions.previous_balance.suffix[_LANGUAGE]}`;
                        }

                        if ((_NEW_BALANCE_SIGN === "ریال") || (_NEW_BALANCE_SIGN === "تومان") || (_NEW_BALANCE_SIGN === "درهم") || (_NEW_BALANCE_SIGN === "لیر")){
                          _NEW_BALANCE = `${Functions._convertDigitsToMoneyFormat((_ITEM_BALANCE_DIFFERENCE_AMOUNT * 10000), 0)} ${_NEW_BALANCE_SIGN} ${__CONSTANTS.transactions.difference_balance.suffix[_LANGUAGE]}`;
                        }else if ((_NEW_BALANCE_SIGN === "ترنزکشن پوینت")) {
                          _NEW_BALANCE = `${Functions._convertDigitsToMoneyFormat(_ITEM_BALANCE_DIFFERENCE_AMOUNT)} ${_NEW_BALANCE_SIGN} ${__CONSTANTS.transactions.difference_balance.suffix[_LANGUAGE]}`;
                        }
                      }

                      return (
                        <Input
                          type={__CONSTANTS.transactions.type}
                          style={_ITEM_STYLE}
                          gradient={_ITEM_GRADIENT}
                          disable={true}>
                            <View
                              style={Styles.DetailItemMasterInfoContent}>
                              <Text
                                style={Styles.BriefDetailTitle}>
                                  {_ITEM_TITLE}
                              </Text>
                              <Text
                                style={Styles.BriefDetailSubtitle}>
                                  {_ITEM_HUMAN_READABLE_CREATED_DATE}
                              </Text>
                            </View>

                            <View
                              style={[
                                Styles.DetailItemMasterSubInfoContent,
                                {
                                  marginBottom: Styles.Content.marginVertical
                                }
                              ]}>
                                <View style={Styles.BriefDetailSubRowIconContainer}>
                                  <Icon
                                    name={__CONSTANTS.transactions.previous_balance.icon.name}
                                    color={Global.colors.single.romance}
                                    {...__CONSTANTS.transactions.previous_balance.icon.otherOptions} />
                                </View>
                                <Text
                                  style={Styles.BriefDetailRowText}>
                                    {_PREVIOUS_BALANCE}
                                </Text>
                            </View>
                            <View
                              style={[
                                Styles.DetailItemMasterSubInfoContent,
                                {
                                  marginBottom: Styles.Content.marginVertical
                                }
                              ]}>
                                <View style={Styles.BriefDetailSubRowIconContainer}>
                                  <Icon
                                    name={__CONSTANTS.transactions.difference_balance.icon.name}
                                    color={Global.colors.single.romance} />
                                </View>
                                <Text
                                  style={Styles.BriefDetailRowText}>
                                    {_NEW_BALANCE}
                                </Text>
                            </View>
                        </Input>
                      );
                    })
                  }
              </ScrollView>
            );
          }else {
            _TAB_CONTENT = (
              <View
                style={[
                  Styles.Content,
                  Styles.EmptyContent
                ]}>
                <Link
                  containerStyle={Styles.EmptyContentLink}
                  value={__CONSTANTS.link[_LANGUAGE]} />
              </View>
            );
          }

          return (
            <Container
              title={_CONTAINER_TITLE}
              subtitle={_CONTAINER_SUBTITLE}
              {...props}
              {...containerOtherProps}>
                {_TAB_CONTENT}
            </Container>
          );
        }
      }
    }else{
      return (
        <ActivityIndicator/>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWallet);
