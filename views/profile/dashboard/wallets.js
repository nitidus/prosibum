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
                type="button"
                name="{Functions._convertTokenToKeyword(__CONSTANTS.content.scrollViewItem.state.loading.title.en)}"
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
            _TAB_CONTENT = (
              <Carousel
                name="{__CONSTANTS.modalContainer.content.fourthHiddenTab.secondCarousel.title.en}"
                data={props.wallets.wallets}
                style={{
                  marginVertical: Styles.Content.marginVertical
                }}
                firstItem={0}
                itemWidth={_Screen.width - (Styles.Content.marginHorizontal * 2)}
                onLayout={({ item, index }) => {
                  // const _ITEM_CORRECT_INDEX = _SELECTED_YEARS_RANGE.findIndex((yearItem, i) => {
                  //   return parseInt(yearItem) === parseInt(item);
                  // }) + 1;
                  //
                  // var _ITEM_GRADIENT = Global.colors.pair.tilan;
                  //
                  // if (_SELECTED_YEAR_INDEX === (_ITEM_CORRECT_INDEX - 1)){
                  //   _ITEM_GRADIENT = Global.colors.pair.analue;
                  // }

                  return (
                    <Input
                      type="button"
                      name="{Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.content.fourthHiddenTab.secondCarousel.content.title.en)}"
                      style={{
                        height: Styles.WalletItemContainer.height
                      }}
                      gradient={Global.colors.pair.ongerine}>
                        <Text>{item.name}</Text>
                        <Text>{item.created_at}</Text>
                        <Text>{item.transactions.amount}</Text>
                        <Text>{item.transactions.deposit}</Text>
                    </Input>
                  );
                }}
                onSnap={(selectedItemIndex) => {/*props.setCreditCardExpirationYear(_SELECTED_YEARS_RANGE[selectedItemIndex].toString())*/}}/>
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
                  value="There's no wallet." />
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
