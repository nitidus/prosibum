import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup } from '../../assets/components/index';

import { content as target } from '../../app.json';

const Contents = target.pages.authorization.login.content;
const Styles = Views.Authentication.Certification;

export default class Authentication extends Component<{}> {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {

  }

  componentWillReceiveProps(props) {

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

          <InputGroup
            style={Styles.InputGroup}>
            <Input
              type="EMAIL"
              name="email"
              placeholder="Email" />
            <Input
              type="PASSWORD-LINK"
              name="password"
              placeholder="Password"
              link="Forgot it?"
              onPress={() => {
                alert('ok')
              }} />
          </InputGroup>

          <Input
            style={Styles.SubmitButton}
            type="BUTTON"
            name="signin"
            value="Sign In"
            gradient={Global.colors.pair.ongerine}
            onPress={() => {
              alert('ok')
            }} />
        </View>
      </View>
    )
  }
}
