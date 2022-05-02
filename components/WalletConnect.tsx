import * as React from "react";
import { Text, TouchableOpacity, StyleSheet, ImageBackground, View } from "react-native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useThemeColor } from "./Themed";

const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

function Button({ onPress, label }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function WalletConnectButton() {
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  const imgString = () => {
    const rand = Math.floor(Math.random() * 3) + 1;
    if (rand === 1) {
      return require('../assets/backgrounds/1.gif');
    }
    if (rand == 2) {
      return require('../assets/backgrounds/2.gif');
    }
    return require('../assets/backgrounds/3.gif');
  };

  return (
    <>
      {!connector.connected ? (
        <>
          <ImageBackground source={imgString()} style={styles.container}>
            <Button onPress={connectWallet} label="Connect a wallet" />
          </ImageBackground>
        </>
      ) : (
        <>
          <ImageBackground source={imgString()} style={styles.container}>
            <View style={{ opacity: 1, backgroundColor: 'white', borderRadius: 20, padding: 20, margin: 20 }}>
              <Text style={{ fontSize: 20 }}>Welcome</Text>
              <Text style={{ color: 'darkgreen', borderLeftWidth: 0.3, borderColor: 'black' }}>{shortenAddress(connector.accounts[0])}</Text>
            </View>
            <Button onPress={killSession} label="Log out" />
            <TouchableOpacity style={styles.button2}>
              <Text style={styles.text}>Press to continue</Text>
            </TouchableOpacity>
          </ImageBackground>
        </>
      )
      }
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5A45FF",
    color: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    margin: 10
  },
  button2: {
    backgroundColor: "#5A45FF",
    color: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: '40%'
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#060109',
    tintColor: 'black',
    opacity: 0.8,
  },
  container: {
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    tintColor: 'white',
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    // opacity: 0.5,
  },
});