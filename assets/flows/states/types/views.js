export const VIEWS = {
  AUTHENTICATION: {
    LOGIN: {
      SET_TOKEN: 'AUTHENTICATION/LOGIN/SET_TOKEN',
      SET_PASSWORD: 'AUTHENTICATION/LOGIN/SET_PASSWORD',
      VERIFY_AUTHENTICATION: 'AUTHENTICATION/LOGIN/VERIFY_AUTHENTICATION',
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
      SET_DEMAND_MODE: 'AUTHENTICATION/SIGNUP/SET_DEMAND_MODE',
      SET_FIRST_NAME: 'AUTHENTICATION/SIGNUP/SET_FIRST_NAME',
      SET_LAST_NAME: 'AUTHENTICATION/SIGNUP/SET_LAST_NAME',
      SET_PHONE_NUMBER: 'AUTHENTICATION/SIGNUP/SET_PHONE_NUMBER',
      SET_EMAIL: 'AUTHENTICATION/SIGNUP/SET_EMAIL',
      SET_PASSWORD: 'AUTHENTICATION/SIGNUP/SET_PASSWORD',
      FETCH_AVAILABLE_ROLE_WITH_BRAND_AND_TOKEN: 'AUTHENTICATION/SIGNUP/FETCH_AVAILABLE_ROLE_WITH_BRAND_AND_TOKEN',
      SUBSCRIBE_THE_USER: 'AUTHENTICATION/SIGNUP/SUBSCRIBE_THE_USER',
      COMPLETE_THE_USER_REGISTRATION: 'AUTHENTICATION/SIGNUP/COMPLETE_THE_USER_REGISTRATION',
      SET_FETCH_AVAILABLE_ROLE_WITH_BRAND_AND_TOKEN_LOADING_STATUS: 'AUTHENTICATION/SIGNUP/SET_FETCH_AVAILABLE_ROLE_WITH_BRAND_AND_TOKEN_LOADING_STATUS',
      SET_SUBSCRIBE_LOADING_STATUS: 'AUTHENTICATION/SIGNUP/SET_SUBSCRIBE_LOADING_STATUS',
      SET_CONNECTED_STATUS: 'AUTHENTICATION/SIGNUP/SET_CONNECTED_STATUS',
      SET_COUNTRIES_CODES_MODAL_VISIBILITY: 'AUTHENTICATION/SIGNUP/SET_COUNTRIES_CODES_MODAL_VISIBILITY',
      REINITILIZE_THE_STATE: 'AUTHENTICATION/SIGNUP/REINITILIZE_THE_STATE',
      REGENERATE_THE_USER_PHONE_NUMBER_VALIDATION_TOKEN: 'AUTHENTICATION/SIGNUP/REGENERATE_THE_USER_PHONE_NUMBER_VALIDATION_TOKEN'
    },
    VERIFY_PHONE_NUMBER: {
      SET_SECRET_KEY: 'AUTHENTICATION/VERIFY_PHONE_NUMBER/SET_SECRET_KEY',
      SET_VALIDATION_TOKEN: 'AUTHENTICATION/VERIFY_PHONE_NUMBER/SET_VALIDATION_TOKEN',
      SET_FINAL_SUBSCRIBE_LOADING_STATUS: 'AUTHENTICATION/VERIFY_PHONE_NUMBER/SET_FINAL_SUBSCRIBE_LOADING_STATUS',
      SET_CONNECTED_STATUS: 'AUTHENTICATION/VERIFY_PHONE_NUMBER/SET_CONNECTED_STATUS',
      VERIFY_THE_USER_PHONE_NUMBER: 'AUTHENTICATION/VERIFY_PHONE_NUMBER/VERIFY_THE_USER_PHONE_NUMBER'
    }
  },
  PROFILE: {
    OVERSEER: {
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
    }
  }
};
