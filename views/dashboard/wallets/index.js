import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, Keyboard, I18nManager, Text, Image } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Views } from '../../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Pin } from '../../../assets/layouts/index';
import { Input, Link, Carousel } from '../../../assets/components/index';
import { Views as ViewsContainer } from '../../../assets/layouts/container/index';
const Styles = Views.Dashboard.Wallets,
      Container = ViewsContainer.Dashboard.WalletsContainer;

import { Views as ViewsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Dashboard.Wallets;

import { views_constants } from '../../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.dashboard.wallets;

import { Functions } from '../../../assets/modules/index';
const { Preparation } = Functions;

class Wallets extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = _NATIVE_SETTINGS.language;

    this._language = _LANGUAGE;

    await props.fetchAvailableWalletCurrenciesType();
    this.otherProps = {};
  }

  render() {
    const { props, otherProps } = this;

    if (typeof this._language != 'undefined'){
      const _LANGUAGE = Functions._convertTokenToKeyword(this._language.key),
            containerOtherProps = {
              language: this._language
            };

      if (props.wallets.loadingWalletCurrenciesType){
        return (
          <View
            style={Styles.Container}>
              <ActivityIndicator />
          </View>
        );
      }else{
        if (!props.wallets.connected.status){
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
              OTHER_PROPS = otherProps || {};

          if (props.wallets.loadingWallets){
            _TAB_CONTENT = (
              <View
                style={Styles.Content}>
                <Input
                  type={__CONSTANTS.firstCarousel.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarousel.title.en)}
                  style={[
                    Styles.WalletItemContainer,
                    Styles.WalletItemContainerWithEmptyPositionContent
                  ]}
                  disable={true}>
                    <ActivityIndicator />
                </Input>
              </View>
            );
          }else{
            if (props.wallets.wallets.length > 0){
              const _SELECTED_WALLET_INDEX = props.wallets.wallets.findIndex((wallet, i) => {
                      return wallet._id === props.wallets.selectedWallet._id;
                    });

              var _LOCALE_BASED_PIN_SUBTITLE = `${__CONSTANTS.firstPin.subtitle.sign[_LANGUAGE]}${Functions._convertDigitsToMoneyFormat(props.wallets.selectedWallet.transactions.withdraw)} ${__CONSTANTS.firstPin.subtitle.suffix[_LANGUAGE]}`;

              if (I18nManager.isRTL){
                const _TARGET_WITHDRAW_SIGN = __CONSTANTS.firstPin.subtitle.sign[_LANGUAGE];

                if ((_TARGET_WITHDRAW_SIGN === "ریال") || (_TARGET_WITHDRAW_SIGN === "تومان") || (_TARGET_WITHDRAW_SIGN === "درهم") || (_TARGET_WITHDRAW_SIGN === "لیر")){
                  _LOCALE_BASED_PIN_SUBTITLE = `${Functions._convertDigitsToMoneyFormat((props.wallets.selectedWallet.transactions.withdraw * 10000), 0)} ${_TARGET_WITHDRAW_SIGN} ${__CONSTANTS.firstPin.subtitle.suffix[_LANGUAGE]}`;
                }else if ((_TARGET_WITHDRAW_SIGN === "ترنزکشن پوینت")) {
                  _LOCALE_BASED_PIN_SUBTITLE = `${Functions._convertDigitsToMoneyFormat(props.wallets.selectedWallet.transactions.withdraw)} ${_TARGET_WITHDRAW_SIGN} ${__CONSTANTS.firstPin.subtitle.suffix[_LANGUAGE]}`;
                }
              }

              let _FIRST_CAROUSEL_OTHER_OPTIONS = {},
                  _ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((props.wallets.wallets.length > 1)? ((Platform.OS !== 'ios')? 4: 2): 2);

              if (Platform.OS !== 'ios'){
                _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';

                if (I18nManager.isRTL){
                  _FIRST_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = {
                    flexDirection: 'row-reverse'
                  };
                }
              }

              _TAB_CONTENT = (
                <View
                  style={{flex: 1}}>
                    <Carousel
                      name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarousel.title.en)}
                      data={props.wallets.wallets}
                      style={{
                        marginVertical: Styles.Content.marginVertical,
                        direction: 'ltr'
                      }}
                      firstItem={_SELECTED_WALLET_INDEX}
                      itemWidth={_Screen.width - (Styles.Content.marginHorizontal * _ITEM_WIDTH_COEFFICIENT)}
                      onLayout={({ item, index }) => {
                        var _ITEM_GRADIENT = Global.colors.pair.tilan,
                            _WALLET_TRANSACTIONS_AMOUNT_SUFFIX = `${__CONSTANTS.firstCarousel.items.content.transactionsAmount.suffix[_LANGUAGE]}${((item.transactions.amount > 1) && (_LANGUAGE == 'en'))? 's': ''}`;

                        if (_SELECTED_WALLET_INDEX === index){
                          _ITEM_GRADIENT = Global.colors.pair.analue;
                        }

                        var _LOCALE_BASED_DEPOSIT = `${__CONSTANTS.firstCarousel.items.content.transactionsDeposit.sign[_LANGUAGE]}${Functions._convertDigitsToMoneyFormat(item.transactions.deposit)} ${__CONSTANTS.firstCarousel.items.content.transactionsDeposit.suffix[_LANGUAGE]}`;

                        if (I18nManager.isRTL){
                          const _TARGET_DEPOSIT_SIGN = __CONSTANTS.firstCarousel.items.content.transactionsDeposit.sign[_LANGUAGE];

                          if ((_TARGET_DEPOSIT_SIGN === "ریال") || (_TARGET_DEPOSIT_SIGN === "تومان") || (_TARGET_DEPOSIT_SIGN === "درهم") || (_TARGET_DEPOSIT_SIGN === "لیر")){
                            _LOCALE_BASED_DEPOSIT = `${Functions._convertDigitsToMoneyFormat((item.transactions.deposit * 10000), 0)} ${_TARGET_DEPOSIT_SIGN} ${__CONSTANTS.firstCarousel.items.content.transactionsDeposit.suffix[_LANGUAGE]}`;
                          }else if ((_TARGET_DEPOSIT_SIGN === "ترنزکشن پوینت")) {
                            _LOCALE_BASED_DEPOSIT = `${Functions._convertDigitsToMoneyFormat(item.transactions.deposit)} ${_TARGET_DEPOSIT_SIGN} ${__CONSTANTS.firstCarousel.items.content.transactionsDeposit.suffix[_LANGUAGE]}`;
                          }
                        }

                        return (
                          <Input
                            type={__CONSTANTS.firstCarousel.type}
                            name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarousel.items.title.en)}
                            style={[
                              Styles.WalletItemContainer,
                              Styles.LTR_ContentAlignment
                            ]}
                            gradient={_ITEM_GRADIENT}
                            disable={true}>
                              <View
                                style={Styles.DetailItemMasterInfoContent}>
                                  <Text
                                    style={Styles.BriefDetailTitle}>
                                      {Functions._convertKeywordToToken(item.name)}
                                  </Text>
                                  <Text
                                    style={Styles.BriefDetailSubtitle}>
                                      {Functions._convertDateToHumanReadableFormat(item.created_at, _LANGUAGE)}
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
                                      name={__CONSTANTS.firstCarousel.items.content.transactionsAmount.icon}
                                      color={Global.colors.single.romance} />
                                  </View>
                                  <Text
                                    style={Styles.BriefDetailRowText}>
                                      {item.transactions.amount} {_WALLET_TRANSACTIONS_AMOUNT_SUFFIX}
                                  </Text>
                              </View>
                              <View
                                style={Styles.DetailItemMasterSubInfoContent}>
                                  <View style={Styles.BriefDetailSubRowIconContainer}>
                                    <Icon
                                      name={__CONSTANTS.firstCarousel.items.content.transactionsDeposit.icon}
                                      color={Global.colors.single.romance} />
                                  </View>
                                  <Text
                                    style={Styles.BriefDetailRowText}>
                                      {_LOCALE_BASED_DEPOSIT}
                                  </Text>
                              </View>
                          </Input>
                        );
                      }}
                      onSnap={(selectedItemIndex) => props.setSelectedWallet(props.wallets.wallets[selectedItemIndex])}
                      {..._FIRST_CAROUSEL_OTHER_OPTIONS}/>

                    <Input
                        type={__CONSTANTS.modalHandlerButton.type}
                        name={Functions._convertTokenToKeyword(__CONSTANTS.modalHandlerButton.title.en)}
                        value={__CONSTANTS.modalHandlerButton.title[_LANGUAGE]}
                        style={{
                          marginBottom: Styles.Content.marginVertical,
                          marginHorizontal: Styles.Content.marginHorizontal
                        }}
                        gradient={Global.colors.pair.ongerine}
                        onPress={() => {
                          this.otherProps = {
                            pilotItems: props.wallets.tabs,
                            currentPilotItem: props.wallets.currentTab,
                            data: props.wallets.selectedWallet,
                            onChargeWalletPress: (visibilityStatus) => {
                              this.otherProps = {
                                pilotItems: props.wallets.tabs,
                                currentPilotItem: props.wallets.currentTab,
                                onAddWalletPress: (visibilityStatus) => props.setWalletModalVisibility(visibilityStatus),
                                onProgressSuccess: async (response) => {
                                  //We can use response later
                                  // await props.fetchAvailableWallets(props.roles.currentTab);
                                }
                              };

                              Keyboard.dismiss();
                              props.setWalletModalVisibility(visibilityStatus);
                            },
                            onProgressSuccess: async (response) => props.setWallets(props.wallets.wallets.map((wallet, i) => {
                              if (wallet._id === props.wallets.selectedWallet._id) {
                                const _FINAL_WALLET = {
                                  ...wallet,
                                  balance: response.new_balance,
                                  transactions: {
                                    ...wallet.transactions,
                                    amount: (wallet.transactions.amount + 1),
                                    deposit: response.new_balance
                                  }
                                };

                                props.setSelectedWallet(_FINAL_WALLET);

                                return _FINAL_WALLET;
                              }else{
                                return wallet;
                              }
                            }))
                          };

                          Keyboard.dismiss();
                          props.setWalletModalVisibility(true);
                        }}/>

                    <Pin
                      title={__CONSTANTS.firstPin.title[_LANGUAGE]}
                      subtitle={_LOCALE_BASED_PIN_SUBTITLE}
                      style={Styles.WalletPin}
                      onPress={() => {
                        const { navigation } = props;

                        navigation.navigate('SelectedWallet', props.wallets.selectedWallet);
                      }}
                      defaultGradient />
                </View>
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
          }

          if ((props.wallets.tabs.length > 0) && (Object.keys(props.wallets.currentTab).length > 0) && (Object.keys(OTHER_PROPS).length === 0)){
            OTHER_PROPS = {
              pilotItems: props.wallets.tabs,
              currentPilotItem: props.wallets.currentTab,
              onAddWalletPress: (visibilityStatus) => props.setWalletModalVisibility(visibilityStatus),
              onProgressSuccess: async (response) => {
                //We can use response later
                // await props.fetchAvailableWallets(props.roles.currentTab);
              }
            };
          }

          OTHER_PROPS = {
            ...containerOtherProps,
            ...OTHER_PROPS
          };

          return (
            <Container
              title={__CONSTANTS.pilot.title[_LANGUAGE]}
              onPilotTabItemPress={async (item) => {
                const _TABS = props.wallets.tabs,
                      _SELECTED_ITEM_INDEX = _TABS.findIndex((tabItem, i) => {
                        return (tabItem._id === item._id);
                      });

                props.setPilotCurrentTab(props.wallets.tabs[_SELECTED_ITEM_INDEX]);

                await props.fetchAvailableWallets(props.wallets.tabs[_SELECTED_ITEM_INDEX]);
              }}
              walletModalVisibility={props.wallets.walletModalVisibility}
              {...props}
              {...OTHER_PROPS}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
