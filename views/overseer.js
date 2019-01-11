import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import { Views as ViewsContainer } from '../assets/layouts/container/index';
const Container = ViewsContainer.Profile.OverseerContainer;

import { Functions } from '../assets/modules/index';
const { Preparation } = Functions;

import { Views as ViewsActions } from '../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Profile.Overseer;

import { views_constants } from '../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.overseer;

import { Dashboard } from './profile/dashboard';
import { Products } from './products/products';
import { Messages } from './messages/messages';
const __COMPONENTS = {
  Dashboard,
  Products,
  Messages
};

class Overseer extends Component<{}> {
  static navigationOptions = {

  };

  componentWillMount() {
    const { props } = this,
          _TABS = __CONSTANTS.pilot.content.map((tab, i) => {
            return Functions._convertKeywordToToken(tab.en);
          });

    props.setBottomPilotTabs(_TABS);
    props.setBottomPilotCurrentTab(_TABS[0]);
  }

  componentWillReceiveProps(props) {

  }

  render() {
    const { props } = this,
          _CURRENT_TAB_IN_KEY_FORMAT = Functions._convertTokenToKey(props.overseer.currentTab);

    var _ROOT_CONTENT,
        RootContentComponent = Products;

    switch (_CURRENT_TAB_IN_KEY_FORMAT) {
      case 'DASHBOARD':
      case 'PRODUCTS':
      case 'MESSAGES':
        RootContentComponent = __COMPONENTS[props.overseer.currentTab]
        break;
    }
    return (
      <Container
        title={props.overseer.currentTab}
        tabs={props.overseer.tabs}
        currentTab={props.overseer.currentTab}
        onTabItemPress={(tabName) => props.setBottomPilotCurrentTab(tabName)}
        {...props}>
          <RootContentComponent
            {...props} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overseer);
