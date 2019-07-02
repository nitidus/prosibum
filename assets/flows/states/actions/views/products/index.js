import { VIEWS } from '../../../types/index';
const { SELF } = VIEWS.PRODUCTS;

const mapStateToProps = (state) => {
  return {
    products: state.Products
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDraftedItems: (items) => {
      dispatch({
        type: SELF.SET_DRAFTED_ITEMS,
        payload: items
      })
    }
  };
}

const Products = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = Products;
