import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';

import { Text, View } from '../components/Themed';
import MenuIcon from '../components/MenuIcon';
import { useEffect } from 'react';
import main from '../styles/main';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { Alert, Button } from 'react-native';

export default function TransferScreen() {
  const connector = useWalletConnect();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props: StackHeaderLeftButtonProps) => (<MenuIcon />)
    });
  });

  return (
    <View style={main.centered}>
      {connector.accounts[0]
        ?
        <>
          <View style={{ alignItems: 'center' }}>
            <Text
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)"
              style={{ padding: 35 }}
            >
              Moving NFTs costs gas, We're working on it. NFTs can be bought, sold or traded to logged in wallet.
            </Text>
            <Text> Minting Contract Address is: 0x4f29FbeE650c3eA006a174547a2F4e74c02a2Be5</Text>
            {connector.chainId === 4 && <Text style={{ color: 'green' }}> USING CORRECT NETWORK! ENJOY </Text>}
            {connector.chainId != 4 && <Text style={{ color: 'red' }}> USING INNCORRECT NETWORK! PLEASE CHANGE </Text>}


            <Text style={{ fontSize: 10, padding: 10 }}> To get started, you must switch to Velas (VLX) for multichain</Text>
            <Text style={{ fontSize: 10, padding: 5 }}> Current Chain ID: {connector.chainId}</Text>
            <Text style={{ fontSize: 10, padding: 5 }}> Current NETWORK: {connector.networkId}</Text>
            <Text style={{ fontSize: 10, padding: 5 }}> Current URI: {connector.uri}</Text>
            <Text style={{ fontSize: 10, padding: 5 }}> Current RPC: {connector.rpcUrl}</Text>
            <Text style={{ fontSize: 10, padding: 5 }}> Current Peer ID: {connector.peerId}</Text>
            <Text style={{ fontSize: 10, padding: 5 }}> Current Handshake ID: {connector.handshakeId}</Text>
            <Text style={{ fontSize: 10, padding: 5 }}> Current Handshake Topic: {connector.handshakeTopic}</Text>


            <Text style={{ fontSize: 10, padding: 5 }}> Client ID: {connector.clientId}</Text>
            <Button
              title='Change to Rinkeby'
              onPress={() => {
                connector.updateChain({
                  chainId: 4,
                  networkId: 0,
                  rpcUrl: "https://rinkeby.infura.io/v3/",
                  nativeCurrency: {
                    name: "Rinkeby Test Network",
                    symbol: "ETH"
                  }
                })
              }} />
          </View>
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