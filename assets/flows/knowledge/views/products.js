import self from './products/index.json';

//Products
import new_product_identity from './products/new-product-identity.json';
import new_product_description from './products/new-product-description.json';
import new_product_features from './products/new-product-features.json';
import new_product_photos from './products/new-product-photos.json';

//Fragments
import new_fragment_detection from './products/new-fragment-detection.json';
import new_fragment_identity from './products/new-fragment-identity.json';
import new_fragment_features from './products/new-fragment-features.json';

module.exports = {
  products_sub_views: {
    new_fragment_detection,
    new_product_identity,
    new_fragment_identity,
    new_product_features,
    new_fragment_features,
    new_product_description,
    new_product_photos
  },
  self,
  new_fragment_detection,
  new_product_identity,
  new_fragment_identity,
  new_product_features,
  new_fragment_features,
  new_product_description,
  new_product_photos
};
