import React, { Component } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../../assets/styles/index';
import { ActivityIndicator, Toast, Icon } from '../../../assets/layouts/index';
import { Input } from '../../../assets/components/index';
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

  componentDidMount() {
    const { props } = this;

    props.fetchAvailableWalletCurrenciesType();
  }

  render() {
    const { props } = this;

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

          // await props.fetchAvailableRoles(props.roles.tabs[_SELECTED_ITEM_INDEX]);
        }}
        {...props}>
          <Text>Wallets Intro</Text>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
