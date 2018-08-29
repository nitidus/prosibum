import React, { Component } from 'react';
import { StatusBar, View, TouchableHighlight, Text, Animated, Easing } from 'react-native';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input } from '../../assets/components/index';

import { content as target } from '../../app.json';

const Contents = target.pages.authorization.login.content;
const Styles = Views.Authentication.Certification;

export default class Authentication extends Component<{}> {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {

  }

  componentWillMount() {

  }

  render() {
    return (
      <View style={Styles.Container}>
        <StatusBar hidden={true}/>

        <View style={Styles.Content}>
          <Headline
            style={Styles.Headline}
            title={Contents.headline.title.en}
            subtitle={Contents.headline.subtitle.en} />

          <Input
            style={Styles.firstInput}
            type="TEXT"
            name="password"
            placeholder="Password"
            link="Forgot it?"
            onPress={() => {
              alert('ok')
            }} />
        </View>
      </View>
    )
  }
}
