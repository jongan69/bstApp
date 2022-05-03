import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              Home: 'home'
            }
          },
          Gallery: {
            screens: {
              GalleryScreen: 'gallery'
            }
          },
          Wallet: {
            screens: {
              WalletScreen: 'wallet'
            }
          },
        },
      },
      NotFound: '*',
    },
  },
};
