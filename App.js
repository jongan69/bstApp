import "./global";

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from "./reduxToolkit/store";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { StyleSheet, View, LogBox, Platform, Text, ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import { TailwindProvider } from 'tailwind-rn';
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigation from './navigation';
import utilities from './tailwind.json';

import { QueryClient, QueryClientProvider } from "react-query";
// import { API_URL } from "@env"
LogBox.ignoreAllLogs();


const SCHEME_FROM_APP_JSON = 'bst'


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  // const queryClient = new QueryClient();

  if (!isLoadingComplete) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00ff00"/>
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
        }}>
        <TailwindProvider utilities={utilities}>
          <Provider store={store}>
            <StatusBar />
            <SafeAreaProvider>
              <Navigation colorScheme={colorScheme} />
            </SafeAreaProvider>
          </Provider>
        </TailwindProvider>
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