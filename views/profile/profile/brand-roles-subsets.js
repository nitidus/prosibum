import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../../assets/styles/index';
import { ActivityIndicator, Toast } from '../../../assets/layouts/index';
import { Views as ViewsContainer } from '../../../assets/layouts/container/index';
const Styles = Views.Profile.BrandRolesSubsets,
      Container = ViewsContainer.Profile.BrandRolesSubsetsContainer;

import { PersonalTab, TechnicalTab, CertificationTab, HistoryTab, PostalTab } from '../profile/tabs';

import { Views as ViewsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Profile.BrandRolesSubsets;

import { views_constants } from '../../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.brand_roles_subsets;

import { Functions } from '../../../assets/modules/index';

class BrandRolesSubsets extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this;

    await props.fetchAvailableBrandRoles('Wholesaler');
  }

  render() {
    const { props } = this;

    if (props.brandRolesSubsets.loadingBrandRole){
      return (
        <View
          style={Styles.Container}>
            <ActivityIndicator />
        </View>
      );
    }else{
      if (!props.brandRolesSubsets.connected.status){
        const _TOP_PINNED_TOAST = (
          <Toast
            message={props.brandRolesSubsets.connected.content}
            launched={!props.brandRolesSubsets.connected.status}
            color={Global.colors.single.carminePink}
            onPress={() => props.fetchAvailableBrandRoles('Wholesaler')} />
        );

        return (
          <View
            style={Styles.Container}>
              {_TOP_PINNED_TOAST}
          </View>
        );
      }else{
        const __TABS = props.brandRolesSubsets.tabs.map((tabItem, i) => {
                const _ROW = tabItem,
                      _ROLE = _ROW.role;

                return Functions._convertKeywordToToken(_ROLE || _ROLE.en);
              }),
              _CURRENT_TAB_CONTENT = (typeof props.brandRolesSubsets.currentTab.role != 'undefined')? props.brandRolesSubsets.currentTab.role: '',
              _CURRENT_TAB = Functions._convertKeywordToToken(_CURRENT_TAB_CONTENT);

        const _TAB_CONTENT = (
          <Text>Hello {_CURRENT_TAB}</Text>
        );

        return (
          <Container
            title={__CONSTANTS.pilot.title.en}
            pilotItems={__TABS}
            currentPilotItem={_CURRENT_TAB}
            onPilotTabItemPress={(item) => {
              const _SELECTED_ITEM_INDEX = __TABS.indexOf(item);

              props.setPilotCurrentTab(props.brandRolesSubsets.tabs[_SELECTED_ITEM_INDEX]);
            }}
            {...props}>
              {_TAB_CONTENT}
          </Container>
        );
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandRolesSubsets);
