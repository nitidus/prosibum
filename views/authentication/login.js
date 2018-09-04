import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup, Link } from '../../assets/components/index';

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

  render() {
    return (
      <View style={Styles.Container}>
        <StatusBar hidden={true}/>

        <View style={Styles.Content}>
          <Headline
            style={Styles.Headline}
            title="Welcome"
            subtitle={"Please login to\n your account."} />

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
                const { navigation } = this.props;

                navigation.navigate('ForgottenPassword');
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

          <Link
            containerStyle={Styles.QuickLink}
            value="Don't have an account?"
            onPress={() => {
              const { navigation } = this.props;

              navigation.navigate('Signup');
            }} />
        </View>
      </View>
    )
  }
}
