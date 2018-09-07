import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Container, Input, InputGroup, Segment, Link } from '../../assets/components/index';
const Styles = Views.Authentication.ForgottenPassword;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Authentication.ForgottenPassword;

class ForgottenPassword extends Component<{}> {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {

  }

  componentWillReceiveProps(props) {

  }

  componentWillMount() {
    const { props } = this;

    this._componentWillInitialize(props);
  }

  _componentWillInitialize(props) {
    props.setRequestType("email");
  }

  render() {
    const { props } = this;

    return (
      <View style={Styles.Container}>
        <StatusBar hidden={true}/>

        <View style={Styles.Content}>
          <Headline
            style={Styles.Headline}
            title="Dear User"
            subtitle={"To change your password\nuse the form below."} />

          <Segment
            style={Styles.Segment}
            name="forgotten-options"
            onChange={(currentValue) => props.setRequestType(currentValue)}>
              <Container
                active={true}
                name="email"
                title="Email">
                  <Input
                    type="EMAIL"
                    name="email"
                    placeholder="Email"
                    value={props.forgottenPassword.email}
                    onChangeText={(currentValue) => props.setEmail(currentValue)} />
              </Container>
              <Container
                name="phone-number"
                title="Phone">
                  <Input
                    type="TEXT"
                    name="phone-number"
                    placeholder="Phone Number"
                    value={props.forgottenPassword.phoneNumber}
                    onChangeText={(currentValue) => props.setPhoneNumber(currentValue)} />
              </Container>
          </Segment>

          <Input
            style={Styles.SubmitButton}
            type="BUTTON"
            name="send"
            value="Send"
            gradient={Global.colors.pair.ongerine}
            onPress={() => {
              alert('ok')
            }} />

          <Link
            containerStyle={Styles.QuickLink}
            value="Remember your password?"
            onPress={() => {
              const { navigation } = props;

              props.setEmail('');
              // props.setPhoneNumber('');

              navigation.goBack();
            }} />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgottenPassword);
