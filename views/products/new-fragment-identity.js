import React, { Component } from 'react';
import { View, Dimensions, Platform, Text, Image, Keyboard } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, ProductFeaturesModal } from '../../assets/layouts/index';
import { Input, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewFragment,
      Container = ViewsContainer.Products.NewFragmentContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewFragment;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_fragment_identity;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewFragmentIdentity extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = await _NATIVE_SETTINGS.language;

    props.setLanguage(_LANGUAGE);
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newFragment;

    var _FORM_FIELDS_VALIDITY = false;

    if ((_PROPS.name != '') && (_PROPS.features.length > 0)){
      if (_PROPS.name.length > 7){
        if (Object.keys(_PROPS.product).length > 0){
          const _FRAGMENT_INTERNAL_NAME_CONTAINS_PRODUCT_NAME_REGEX = new RegExp(`\.*${_PROPS.product.name}\.*`, 'gi');

          if (_PROPS.name.match(_FRAGMENT_INTERNAL_NAME_CONTAINS_PRODUCT_NAME_REGEX)){
            _FORM_FIELDS_VALIDITY = true;
          }
        }
      }
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    if (Object.keys(props.newFragment.language).length > 0){
      const _LANGUAGE = Functions._convertTokenToKeyword(props.newFragment.language.key);

      const _PRODUCT_CATEGORY = (Object.keys(props.newFragment.product).length > 0)? (props.newFragment.product.category.cumulative_key || props.newFragment.product.category.key): '',
            _VALIDATED = this._componentWillCheckValidation(props),
            _PRODUCT_FEATURES_OTHER_PROPS = {
              language: props.newFragment.language,
              features: props.newFragment.features
            };

      var _UNITS_CONTENT;

      if (props.newFragment.features.length > 0){

      }else{
        _UNITS_CONTENT = (
          <Link
            containerStyle={Styles.EmptyContentLink}
            value={__CONSTANTS.content.firstCarousel.state.null.title[_LANGUAGE]} />
        );
      }

      return (
        <Container
          title={Functions._convertKeywordToToken(__CONSTANTS.pilot.title[_LANGUAGE])}
          subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle[_LANGUAGE])}
          {...props}>
            <Input
              type={__CONSTANTS.content.firstInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstInput.title.en)}
              placeholder={__CONSTANTS.content.firstInput.title[_LANGUAGE]}
              value={props.newFragment.name}
              style={[
                Styles.RegularItemContainer,
                {
                  marginTop: Styles.Content.marginVertical
                }
              ]}
              onChangeText={(currentValue) => props.setName(currentValue)} />

            {_UNITS_CONTENT}

            <View
              style={Styles.BottomPinnedContainer}>
                <Input
                  type={__CONSTANTS.content.modalHandlerButton.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.content.modalHandlerButton.state.normal.title.en)}
                  value={__CONSTANTS.content.modalHandlerButton.state.normal.title[_LANGUAGE]}
                  gradient={Global.colors.pair.ongerine}
                  style={{
                    marginHorizontal: Styles.Content.marginHorizontal,
                    marginBottom: Styles.Content.marginVertical
                  }}
                  onPress={async () => {
                    const { navigation } = props;

                    // await navigation.navigate('NewFragmentPrefilledFeatures');
                  }} />

                <Input
                  type={__CONSTANTS.content.submitButton.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
                  value={__CONSTANTS.content.submitButton.state.normal.title[_LANGUAGE]}
                  gradient={Global.colors.pair.ongerine}
                  style={{
                    marginHorizontal: Styles.Content.marginHorizontal
                  }}
                  onPress={async () => {
                    const { navigation } = props;

                    await navigation.navigate('NewFragmentPrefilledFeatures');
                  }}
                  forcedDisable={_VALIDATED} />
            </View>

            <ProductFeaturesModal
              visibility={/*props.newFragment.featuresModalVisibility*/true}
              onBlur={() => props.setFeaturesModalVisibility(false)}
              onProgressSuccess={(response) => {
                //hello
              }}
              {..._PRODUCT_FEATURES_OTHER_PROPS} />
        </Container>
      );
    }else{
      return (
        <ActivityIndicator/>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewFragmentIdentity);
