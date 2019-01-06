import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Views as ViewsContainer } from '../assets/layouts/container/index';
const Container = ViewsContainer.Profile.OverseerContainer;

import { Functions } from '../assets/modules/index';
const { Preparation } = Functions;

import { Dashboard } from './profile/dashboard';
import { Products } from './products/products';
import { Messages } from './messages/messages';

export default class Overseer extends Component<{}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { props } = this;
    // tabs={}
    // currentTab={}
    // onTabItemPress={() => {}}
    return (
      <Container
        title="Overseer"

        {...props}>
          <Dashboard/>
      </Container>
    );
  }
}
