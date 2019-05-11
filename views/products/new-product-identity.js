import React, { Component } from 'react';
import { View, Dimensions, Platform, Text, Image, Keyboard } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, ProductCategoriesModal } from '../../assets/layouts/index';
import { Input, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewProduct,
      Container = ViewsContainer.Products.NewProductContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewProduct;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_product_identity;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewProductIdentity extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = await _NATIVE_SETTINGS.language;

    props.setLanguage(_LANGUAGE);
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newProduct;

    var _FORM_FIELDS_VALIDITY = false;

    if ((_PROPS.name != '') && (Object.keys(_PROPS.category).length > 0)){
      if (_PROPS.name.length > 7){
        const _CATEGORY_NAME = _PROPS.category.cumulative_key || _PROPS.category.key,
              _PRODUCT_NAME_CONTAINS_CATEGORY_NAME_REGEX = new RegExp(`\.*${_CATEGORY_NAME}\.*`, 'gi');

        if (_PROPS.name.match(_PRODUCT_NAME_CONTAINS_CATEGORY_NAME_REGEX)){
          _FORM_FIELDS_VALIDITY = true;
        }
      }
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    if (Object.keys(props.newProduct.language).length > 0){
      const _LANGUAGE = Functions._convertTokenToKeyword(props.newProduct.language.key),
            _WAREHOUSES_OTHER_PROPS = {
              language: props.newProduct.language
            },
            _PRODUCT_CATEGORIES_OTHER_PROPS = {
              language: props.newProduct.language
            };

      const _PRODUCT_CATEGORY = (Object.keys(props.newProduct.category).length > 0)? (props.newProduct.category.cumulative_key || props.newProduct.category.key): '',
            _VALIDATED = this._componentWillCheckValidation(props);

      return (
        <Container
          title={Functions._convertKeywordToToken(__CONSTANTS.pilot.title[_LANGUAGE])}
          subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle[_LANGUAGE])}
          {...props}>
            <Input
              type={__CONSTANTS.content.firstInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstInput.title.en)}
              placeholder={__CONSTANTS.content.firstInput.title[_LANGUAGE]}
              value={props.newProduct.name}
              style={[
                Styles.RegularItemContainer,
                {
                  marginTop: Styles.Content.marginVertical
                }
              ]}
              onChangeText={(currentValue) => props.setName(currentValue)} />

            <Input
              type={__CONSTANTS.content.secondInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.secondInput.title.en)}
              link={__CONSTANTS.content.secondInput.link[_LANGUAGE]}
              placeholder={__CONSTANTS.content.secondInput.title[_LANGUAGE]}
              value={_PRODUCT_CATEGORY}
              style={{
                marginHorizontal: Styles.Content.marginHorizontal,
                marginBottom: Styles.Content.marginVertical
              }}
              onPress={() => {
                Keyboard.dismiss();
                props.setCategoriesModalVisibility(true);
              }}
              disable={true} />

            <View
              style={Styles.BottomPinnedContainer}>
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

                    await navigation.navigate('NewProductFeatures');
                  }}
                  forcedDisable={_VALIDATED} />
            </View>

            <ProductCategoriesModal
              visibility={props.newProduct.categoriesModalVisibility}
              onBlur={() => props.setCategoriesModalVisibility(false)}
              onProgressSuccess={async (response) => {
                const _CATEGORY_NAME = response.cumulative_key || response.key;

                await props.setCategory(response);
                await props.setName(_CATEGORY_NAME);
              }}
              {..._PRODUCT_CATEGORIES_OTHER_PROPS} />
        </Container>
      );
    }else{
      return (
        <ActivityIndicator/>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductIdentity);
