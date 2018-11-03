import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Profile.Profile,
      Container = ViewsContainer.Profile.ProfileContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Profile.UserProfile;

class Profile extends Component<{}> {
  static navigationOptions = {

  };

  componentDidMount() {
    const { props } = this;

    props.setPilotCurrentTab('hello')
  }

  render() {
    const { props } = this;

    return (
      <Container
        title="Profile"
        {...props}>
          <Text>Profile page.</Text>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
