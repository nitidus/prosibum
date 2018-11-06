import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Profile.Profile,
      Container = ViewsContainer.Profile.ProfileContainer;

import { PersonalTab } from './profile/tabs';

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Profile.UserProfile;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.user_profile;

class Profile extends Component<{}> {
  static navigationOptions = {

  };

  componentDidMount() {
    const { props } = this,
          { tabs } = __CONSTANTS.pilot,
          __TABS = tabs.map((tabItem, i) => {
            return tabItem.en;
          });

    props.setPilotTabs(__TABS);
    props.setPilotCurrentTab(__TABS[0]);
  }

  render() {
    const { props } = this,
          _CURRENT_TAB = props.userProfile.currentTab.toLowerCase().replace(/( |_)/ig, '-');

    var _TAB_CONTENT;

    switch (_CURRENT_TAB) {
      case 'personal':
        _TAB_CONTENT = <PersonalTab/>;
        break;
      default:
        _TAB_CONTENT = (
          <Text>
            Profile page. ({props.userProfile.currentTab})
          </Text>
        );
        break;
    }
    return (
      <Container
        title={__CONSTANTS.pilot.title.en}
        pilotItems={props.userProfile.tabs}
        currentPilotItem={props.userProfile.currentTab}
        onPilotTabItemPress={(item) => {
          props.setPilotCurrentTab(item);
        }}
        {...props}>
          {_TAB_CONTENT}
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
