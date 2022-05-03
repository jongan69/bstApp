import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { Text, View } from '../components/Themed';
import MenuIcon from '../components/MenuIcon';
import { useEffect } from 'react';
import main from '../styles/main';
import { useWalletConnect } from "@walletconnect/react-native-dapp";


export default function GalleryScreen() {
  const navigation = useNavigation();
  const connector = useWalletConnect();

  useEffect(() => {
    navigation.setOptions({
      showHeader: true,
      headerLeft: (props: StackHeaderLeftButtonProps) => (<MenuIcon/>)
    });
  });

  return (
    <View style={main.centered}>
            {connector.accounts[0]
        ? 
        <>
        <Text
        style={[main.centered, {marginTop: 10, marginBottom: '30%'}]}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
       Ethereum NFTs:
      </Text>

      <Text
       style={[main.centered, {marginTop: 10, marginBottom: '30%'}]}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
       Polygon NFTs:
      </Text>

      <Text
       style={[main.centered, {marginTop: 10, marginBottom: '30%'}]}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
       Solana NFTs:
      </Text>

      <Text
        style={[main.centered, {marginTop: 10, marginBottom: '30%'}]}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
      Avalanche NFTs:
      </Text>
      </>
        :
        <Text
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          No Wallet Connected
        </Text>
      }
    </View>
  )
};