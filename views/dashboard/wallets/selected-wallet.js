import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, Text, Image } from 'react-native';
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

import { views_constants } from '../../../assets/flows/knowledge/index';
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
    const { props } = this;

    this._initializeTheSelectedWallet(props);
  }

  async componentWillReceiveProps(props) {
    // this._initializeTheSelectedWallet(props);
  }

  render() {
    const { props } = this;

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
          const _POSSIBLE_SUBTITLE_SUFFIX_INDEX = __CONSTANTS.pilot.subtitle.suffix.findIndex((item, i) => {
                  var _REFERENCE_WALLET_CURRENCY_SIGN = Functions._convertTokenToKey(props.selectedWallet.referenceWallet.currency.sign);

                  if ((_REFERENCE_WALLET_CURRENCY_SIGN === "TP") || (_REFERENCE_WALLET_CURRENCY_SIGN === "T.P") || (_REFERENCE_WALLET_CURRENCY_SIGN === "T.P.") || (_REFERENCE_WALLET_CURRENCY_SIGN === "TRANSACTION_POINT")){
                    _REFERENCE_WALLET_CURRENCY_SIGN = "TRANSACTION_POINT";
                  }

                  return (Functions._convertTokenToKey(item.en) === _REFERENCE_WALLET_CURRENCY_SIGN);
                }),
                _TARGET_SIGN = (_POSSIBLE_SUBTITLE_SUFFIX_INDEX > -1)? __CONSTANTS.pilot.subtitle.suffix[_POSSIBLE_SUBTITLE_SUFFIX_INDEX].en: props.selectedWallet.referenceWallet.currency.sign;

          _CONTAINER_TITLE = Functions._convertKeywordToToken(Functions._stripLongString(props.selectedWallet.referenceWallet.name, 13));
          _CONTAINER_SUBTITLE = `${Functions._convertDigitsToMoneyFormat(props.selectedWallet.referenceWallet.balance)} ${_TARGET_SIGN}`;

          _TAB_CONTENT = (
            <ScrollView
              showsVerticalScrollIndicator={true}
              contentContainerStyle={Styles.Content}>
                {
                  props.selectedWallet.transactions.map((transaction, i) => {
                    var _ITEM_STYLE = [
                          Styles.TransactionItemContainer,
                          Styles.LTR_ContentAlignment
                        ],
                        _ITEM_GRADIENT = Global.colors.pair.peroly,
                        _ITEM_TITLE = __CONSTANTS.transactions.state.withdraw.title.en,
                        _ITEM_HUMAN_READABLE_CREATED_DATE = Functions._convertDateToHumanReadableFormat(transaction.created_at),
                        _ITEM_BALANCE_DIFFERENCE_AMOUNT = Math.abs(transaction.new_balance - transaction.previous_balance);

                    if (transaction.new_balance > transaction.previous_balance){
                      _ITEM_GRADIENT = Global.colors.pair.aqrulean;
                      _ITEM_TITLE = __CONSTANTS.transactions.state.deposit.title.en;
                    }

                    if (i !== (props.selectedWallet.transactions.length - 1)){
                      _ITEM_STYLE.push({
                        marginBottom: Styles.Content.marginVertical
                      });
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
                                  {`${__CONSTANTS.transactions.previous_balance.sign.en}${Functions._convertDigitsToMoneyFormat(transaction.previous_balance)} ${__CONSTANTS.transactions.previous_balance.suffix.en}`}
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
                                  {`${__CONSTANTS.transactions.difference_balance.sign.en}${Functions._convertDigitsToMoneyFormat(_ITEM_BALANCE_DIFFERENCE_AMOUNT)} ${__CONSTANTS.transactions.difference_balance.suffix.en}`}
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
                value={__CONSTANTS.link.en} />
            </View>
          );
        }

        return (
          <Container
            title={_CONTAINER_TITLE}
            subtitle={_CONTAINER_SUBTITLE}
            {...props}>
              {_TAB_CONTENT}
          </Container>
        );
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedWallet);
