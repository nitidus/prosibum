import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text, Image } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Views } from '../../../assets/styles/index';
import { ActivityIndicator, Toast, Icon } from '../../../assets/layouts/index';
import { Input, Link, Carousel } from '../../../assets/components/index';
import { Views as ViewsContainer } from '../../../assets/layouts/container/index';
const Styles = Views.Profile.Wallets,
      Container = ViewsContainer.Profile.WalletsContainer;

import { Views as ViewsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Profile.Wallets;

import { views_constants } from '../../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.wallets;

import { Functions } from '../../../assets/modules/index';
const { Preparation } = Functions;

class Wallets extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this;

    await props.fetchAvailableWalletCurrenciesType();
  }

  render() {
    const { props } = this;

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
        var _TAB_CONTENT;

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
              <View>
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

                    _WALLET_TRANSACTIONS_AMOUNT_SUFFIX = `${__CONSTANTS.firstCarousel.items.content.transactionsAmount.suffix.en}${(item.transactions.amount > 1)? 's': ''}`;

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
                                  {item.name}
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
                                  {__CONSTANTS.firstCarousel.items.content.transactionsDeposit.sign.en}{Functions._convertDigitsToMoneyFormat(item.transactions.deposit)}
                              </Text>
                          </View>
                      </Input>
                    );
                  }}
                  onSnap={(selectedItemIndex) => props.setSelectedWallet(props.wallets.wallets[selectedItemIndex])}/>

                  <Input
                    type={__CONSTANTS.modalHandlerButton.type}
                    name={Functions._convertTokenToKeyword(__CONSTANTS.modalHandlerButton.title.en)}
                    value={__CONSTANTS.modalHandlerButton.title.en}
                    style={{
                      marginHorizontal: Styles.Content.marginHorizontal
                    }}
                    gradient={Global.colors.pair.ongerine}/>
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
                  value={__CONSTANTS.link.en} />
              </View>
            );
          }
        }

        return (
          <Container
            title={__CONSTANTS.pilot.title.en}
            pilotItems={props.wallets.tabs}
            currentPilotItem={props.wallets.currentTab}
            onPilotTabItemPress={async (item) => {
              const _TABS = props.wallets.tabs.map((tabItem, i) => {
                        return Functions._returnCurrencyDependOnLanguage(tabItem.type || tabItem);
                      }),
                    _SELECTED_ITEM_INDEX = _TABS.indexOf(item);

              props.setPilotCurrentTab(props.wallets.tabs[_SELECTED_ITEM_INDEX]);

              await props.fetchAvailableWallets(props.wallets.tabs[_SELECTED_ITEM_INDEX]);
            }}
            onAddWalletPress={(visibilityStatus) => props.setWalletModalVisibility(visibilityStatus)}
            onWalletAbsorb={async (response) => {
              //We can use response later
              // await props.fetchAvailableWallets(props.roles.currentTab);
            }}
            walletModalVisibility={props.wallets.walletModalVisibility}
            {...props}>
              {_TAB_CONTENT}
          </Container>
        );
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
