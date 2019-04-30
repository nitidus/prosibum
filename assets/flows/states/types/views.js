export const VIEWS = {
  AUTHENTICATION: {
    LOGIN: {
      SET_LANGUAGE: 'AUTHENTICATION/LOGIN/SET_LANGUAGE',
      SET_TOKEN: 'AUTHENTICATION/LOGIN/SET_TOKEN',
      SET_PASSWORD: 'AUTHENTICATION/LOGIN/SET_PASSWORD',
      VERIFY_AUTHENTICATION: 'AUTHENTICATION/LOGIN/VERIFY_AUTHENTICATION',
      SET_LANGUAGES_MODAL_VISIBILITY: 'AUTHENTICATION/LOGIN/SET_LANGUAGES_MODAL_VISIBILITY',
      SET_LOADING_STATUS: 'AUTHENTICATION/LOGIN/SET_LOADING_STATUS',
      SET_CONNECTED_STATUS: 'AUTHENTICATION/LOGIN/SET_CONNECTED_STATUS'
    },
    FORGOTTEN_PASSWORD: {
      SET_REQUEST_TYPE: 'AUTHENTICATION/FORGOTTEN_PASSWORD/SET_REQUEST_TYPE',
      SET_EMAIL: 'AUTHENTICATION/FORGOTTEN_PASSWORD/SET_EMAIL',
      SET_PHONE_NUMBER: 'AUTHENTICATION/FORGOTTEN_PASSWORD/SET_PHONE_NUMBER',
      SEND_RECOVERY_LINK: 'AUTHENTICATION/FORGOTTEN_PASSWORD/SEND_RECOVERY_LINK',
      SET_COUNTRIES_CODES_MODAL_VISIBILITY: 'AUTHENTICATION/FORGOTTEN_PASSWORD/SET_COUNTRIES_CODES_MODAL_VISIBILITY'
    },
    SIGNUP: {
      RESET_FORM: 'AUTHENTICATION/SIGNUP/RESET_FORM',
      SET_LANGUAGE: 'AUTHENTICATION/SIGNUP/SET_LANGUAGE',
      SET_DEMAND_MODE: 'AUTHENTICATION/SIGNUP/SET_DEMAND_MODE',
      SET_FIRST_NAME: 'AUTHENTICATION/SIGNUP/SET_FIRST_NAME',
      SET_LAST_NAME: 'AUTHENTICATION/SIGNUP/SET_LAST_NAME',
      SET_PHONE_NUMBER: 'AUTHENTICATION/SIGNUP/SET_PHONE_NUMBER',
      SET_EMAIL: 'AUTHENTICATION/SIGNUP/SET_EMAIL',
      SET_PASSWORD: 'AUTHENTICATION/SIGNUP/SET_PASSWORD',
      SET_SECRET_KEY: 'AUTHENTICATION/SIGNUP/SET_SECRET_KEY',
      SET_VALIDATION_TOKEN: 'AUTHENTICATION/SIGNUP/SET_VALIDATION_TOKEN',
      FETCH_AVAILABLE_ROLE_WITH_BRAND_AND_TOKEN: 'AUTHENTICATION/SIGNUP/FETCH_AVAILABLE_ROLE_WITH_BRAND_AND_TOKEN',
      VERIFY_THE_USER: 'AUTHENTICATION/SIGNUP/VERIFY_THE_USER',
      SUBSCRIBE_THE_USER: 'AUTHENTICATION/SIGNUP/SUBSCRIBE_THE_USER',
      SET_FETCH_AVAILABLE_ROLE_WITH_BRAND_AND_TOKEN_LOADING_STATUS: 'AUTHENTICATION/SIGNUP/SET_FETCH_AVAILABLE_ROLE_WITH_BRAND_AND_TOKEN_LOADING_STATUS',
      SET_VERIFICATION_LOADING_STATUS: 'AUTHENTICATION/SIGNUP/SET_VERIFICATION_LOADING_STATUS',
      SET_SUBSCRIBE_LOADING_STATUS: 'AUTHENTICATION/SIGNUP/SET_SUBSCRIBE_LOADING_STATUS',
      SET_CONNECTED_STATUS: 'AUTHENTICATION/SIGNUP/SET_CONNECTED_STATUS',
      SET_COUNTRIES_CODES_MODAL_VISIBILITY: 'AUTHENTICATION/SIGNUP/SET_COUNTRIES_CODES_MODAL_VISIBILITY',
      REINITILIZE_THE_STATE: 'AUTHENTICATION/SIGNUP/REINITILIZE_THE_STATE'
    },
    VERIFY_EMAIL: {
      SET_VALIDATION_TOKEN: 'AUTHENTICATION/VERIFY_EMAIL/SET_VALIDATION_TOKEN',
      SET_VERIFY_THE_USER_EMAIL_ADDRESS_LOADING_STATUS: 'AUTHENTICATION/VERIFY_EMAIL/SET_VERIFY_THE_USER_EMAIL_ADDRESS_LOADING_STATUS',
      SET_CONNECTED_STATUS: 'AUTHENTICATION/VERIFY_EMAIL/SET_CONNECTED_STATUS'
    }
  },
  PROFILE: {
    OVERSEER: {
      SET_TOP_PILOT_BAR_CURRENT_TAB: 'PROFILE/OVERSEER/SET_TOP_PILOT_BAR_CURRENT_TAB',
      SET_TOP_PILOT_BAR_TABS: 'PROFILE/OVERSEER/SET_TOP_PILOT_BAR_TABS',
      SET_BOTTOM_PILOT_TAB_BAR_CURRENT_TAB: 'PROFILE/OVERSEER/SET_BOTTOM_PILOT_TAB_BAR_CURRENT_TAB',
      SET_BOTTOM_PILOT_TAB_BAR_TABS: 'PROFILE/OVERSEER/SET_BOTTOM_PILOT_TAB_BAR_TABS'
    },
    USER_PROFILE: {
      SET_PILOT_CURRENT_TAB: 'PROFILE/USER_PROFILE/SET_PILOT_CURRENT_TAB',
      SET_PILOT_TABS: 'PROFILE/USER_PROFILE/SET_PILOT_TABS'
    },
    ROLES: {
      SET_PILOT_CURRENT_TAB: 'PROFILE/ROLES/SET_PILOT_CURRENT_TAB',
      SET_PILOT_TABS: 'PROFILE/ROLES/SET_PILOT_TABS',
      SET_SELECTED_REFERENCE_ROLE: 'PROFILE/ROLES/SET_SELECTED_REFERENCE_ROLE',
      RESET_SELECTED_REFERENCE_ROLE: 'PROFILE/ROLES/RESET_SELECTED_REFERENCE_ROLE',
      SET_ROLES_MODAL_VISIBILITY: 'PROFILE/ROLES/SET_ROLES_MODAL_VISIBILITY',
      FETCH_AVAILABLE_ROLES_TYPE: 'PROFILE/ROLES/FETCH_AVAILABLE_BRAND_ROLES_TYPE',
      FETCH_AVAILABLE_ROLES: 'PROFILE/ROLES/FETCH_AVAILABLE_BRAND_ROLES',
      SET_ROLES_LOADING_STATUS: 'PROFILE/ROLES/SET_ROLES_LOADING_STATUS',
      SET_ROLES_TYPE_LOADING_STATUS: 'PROFILE/ROLES/SET_ROLES_TYPE_LOADING_STATUS',
      SET_CONNECTED_STATUS: 'PROFILE/ROLES/SET_CONNECTED_STATUS'
    },
    SELECTED_ROLE: {
      RESET_SELECTED_ROLE: 'PROFILE/SELECTED_ROLE/RESET_SELECTED_ROLE',
      SET_SELECTED_REFERENCE_ROLE: 'PROFILE/SELECTED_ROLE/SET_SELECTED_REFERENCE_ROLE',
      RESET_SELECTED_REFERENCE_ROLE: 'PROFILE/SELECTED_ROLE/RESET_SELECTED_REFERENCE_ROLE',
      SET_ROLES_MODAL_VISIBILITY: 'PROFILE/SELECTED_ROLE/SET_ROLES_MODAL_VISIBILITY',
      FETCH_AVAILABLE_ROLES: 'PROFILE/SELECTED_ROLE/FETCH_AVAILABLE_BRAND_ROLES',
      SET_ROLES_LOADING_STATUS: 'PROFILE/SELECTED_ROLE/SET_ROLES_LOADING_STATUS',
      SET_CONNECTED_STATUS: 'PROFILE/SELECTED_ROLE/SET_CONNECTED_STATUS'
    }
  },
  DASHBOARD: {
    WALLETS: {
      SET_PILOT_CURRENT_TAB: 'PROFILE/WALLETS/SET_PILOT_CURRENT_TAB',
      SET_PILOT_TABS: 'PROFILE/WALLETS/SET_PILOT_TABS',
      SET_WALLET_MODAL_VISIBILITY: 'PROFILE/WALLETS/SET_WALLET_MODAL_VISIBILITY',
      FETCH_AVAILABLE_WALLET_CURRENCIES_TYPE: 'PROFILE/WALLETS/FETCH_AVAILABLE_WALLET_CURRENCIES_TYPE',
      SET_SELECTED_WALLET: 'PROFILE/WALLETS/SET_SELECTED_WALLET',
      FETCH_AVAILABLE_WALLETS: 'PROFILE/WALLETS/FETCH_AVAILABLE_WALLETS',
      SET_WALLETS_LOADING_STATUS: 'PROFILE/WALLETS/SET_WALLETS_LOADING_STATUS',
      SET_WALLET_CURRENCIES_TYPE_LOADING_STATUS: 'PROFILE/WALLETS/SET_WALLET_CURRENCIES_TYPE_LOADING_STATUS',
      SET_CONNECTED_STATUS: 'PROFILE/WALLETS/SET_CONNECTED_STATUS'
    },
    SELECTED_WALLET: {
      SET_REFERENCE_WALLET: 'PROFILE/SELECTED_WALLET/SET_REFERENCE_WALLET',
      FETCH_AVAILABLE_TRANSACTIONS: 'PROFILE/SELECTED_WALLET/FETCH_AVAILABLE_TRANSACTIONS',
      SET_TRANSACTIONS_LOADING_STATUS: 'PROFILE/SELECTED_WALLET/SET_WALLETS_LOADING_STATUS',
      SET_CONNECTED_STATUS: 'PROFILE/SELECTED_WALLET/SET_CONNECTED_STATUS'
    }
  },
  PRODUCTS: {
    NEW_PRODUCT: {
      SET_LANGUAGE: 'PRODUCTS/NEW_PRODUCT/SET_LANGUAGE',
      RESET_PRODUCT_FORMS: 'PRODUCTS/NEW_PRODUCT/RESET_PRODUCT_FORMS',
      SET_PRODUCT_QUERY: 'PRODUCTS/NEW_PRODUCT/SET_PRODUCT_QUERY',
      SET_PRODUCT_QUERY_ITEMS: 'PRODUCTS/NEW_PRODUCT/SET_PRODUCT_QUERY_ITEMS',
      SET_PRODUCT: 'PRODUCTS/NEW_PRODUCT/SET_PRODUCT',
      SET_PRODUCT_INTERNAL_NAME: 'PRODUCTS/NEW_PRODUCT/SET_PRODUCT_INTERNAL_NAME',
      SET_CURRENT_WAREHOUSE: 'PRODUCTS/NEW_PRODUCT/SET_CURRENT_WAREHOUSE',
      SET_WAREHOUSES: 'PRODUCTS/NEW_PRODUCT/SET_WAREHOUSES',
      APPEND_WAREHOUSE: 'PRODUCTS/NEW_PRODUCT/APPEND_WAREHOUSE',
      SET_CATEGORY: 'PRODUCTS/NEW_PRODUCT/SET_CATEGORY',
      SET_PRODUCT_FEATURES: 'PRODUCTS/NEW_PRODUCT/SET_PRODUCT_FEATURES',
      APPEND_PRODUCT_FEATURE: 'PRODUCTS/NEW_PRODUCT/APPEND_PRODUCT_FEATURE',
      SET_PRODUCT_PHOTOS: 'PRODUCTS/NEW_PRODUCT/SET_PRODUCT_PHOTOS',
      APPEND_PRODUCT_PHOTO: 'PRODUCTS/NEW_PRODUCT/APPEND_PRODUCT_PHOTO',
      SET_PRODUCT_PRIMARY_PHOTO: 'PRODUCTS/NEW_PRODUCT/SET_PRODUCT_PRIMARY_PHOTO',
      SET_SELECTED_PRODUCT_PHOTO_FETCHINNG_MODE_ON: 'PRODUCTS/NEW_PRODUCT/SET_SELECTED_PRODUCT_PHOTO_FETCHINNG_MODE_ON',
      SET_PRODUCT_PRICES: 'PRODUCTS/NEW_PRODUCT/SET_PRODUCT_PRICES',
      APPEND_PRODUCT_PRICE: 'PRODUCTS/NEW_PRODUCT/APPEND_PRODUCT_PRICE',
      SET_SELECTED_PRODUCT_PRICE_FETCHINNG_MODE_ON: 'PRODUCTS/NEW_PRODUCT/SET_SELECTED_PRODUCT_PRICE_FETCHINNG_MODE_ON',
      SET_PRODUCT_SHIPPING_PLANS: 'PRODUCTS/NEW_PRODUCT/SET_PRODUCT_SHIPPING_PLANS',
      APPEND_PRODUCT_SHIPPING_PLAN: 'PRODUCTS/NEW_PRODUCT/APPEND_PRODUCT_SHIPPING_PLAN',
      SET_SELECTED_PRODUCT_SHIPPING_PLANS_MODE_ON: 'PRODUCTS/NEW_PRODUCT/SET_SELECTED_PRODUCT_SHIPPING_PLANS_MODE_ON',
      SET_WAREHOUSE_MODAL_VISIBILITY: 'PRODUCTS/NEW_PRODUCT/SET_WAREHOUSE_MODAL_VISIBILITY',
      SET_PRODUCT_CATEGORIES_MODAL_VISIBILITY: 'PRODUCTS/NEW_PRODUCT/SET_PRODUCT_CATEGORIES_MODAL_VISIBILITY',
      SET_PRODUCT_FEATURES_MODAL_VISIBILITY: 'PRODUCTS/NEW_PRODUCT/SET_PRODUCT_FEATURES_MODAL_VISIBILITY',
      SET_PRODUCT_PHOTO_MODAL_VISIBILITY: 'PRODUCTS/NEW_PRODUCT/SET_PRODUCT_PHOTO_MODAL_VISIBILITY',
      SET_PRODUCT_UNIT_DEPENDED_MODAL_VISIBILITY: 'PRODUCTS/NEW_PRODUCT/SET_PRODUCT_UNIT_DEPENDED_MODAL_VISIBILITY',
      SET_PRODUCT_SHIPPING_METHODS_MODAL_VISIBILITY: 'PRODUCTS/NEW_PRODUCT/SET_PRODUCT_SHIPPING_METHODS_MODAL_VISIBILITY',
      FETCH_AVAILABLE_WAREHOUSES: 'PRODUCTS/NEW_PRODUCT/FETCH_AVAILABLE_WAREHOUSES',
      FETCH_AVAILABLE_PRODUCTS_BASED_ON_QUERY: 'PRODUCTS/NEW_PRODUCT/FETCH_AVAILABLE_PRODUCTS_BASED_ON_QUERY',
      FETCH_PRODUCT_BASED_ON_CATEGORY: 'PRODUCTS/NEW_PRODUCT/FETCH_PRODUCT_BASED_ON_CATEGORY',
      SET_WAREHOUSES_LOADING_STATUS: 'PRODUCTS/NEW_PRODUCT/SET_WAREHOUSES_LOADING_STATUS',
      SET_FETCH_AVAILABLE_PRODUCTS_BASED_ON_QUERY_LOADING_STATUS: 'PRODUCTS/NEW_PRODUCT/SET_FETCH_AVAILABLE_PRODUCTS_BASED_ON_QUERY_LOADING_STATUS',
      SET_FETCH_PRODUCT_BASED_ON_CATEGORY_LOADING_STATUS: 'PRODUCTS/NEW_PRODUCT/SET_FETCH_PRODUCT_BASED_ON_CATEGORY_LOADING_STATUS',
      SET_CONNECTED_STATUS: 'PRODUCTS/NEW_PRODUCT/SET_CONNECTED_STATUS'
    }
  }
};
