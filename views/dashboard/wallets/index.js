import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, Text, Image } from 'react-native';
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

    var _LANGUAGE = (typeof this._language != 'undefined')? Functions._convertTokenToKeyword(this._language.key): 'en';

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

            _TAB_CONTENT = (
              <View
                style={{flex: 1}}>
                  <Carousel
                    name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarousel.title.en)}
                    data={props.wallets.wallets}
                    style={{
                      marginVertical: Styles.Content.marginVertical
                    }}
                    firstItem={_SELECTED_WALLET_INDEX}
                    itemWidth={_Screen.width - (Styles.Content.marginHorizontal * 2)}
                    onLayout={({ item, index }) => {
                      var _ITEM_GRADIENT = Global.colors.pair.tilan;

                      if (_SELECTED_WALLET_INDEX === index){
                        _ITEM_GRADIENT = Global.colors.pair.analue;
                      }

                      _WALLET_TRANSACTIONS_AMOUNT_SUFFIX = `${__CONSTANTS.firstCarousel.items.content.transactionsAmount.suffix[_LANGUAGE]}${(item.transactions.amount > 1)? 's': ''}`;

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
                                    {Functions._convertDateToHumanReadableFormat(item.created_at)}
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
                                    {__CONSTANTS.firstCarousel.items.content.transactionsDeposit.sign[_LANGUAGE]}{Functions._convertDigitsToMoneyFormat(item.transactions.deposit)} {__CONSTANTS.firstCarousel.items.content.transactionsDeposit.suffix[_LANGUAGE]}
                                </Text>
                            </View>
                        </Input>
                      );
                    }}
                    onSnap={(selectedItemIndex) => props.setSelectedWallet(props.wallets.wallets[selectedItemIndex])}/>

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
                              onWalletAbsorb: async (response) => {
                                //We can use response later
                                // await props.fetchAvailableWallets(props.roles.currentTab);
                              }
                            };

                            props.setWalletModalVisibility(visibilityStatus);
                          }
                        };

                        props.setWalletModalVisibility(true);
                      }}/>

                  <Pin
                    title={__CONSTANTS.firstPin.title[_LANGUAGE]}
                    subtitle={`${__CONSTANTS.firstPin.subtitle.sign[_LANGUAGE]}${Functions._convertDigitsToMoneyFormat(props.wallets.selectedWallet.transactions.withdraw)} ${__CONSTANTS.firstPin.subtitle.suffix[_LANGUAGE]}`}
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
            onWalletAbsorb: async (response) => {
              //We can use response later
              // await props.fetchAvailableWallets(props.roles.currentTab);
            }
          };
        }

        return (
          <Container
            title={__CONSTANTS.pilot.title[_LANGUAGE]}
            onPilotTabItemPress={async (item) => {
              const _TABS = props.wallets.tabs.map((tabItem, i) => {
                        return Functions._returnCurrencyDependOnLanguage(tabItem.type || tabItem);
                      }),
                    _SELECTED_ITEM_INDEX = _TABS.indexOf(item);

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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
