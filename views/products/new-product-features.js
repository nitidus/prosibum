import React, { Component } from 'react';
import { View, Dimensions, Platform, Text, Image } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, ProductFeaturesModal } from '../../assets/layouts/index';
import { Input, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewProduct,
      Container = ViewsContainer.Products.NewProductContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewProduct;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_product_features;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewProductFeatures extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this;

    await props.fetchAvailableWarehouses();
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newProduct;

    var _FORM_FIELDS_VALIDITY = false;

    if ((_PROPS.name != '') && (Object.keys(_PROPS.currentWarehouse).length > 0) && (Object.keys(_PROPS.category).length > 0)){
      _FORM_FIELDS_VALIDITY = true;
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    var _WAREHOUSE_CONTENT;

    const _PRODUCT_TITLE = (props.newProduct.name != '')? props.newProduct.name: __CONSTANTS.pilot.title.en,
          _VALIDATED = this._componentWillCheckValidation(props);

    return (
      <Container
        title={Functions._convertKeywordToToken(_PRODUCT_TITLE)}
        subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle.en)}
        rightIcon="plus"
        onRightIconPress={() => props.setProductFeaturesModalVisibility(true)}
        {...props}>
          <Text>ok</Text>

          <ProductFeaturesModal
            visibility={props.newProduct.productFeaturesModalVisibility}
            onBlur={() => props.setProductFeaturesModalVisibility(false)}
            onProgressSuccess={(response) => {
              // props.setCategory(response)
              console.log(response)
            }} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductFeatures);
