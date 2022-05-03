import * as React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    navigation.navigate('Welcome')
    return connector.killSession();
  }, [connector]);


  return (
    <>
      {!connector.connected ? (
        <>
          <Button onPress={connectWallet} label="Connect a wallet" />
        </>
      ) : (
        <> 
          <Text style={{ color: 'darkgreen', borderLeftWidth: 0.3, borderColor: 'black' }}>{shortenAddress(connector.accounts[0])}</Text>
          <Button onPress={killSession} label="Log out" />
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
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});