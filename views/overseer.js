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

import { Dashboard } from './dashboard';
import { Products } from './products';
import { Messages } from './messages';
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
            return Functions._convertKeywordToToken(tab.title.en);
          });

    props.setBottomPilotTabs(_TABS);
    props.setBottomPilotCurrentTab(_TABS[1]);
  }

  componentWillReceiveProps(props) {

  }

  render() {
    const { props } = this,
          _CURRENT_TAB_IN_KEY_FORMAT = Functions._convertTokenToKey(props.overseer.currentBottomTab);

    var _ROOT_CONTENT,
        RootContentComponent = Products,
        _OTHER_PROPS = {},
        _CONTENT_OTHER_PROPS = {};

    switch (_CURRENT_TAB_IN_KEY_FORMAT) {
      case 'DASHBOARD':
        _OTHER_PROPS.onRightIconPress = () => {
          alert('okok')
        };
        _OTHER_PROPS.rightIcon = 'for-you';

        RootContentComponent = __COMPONENTS[props.overseer.currentBottomTab];
        break;

      case 'PRODUCTS':
        const _CURRENT_TAB_CONTENT_INDEX = __CONSTANTS.pilot.content.findIndex((item, i) => {
          return Functions._convertTokenToKey(item.title.en) === _CURRENT_TAB_IN_KEY_FORMAT;
        });

        if (_CURRENT_TAB_CONTENT_INDEX > -1){
          _OTHER_PROPS.onRightIconPress = () => {
            const { navigation } = props;

            navigation.navigate('NewProductIdentity', {
              isRoot: true
            });
          };
          _OTHER_PROPS.rightIcon = 'plus';

          if ((props.overseer.topTabs.length === 0) && (props.overseer.currentTopTab == '')){
            const _INITIALIZED_TABS = __CONSTANTS.pilot.content[_CURRENT_TAB_CONTENT_INDEX].tabs.map((item, i) => {
              return item.title.en;
            });

            props.setTopPilotTabs(_INITIALIZED_TABS);
            props.setTopPilotCurrentTab(_INITIALIZED_TABS[0]);
          }

          _OTHER_PROPS.topBarTabs = props.overseer.topTabs;
          _OTHER_PROPS.currentTopTab = props.overseer.currentTopTab;
          _OTHER_PROPS.onTopBarPress = (tabName) => props.setTopPilotCurrentTab(tabName);

          _CONTENT_OTHER_PROPS.sub = _OTHER_PROPS.currentTopTab;
        }

        RootContentComponent = __COMPONENTS[props.overseer.currentBottomTab];
        break;

      case 'MESSAGES':
        // _OTHER_PROPS.tailPilotChildren = <Text>hello world</Text>;

        RootContentComponent = __COMPONENTS[props.overseer.currentBottomTab];
        break;
    }

    return (
      <Container
        title={props.overseer.currentBottomTab}
        bottomBarTabs={props.overseer.bottomTabs}
        currentBottomTab={props.overseer.currentBottomTab}
        onBottomBarPress={(tabName) => props.setBottomPilotCurrentTab(tabName)}
        {...props}
        {..._OTHER_PROPS}>
          <RootContentComponent
            {...props}
            {..._CONTENT_OTHER_PROPS} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overseer);
