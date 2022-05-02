import "./global";

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from "./reduxToolkit/store";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { StyleSheet, View, LogBox, Platform, Text } from "react-native";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { TailwindProvider } from 'tailwind-rn';
import WalletConnectProvider, { useWalletConnect } from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WalletConnectButton from "./components/WalletConnect";

// import utilities from './tailwind.json';
// import Navigation from './navigation';
// import { API_URL } from "@env"
LogBox.ignoreAllLogs();


const SCHEME_FROM_APP_JSON = 'bst'


export default function App() {
  const connector = useWalletConnect();
  // const queryClient = new QueryClient();
  // const colorScheme = useColorScheme();
  const isLoadingComplete = useCachedResources();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  if (!isLoadingComplete) {
    return (
      <View style={styles.loader}>
        <Text> Loading...  </Text>
      </View>
    );
  } else {
    return (
      <WalletConnectProvider
        redirectUrl={
          Platform.OS === "web"
            ? window.location.origin
            : `${SCHEME_FROM_APP_JSON}://`
        }
        storageOptions={{
          asyncStorage: AsyncStorage,
        }}
      >
        {/* <TailwindProvider utilities={utilities}> */}
        <Provider store={store}>
          <StatusBar />
          <SafeAreaProvider>
            <View style={styles.container}>
              {!connector.connected ? (
                <>
                  <WalletConnectButton />
                </>
              ) : (
                <>
                  <Text> Something happened on login </Text>
                  <WalletConnectButton />
                </>
              )}
            </View>
          </SafeAreaProvider>
        </Provider>
        {/* </TailwindProvider> */}
      </WalletConnectProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 100,
    flex: 1,
    // marginHorizontal: 10,
  },
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  dataContainer: {
    flexDirection: 'row'
  }
});