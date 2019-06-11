import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, Keyboard, I18nManager, Text, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';
import Interactable from 'react-native-interactable';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Icon } from '../../assets/layouts/index';
import { Input, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewProduct,
      Container = ViewsContainer.Products.NewProductContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewProduct;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_product_description;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewProductDescription extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this;

    if (Object.keys(props.newProduct.language).length === 0){
      const _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
            _LANGUAGE = _NATIVE_SETTINGS.language;

      await props.setLanguage(_LANGUAGE);
    }
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newProduct;

    var _FORM_FIELDS_VALIDITY = false;

    if (_PROPS.description.replace(/(<([^>]+)>)/ig, "") != ''){
      _FORM_FIELDS_VALIDITY = true;
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    if (Object.keys(props.newProduct.language).length > 0){
      var _FEATURES_CONTENT,
          _FINAL_BUTTON;

      const _LANGUAGE = Functions._convertTokenToKeyword(props.newProduct.language.key),
            _PRODUCT_TITLE = (props.newProduct.name != '')? props.newProduct.name: __CONSTANTS.pilot.title[_LANGUAGE],
            _VALIDATED = this._componentWillCheckValidation(props);

      if (_VALIDATED){
        var _MESSAGE = '';

        if (props.newProduct.description.replace(/(<([^>]+)>)/ig, "") == ''){
          _MESSAGE += __CONSTANTS.content.warning[_LANGUAGE];
        }

        if (_MESSAGE != ''){
          _FINAL_BUTTON = (
            <Input
              type={__CONSTANTS.content.submitButton.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
              value={_MESSAGE}
              style={[
                Styles.WarningContainer,
                {
                  marginBottom: Styles.Content.marginVertical
                }
              ]}
              textStyle={Styles.WarningContent} />
          );
        }
      }else{
        _FINAL_BUTTON = (
          <Input
            type={__CONSTANTS.content.submitButton.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
            value={__CONSTANTS.content.submitButton.state.normal.title[_LANGUAGE]}
            gradient={Global.colors.pair.ongerine}
            style={{
              marginHorizontal: Styles.Content.marginHorizontal
            }}
            onPress={() => {
              const { navigation } = props;

              navigation.navigate('NewFragmentPrices');
            }}
            forcedDisable={_VALIDATED} />
        );
      }

      return (
        <Container
          title={Functions._convertKeywordToToken(_PRODUCT_TITLE)}
          subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle[_LANGUAGE])}
          {...props}>

            <Input
              type={__CONSTANTS.content.firstInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstInput.title.en)}
              placeholder={__CONSTANTS.content.firstInput.title[_LANGUAGE]}
              value={props.newProduct.description}
              style={{
                marginHorizontal: Styles.Content.marginHorizontal,
                marginVertical: Styles.Content.marginVertical
              }}
              onChangeText={(currentValue) => props.setDescription(currentValue)}/>

            {_FINAL_BUTTON}
        </Container>
      );
    }else{
      return (
        <ActivityIndicator/>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductDescription);
