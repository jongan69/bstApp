import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Welcome: {
            screens: {
              WelcomeScreen: 'welcome'
            }
          },
          Home: {
            screens: {
              HomeScreen: 'home'
            }
          },
          Scan: {
            screens: {
              ProfileScreen: 'scan'
            }
          },
        },
      },
      NotFound: '*',
    },
  },
};
