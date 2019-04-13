export const LAYOUTS = {
  TOAST: {
    SET_MESSAGE: 'TOAST/SET_MESSAGE',
    SET_LINK: 'TOAST/SET_LINK',
    SET_ON_LINK_PRESS: 'TOAST/SET_ON_LINK_PRESS',
    SET_VISIBILITY: 'TOAST/SET_VISIBILITY'
  },
  LIST: {
    RESET_LIST: 'LIST/RESET_LIST',
    SET_LIST_DATA_SOURCE: 'LIST/SET_LIST_DATA_SOURCE',
    APPEND_ITEM_TO_LIST_DATA_SOURCE: 'LIST/APPEND_ITEM_TO_LIST_DATA_SOURCE',
    SET_SELECTED_ROW: 'LIST/SET_SELECTED_ROW',
    SET_SELECTED_PREVIOUS_ROW: 'LIST/SET_SELECTED_PREVIOUS_ROW',
    SET_SELECTED_NEW_ROW: 'LIST/SET_SELECTED_NEW_ROW',
    SET_TARGET_LEAF: 'LIST/SET_TARGET_LEAF',
    SET_TARGET_PREVIOUS_LEAF: 'LIST/SET_TARGET_PREVIOUS_LEAF',
    SET_TARGET_NEW_LEAF: 'LIST/SET_TARGET_NEW_LEAF',
    SET_SELECTED_ROW_DEPTH: 'LIST/SET_SELECTED_ROW_DEPTH'
  },
  COUNTRIES_CODES_MODAL: {
    SET_MODAL_VISIBILITY: 'COUNTRIES_CODES_MODAL/SET_MODAL_VISIBILITY',
    SET_CAROUSEL_CURRENT_INDEX: 'COUNTRIES_CODES_MODAL/SET_CAROUSEL_CURRENT_INDEX',
    SET_CAROUSEL_OFFSET: 'COUNTRIES_CODES_MODAL/SET_CAROUSEL_OFFSET',
    SET_CAROUSEL_LIMIT: 'COUNTRIES_CODES_MODAL/SET_CAROUSEL_LIMIT',
    SET_CAROUSEL_RESTRICTED_DATA: 'COUNTRIES_CODES_MODAL/SET_CAROUSEL_RESTRICTED_DATA',
    MERGE_DATA_WITH_CAROUSEL_RESTRICTED_DATA: 'COUNTRIES_CODES_MODAL/MERGE_DATA_WITH_CAROUSEL_RESTRICTED_DATA'
  },
  CAMERA_ROLL_PICKER_MODAL: {
    SET_CAMERA_ROLL_GROUP_TYPES: 'CAMERA_ROLL_PICKER_MODAL/SET_CAMERA_ROLL_GROUP_TYPES',
    SET_CURRENT_CAMERA_ROLL_GROUP_TYPE: 'CAMERA_ROLL_PICKER_MODAL/SET_CURRENT_CAMERA_ROLL_GROUP_TYPE',
    SET_CAMERA_ROLL_ITEMS: 'CAMERA_ROLL_PICKER_MODAL/SET_CAMERA_ROLL_ITEMS',
    MERGE_DATA_WITH_CAMERA_ROLL_ITEMS: 'CAMERA_ROLL_PICKER_MODAL/MERGE_DATA_WITH_CAMERA_ROLL_ITEMS'
  },
  ROLE_MODAL: {
    RESET_MODAL: 'ROLE_MODAL/RESET_MODAL',
    SET_REFERENCE: 'ROLE_MODAL/SET_REFERENCE',
    SET_ROLES: 'ROLE_MODAL/SET_ROLES',
    SET_CURRENT_ROLE: 'ROLE_MODAL/SET_CURRENT_ROLE',
    SET_EMAIL: 'ROLE_MODAL/SET_EMAIL',
    APPEND_ROLES_TO_RESOURCE: 'ROLE_MODAL/APPEND_ROLES_TO_RESOURCE',
    FETCH_CARDINALITY: 'ROLE_MODAL/FETCH_CARDINALITY',
    FETCH_AVAILABLE_ROLES_TYPE: 'ROLE_MODAL/FETCH_AVAILABLE_BRAND_ROLES_TYPE',
    SET_ROLES_TYPE_LOADING_STATUS: 'ROLE_MODAL/SET_ROLES_TYPE_LOADING_STATUS',
    SET_CARDINALITY_LOADING_STATUS: 'ROLE_MODAL/SET_CARDINALITY_LOADING_STATUS',
    SET_APPEND_ROLES_TO_RESOURCE_LOADING_STATUS: 'ROLE_MODAL/SET_APPEND_ROLES_TO_RESOURCE_LOADING_STATUS',
    SET_CONNECTED_STATUS: 'ROLE_MODAL/SET_CONNECTED_STATUS'
  },
  WALLET_MODAL: {
    RESET_MODAL: 'WALLET_MODAL/RESET_MODAL',
    SET_CARD_NUMBER: 'WALLET_MODAL/SET_CARD_NUMBER',
    SET_CARD_EXPIRATION_DATE: 'WALLET_MODAL/SET_CARD_EXPIRATION_DATE',
    SET_CARD_EXPIRATION_DATE_MONTH: 'WALLET_MODAL/SET_CARD_EXPIRATION_DATE_MONTH',
    SET_CARD_EXPIRATION_DATE_YEAR: 'WALLET_MODAL/SET_CARD_EXPIRATION_DATE_YEAR',
    SET_CARD_CVV: 'WALLET_MODAL/SET_CARD_CVV',
    SET_CURRENT_HIDDEN_TAB_INDEX: 'WALLET_MODAL/SET_CURRENT_HIDDEN_TAB_INDEX',
    SET_CURRENCIES: 'WALLET_MODAL/SET_CURRENCIES',
    SET_CURRENT_CURRENCY: 'WALLET_MODAL/SET_CURRENT_CURRENCY',
    SET_WALLET_NAME: 'WALLET_MODAL/SET_WALLET_NAME',
    SET_WALLET: 'WALLET_MODAL/SET_WALLET',
    SET_WALLET_INITIAL_CREDIT_AMOUNT: 'WALLET_MODAL/SET_WALLET_INITIAL_CREDIT_AMOUNT',
    SET_WALLET_CURRENT_INITIAL_CREDIT_PLAN: 'WALLET_MODAL/SET_WALLET_CURRENT_INITIAL_CREDIT_PLAN',
    FETCH_WALLET_INITIAL_CREDIT_PLANS: 'WALLET_MODAL/FETCH_WALLET_INITIAL_CREDIT_PLANS',
    APPEND_WALLET_TO_RESOURCE: 'WALLET_MODAL/APPEND_WALLET_TO_RESOURCE',
    CHARGE_WALLET: 'WALLET_MODAL/CHARGE_WALLET',
    SET_FETCH_WALLET_INITIAL_CREDIT_PLANS_LOADING_STATUS: 'WALLET_MODAL/SET_FETCH_WALLET_INITIAL_CREDIT_PLANS_LOADING_STATUS',
    SET_MULTI_PURPOSE_REQUEST_TO_RESOURCE_LOADING_STATUS: 'WALLET_MODAL/SET_MULTI_PURPOSE_REQUEST_TO_RESOURCE_LOADING_STATUS',
    SET_CONNECTED_STATUS: 'WALLET_MODAL/SET_CONNECTED_STATUS'
  },
  WAREHOUSE_MODAL: {
    RESET_MODAL: 'WAREHOUSE_MODAL/RESET_MODAL',
    SET_WAREHOUSE_NAME: 'WAREHOUSE_MODAL/SET_WAREHOUSE_NAME',
    SET_ABSORBED_WAREHOUSE: 'WAREHOUSE_MODAL/SET_ABSORBED_WAREHOUSE',
    APPEND_WAREHOUSE_TO_RESOURCE: 'WAREHOUSE_MODAL/APPEND_WAREHOUSE_TO_RESOURCE',
    SET_APPEND_WAREHOUSE_TO_RESOURCE_LOADING_STATUS: 'WAREHOUSE_MODAL/SET_APPEND_WAREHOUSE_TO_RESOURCE_LOADING_STATUS',
    SET_CONNECTED_STATUS: 'WAREHOUSE_MODAL/SET_CONNECTED_STATUS'
  },
  PRODUCT_CATEGORIES_MODAL: {
    RESET_MODAL: 'PRODUCT_CATEGORIES_MODAL/RESET_MODAL',
    SET_PRODUCT_CATEGORY: 'PRODUCT_CATEGORIES_MODAL/SET_PRODUCT_CATEGORY',
    FETCH_AVAILABLE_PRODUCT_CATEGORIES: 'PRODUCT_CATEGORIES_MODAL/FETCH_AVAILABLE_PRODUCT_CATEGORIES',
    SET_FETCH_AVAILABLE_PRODUCT_CATEGORIES_LOADING_STATUS: 'PRODUCT_CATEGORIES_MODAL/SET_FETCH_AVAILABLE_PRODUCT_CATEGORIES_LOADING_STATUS',
    SET_CONNECTED_STATUS: 'PRODUCT_CATEGORIES_MODAL/SET_CONNECTED_STATUS'
  },
  PRODUCT_FEATURES_MODAL: {
    RESET_MODAL: 'PRODUCT_FEATURES_MODAL/RESET_MODAL',
    RESET_MODAL_INDEPENDLY: 'PRODUCT_FEATURES_MODAL/RESET_MODAL_INDEPENDLY',
    SET_PRODUCT_FEATURE: 'PRODUCT_FEATURES_MODAL/SET_PRODUCT_FEATURE',
    SET_SELECTED_UNIT: 'PRODUCT_FEATURES_MODAL/SET_SELECTED_UNIT',
    SET_MINIMUM_ORDER_QUANTITY: 'PRODUCT_FEATURES_MODAL/SET_MINIMUM_ORDER_QUANTITY',
    SET_MAXIMUM_ORDER_QUANTITY: 'PRODUCT_FEATURES_MODAL/SET_MAXIMUM_ORDER_QUANTITY',
    SET_QUANTITY: 'PRODUCT_FEATURES_MODAL/SET_QUANTITY',
    SET_DESCRIPTION: 'PRODUCT_FEATURES_MODAL/SET_DESCRIPTION',
    SET_CUSTOMIZED_FEATURE_NAME: 'PRODUCT_FEATURES_MODAL/SET_CUSTOMIZED_FEATURE_NAME',
    SET_CUSTOMIZED_FEATURE_VALUE: 'PRODUCT_FEATURES_MODAL/SET_CUSTOMIZED_FEATURE_VALUE',
    FETCH_AVAILABLE_PRODUCT_FEATURES: 'PRODUCT_FEATURES_MODAL/FETCH_AVAILABLE_PRODUCT_FEATURES',
    FETCH_AVAILABLE_PRODUCT_UNITS: 'PRODUCT_FEATURES_MODAL/FETCH_AVAILABLE_PRODUCT_UNITS',
    SET_FETCH_AVAILABLE_PRODUCT_FEATURES_LOADING_STATUS: 'PRODUCT_FEATURES_MODAL/SET_FETCH_AVAILABLE_PRODUCT_FEATURES_LOADING_STATUS',
    SET_FETCH_AVAILABLE_PRODUCT_UNITS_LOADING_STATUS: 'PRODUCT_FEATURES_MODAL/SET_FETCH_AVAILABLE_PRODUCT_UNITS_LOADING_STATUS',
    SET_CONNECTED_STATUS: 'PRODUCT_FEATURES_MODAL/SET_CONNECTED_STATUS'
  },
  PRODUCT_UNIT_DEPENDED_MODAL: {
    RESET_MODAL: 'PRODUCT_UNIT_DEPENDED_MODAL/RESET_MODAL',
    SET_SELECTED_UNIT: 'PRODUCT_UNIT_DEPENDED_MODAL/SET_SELECTED_UNIT',
    SET_UNITS: 'PRODUCT_UNIT_DEPENDED_MODAL/SET_QUANTITY'
  }
};
