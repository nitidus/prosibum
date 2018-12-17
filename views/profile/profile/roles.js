import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import { GLOBAL } from '../../../assets/flows/states/types/index';

import { Global, Views } from '../../../assets/styles/index';
import { ActivityIndicator, Toast } from '../../../assets/layouts/index';
import { Views as ViewsContainer } from '../../../assets/layouts/container/index';
const Styles = Views.Profile.Roles,
      Container = ViewsContainer.Profile.RolesContainer;

import { PersonalTab, TechnicalTab, CertificationTab, HistoryTab, PostalTab } from '../profile/tabs';

import { Views as ViewsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Profile.Roles;

import { views_constants } from '../../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.brand_roles_subsets;

import { Functions } from '../../../assets/modules/index';

class Roles extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this;

    await props.fetchAvailableRoles(GLOBAL.TARGET);
  }

  render() {
    const { props } = this;

    if (props.roles.loadingRoles){
      return (
        <View
          style={Styles.Container}>
            <ActivityIndicator />
        </View>
      );
    }else{
      if (!props.roles.connected.status){
        const _TOP_PINNED_TOAST = (
          <Toast
            message={props.roles.connected.content}
            launched={!props.roles.connected.status}
            color={Global.colors.single.carminePink}
            onPress={() => props.fetchAvailableRoles(GLOBAL.TARGET)} />
        );

        return (
          <View
            style={Styles.Container}>
              {_TOP_PINNED_TOAST}
          </View>
        );
      }else{
        const __TABS = props.roles.tabs.map((tabItem, i) => {
                const _ROW = tabItem,
                      _ROLE = _ROW.role;

                return Functions._convertKeywordToToken(_ROLE || _ROLE.en);
              }),
              _CURRENT_TAB_CONTENT = (typeof props.roles.currentTab.role != 'undefined')? props.roles.currentTab.role: '',
              _CURRENT_TAB = Functions._convertKeywordToToken(_CURRENT_TAB_CONTENT);

        const _TAB_CONTENT = (
          <Text>Hello {_CURRENT_TAB}</Text>
        );

        return (
          <Container
            title={__CONSTANTS.pilot.title.en}
            pilotItems={props.roles.tabs}
            currentPilotItem={props.roles.currentTab}
            onPilotTabItemPress={(item) => {
              const _SELECTED_ITEM_INDEX = __TABS.indexOf(item);

              props.setPilotCurrentTab(props.roles.tabs[_SELECTED_ITEM_INDEX]);
            }}
            onAddRolePress={(visibilityStatus) => props.setRolesModalVisibility(visibilityStatus)}
            rolesModalvisibility={props.roles.rolesModalVisibility}
            {...props}>
              {_TAB_CONTENT}
          </Container>
        );
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
