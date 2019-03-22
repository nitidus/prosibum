//Dashboard datasets
  import self from './dashboard/index.json';
  //Wallets
  import wallets from './dashboard/wallets/index.json';
    //Wallets Subsets
    import selected_wallet from './dashboard/wallets/selected-wallet.json';

module.exports = {
  dashboard_sub_views: {
    wallets_subsets: {
      selected_wallet
    },
    wallets
  },
  self,
  selected_wallet,
  wallets
};
