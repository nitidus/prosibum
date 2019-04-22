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

  async componentDidMount() {
    const { props } = this,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = _NATIVE_SETTINGS.language,
          _LANGUAGE_KEY = Functions._convertTokenToKeyword(_LANGUAGE.key),
          _TABS = __CONSTANTS.pilot.content.map((tab, i) => {
            return tab.title;
          });

    this._language = _LANGUAGE;

    props.setBottomPilotTabs(_TABS);
    props.setBottomPilotCurrentTab(_TABS[1]);
  }

  componentWillReceiveProps(props) {

  }

  render() {
    const { props } = this,
          _CURRENT_TAB_IN_KEY_FORMAT = (Object.keys(props.overseer.currentBottomTab).length > 0)? Functions._convertTokenToKey(props.overseer.currentBottomTab.en): '';

    var _ROOT_CONTENT,
        _LANGUAGE = (typeof this._language != 'undefined')? Functions._convertTokenToKeyword(this._language.key): 'en',
        RootContentComponent = Products,
        _OTHER_PROPS = {
          language: this._language
        },
        _CONTENT_OTHER_PROPS = {};

    switch (_CURRENT_TAB_IN_KEY_FORMAT) {
      case 'DASHBOARD':
        _OTHER_PROPS.onRightIconPress = () => {
          alert('okok')
        };
        _OTHER_PROPS.rightIcon = 'for-you';

        if ((props.overseer.topTabs.length === 0) && (Object.keys(props.overseer.currentTopTab).length === 0)){
          _CONTENT_OTHER_PROPS.main = props.overseer.currentBottomTab[_LANGUAGE];
          _CONTENT_OTHER_PROPS.sub = _OTHER_PROPS.currentTopTab[_LANGUAGE];
        }

        RootContentComponent = __COMPONENTS[props.overseer.currentBottomTab.en];
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

          if ((props.overseer.topTabs.length === 0) && (Object.keys(props.overseer.currentTopTab).length === 0)){
            const _INITIALIZED_TABS = __CONSTANTS.pilot.content[_CURRENT_TAB_CONTENT_INDEX].tabs.map((item, i) => {
              return item.title;
            });

            props.setTopPilotTabs(_INITIALIZED_TABS);
            props.setTopPilotCurrentTab(_INITIALIZED_TABS[0]);
          }

          _OTHER_PROPS.topBarTabs = props.overseer.topTabs;
          _OTHER_PROPS.currentTopTab = props.overseer.currentTopTab;
          _OTHER_PROPS.onTopBarPress = (tabName) => props.setTopPilotCurrentTab(tabName);

          _CONTENT_OTHER_PROPS.main = props.overseer.currentBottomTab[_LANGUAGE];
          _CONTENT_OTHER_PROPS.sub = _OTHER_PROPS.currentTopTab[_LANGUAGE];
        }

        RootContentComponent = __COMPONENTS[props.overseer.currentBottomTab.en];
        break;

      case 'MESSAGES':
        if ((props.overseer.topTabs.length === 0) && (Object.keys(props.overseer.currentTopTab).length === 0)){
          _CONTENT_OTHER_PROPS.main = props.overseer.currentBottomTab[_LANGUAGE];
          _CONTENT_OTHER_PROPS.sub = _OTHER_PROPS.currentTopTab[_LANGUAGE];
        }

        RootContentComponent = __COMPONENTS[props.overseer.currentBottomTab.en];
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
