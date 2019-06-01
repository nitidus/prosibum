import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import { ActivityIndicator } from '../assets/layouts/index';
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
    const { props } = this;

    await Preparation._prepareCurrentUserInformation(props, __CONSTANTS.pilot.content);
  }

  componentWillReceiveProps(props) {

  }

  render() {
    const { props } = this,
          _CURRENT_TAB_IN_KEY_FORMAT = (Object.keys(props.overseer.currentBottomTab).length > 0)? Functions._convertTokenToKey(props.overseer.currentBottomTab.en): '';

    if (Object.keys(props.overseer.language).length > 0){
      var _ROOT_CONTENT,
          _LANGUAGE = Functions._convertTokenToKeyword(props.overseer.language.key),
          RootContentComponent = Products,
          _OTHER_PROPS = {
            language: props.overseer.language
          },
          _CONTENT_OTHER_PROPS = {
            language: props.overseer.language
          };

      switch (_CURRENT_TAB_IN_KEY_FORMAT) {
        case 'DASHBOARD':
          _OTHER_PROPS.onRightIconPress = () => {
            alert('okok')
          };
          _OTHER_PROPS.rightIcon = 'for-you';

          _CONTENT_OTHER_PROPS.main = props.overseer.currentBottomTab[_LANGUAGE];
          _CONTENT_OTHER_PROPS.sub = props.overseer.currentTopTab[_LANGUAGE];

          RootContentComponent = __COMPONENTS[props.overseer.currentBottomTab.en];
          break;

        case 'PRODUCTS':
          const _CURRENT_TAB_CONTENT_INDEX = __CONSTANTS.pilot.content.findIndex((item, i) => {
            return Functions._convertTokenToKey(item.title.en) === _CURRENT_TAB_IN_KEY_FORMAT;
          });

          if (_CURRENT_TAB_CONTENT_INDEX > -1){
            _OTHER_PROPS.onRightIconPress = () => {
              const { navigation } = props;

              navigation.navigate('NewFragmentDetection', {
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
            _CONTENT_OTHER_PROPS.sub = props.overseer.currentTopTab[_LANGUAGE];
          }

          RootContentComponent = __COMPONENTS[props.overseer.currentBottomTab.en];
          break;

        case 'MESSAGES':
          _CONTENT_OTHER_PROPS.main = props.overseer.currentBottomTab[_LANGUAGE];
          _CONTENT_OTHER_PROPS.sub = props.overseer.currentTopTab[_LANGUAGE];

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
    }else{
      return (
        <ActivityIndicator/>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overseer);
