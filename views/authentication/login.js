import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup, Link } from '../../assets/components/index';
const Styles = Views.Authentication.Login;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Authentication.Login;

class Login extends Component<{}> {
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
    const { props } = this;

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
              placeholder="Email"
              value={props.login.email}
              onChangeText={(currentValue) => props.setEmail(currentValue)} />
            <Input
              type="PASSWORD-LINK"
              name="password"
              placeholder="Password"
              value={props.login.password}
              link="Forgot it?"
              onPress={() => {
                const { navigation } = props;

                props.setEmail('');
                // props.setPassword('');

                navigation.navigate('ForgottenPassword');
              }}
              onChangeText={(currentValue) => props.setPassword(currentValue)} />
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
              const { navigation } = props;

              // props.setEmail('');
              // props.setPassword('');

              navigation.navigate('Signup');
            }} />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
