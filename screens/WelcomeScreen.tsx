import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from '../components/Themed';
import MenuIcon from '../components/MenuIcon';
import { useEffect } from 'react';
import main from '../styles/main';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import WalletConnectButton from '../components/WalletConnect';

export default function TransferScreen() {
  const connector = useWalletConnect();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props: StackHeaderLeftButtonProps) => (<MenuIcon />)
    });
  });

  const imgString = () => {
    const rand = Math.floor(Math.random() * 7);
    switch (rand) {
      case 1:
        return require('../assets/backgrounds/1.gif');

      case 2:
        return require('../assets/backgrounds/2.gif');

      case 3:
        return require('../assets/backgrounds/3.gif');

      case 4:
        return require('../assets/backgrounds/4.gif');

      case 5:
        return require('../assets/backgrounds/5.gif');

      case 6:
        return require('../assets/backgrounds/6.gif');

      case 7:
        return require('../assets/backgrounds/7.gif');

      case 8:
        return require('../assets/backgrounds/8.gif');

      default:
        return require('../assets/backgrounds/8.gif');
    }
  };

  return (
    <View style={main.centered}>
      <ImageBackground source={imgString()} style={styles.container}>
        {!connector.connected
          ?
          <>
            <WalletConnectButton />
          </>
          :
          <>
            <View style={{ opacity: 1, backgroundColor: 'white', borderRadius: 20, padding: 20, margin: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>Welcome</Text>
              <Text style={{ color: 'darkgreen', borderLeftWidth: 0.3, borderColor: 'black' }}>{connector.accounts[0]}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.button2}>
              <Text style={styles.text}>Press to continue</Text>
            </TouchableOpacity>
          </>
        }
      </ImageBackground>

    </View>
  )
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