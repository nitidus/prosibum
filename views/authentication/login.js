import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup, Link } from '../../assets/components/index';

import { content as target } from '../../app.json';

const Contents = target.pages.authorization.login.content;
const Styles = Views.Authentication.Login;

export default class Login extends Component<{}> {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {

  }

  componentWillReceiveProps(props) {

  }

  componentWillMount() {

  }

  _navigateToSignupPage() {
    const { navigation } = this.props;

    navigation.navigate('Signup');
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
              placeholder={Contents.inputGroup.email.placeholder.en} />
            <Input
              type="PASSWORD-LINK"
              name="password"
              placeholder={Contents.inputGroup.passwordLink.placeholder.en}
              link={Contents.inputGroup.passwordLink.link.en}
              onPress={() => {
                const { navigation } = this.props;

                navigation.navigate('ForgottenPassword');
              }} />
          </InputGroup>

          <Input
            style={Styles.SubmitButton}
            type="BUTTON"
            name="signin"
            value={Contents.submitButton.value.en}
            gradient={Global.colors.pair.ongerine}
            onPress={() => {
              alert('ok')
            }} />

          <Link
            containerStyle={Styles.QuickLink}
            value={Contents.quickLink.value.en}
            onPress={() => {
              const { navigation } = this.props;

              navigation.navigate('Signup');
            }} />
        </View>
      </View>
    )
  }
}
