import * as React from 'react';
import {
  FlatList,
  StyleSheet,
} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { Text, View } from '../components/Themed';
import MenuIcon from '../components/MenuIcon';
import { useEffect, useState } from 'react';
import main from '../styles/main';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import OrderItem from '../components/OrderItem';


export default function GalleryScreen() {
  const navigation = useNavigation();
  const connector = useWalletConnect();
  const [nfts, setNfts] = useState([])

  useEffect(() => {

    navigation.setOptions({
      showHeader: true,
      headerLeft: (props: StackHeaderLeftButtonProps) => (<MenuIcon />)
    });

    if (nfts.length === 0) {
      getNfts();
    }
  });


  const getNfts = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    const baseURL = "https://eth-rinkeby.alchemyapi.io/v2/CAnXWTn51A7kBC5SJmOkHOPd2g0tCeKu/getNFTs/";
    const ownerAddr = connector.accounts[0];
    const contractAddr = "0x4f29FbeE650c3eA006a174547a2F4e74c02a2Be5";
    const fetchURL = `${baseURL}?owner=${ownerAddr}&contractAddresses[]=${contractAddr}`;

    await fetch(fetchURL, requestOptions)
      .then(response => response.json())
      .then(response => {
        setNfts(response?.ownedNfts),
          console.log('NFTs:', JSON.stringify(nfts))
      })
      // .then(result => { console.log('RESULT:', result)})
      .catch(error => console.log('error', error))
    return
  }



  const list = () => {
    return nfts.map((element) => {
      return (
        <>
          <FlatList
        // style={tw.style("h-3\/4")}
        data={nfts}
        keyExtractor={(item) => item.id.tokenId}
        renderItem={({ index }) =>
          <>
               <Text>{element.title}</Text>
          </>
        }
        // ListFooterComponent={renderFooter(nfts, total)}
      />
        {/* <View key={element.id.tokenId} style={{ margin: 0 }}>
          <Text>{element.title}</Text>
          <Text>{element.description}</Text>
        </View> */}
        </>
      );
    });
  };





  return (
    <View style={main.centered}>
      {connector.accounts[0]
        ?
        <>
          <Text
            style={[main.centered, { marginTop: 10, marginBottom: '0%' }]}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Minted NFTs (Rinkeby):

            {/* { nfts.map((item, index) => {
        
      })} */}

           
          </Text>
          <Text> {list()}</Text>


          {/* <Text
            style={[main.centered, { marginTop: 10, marginBottom: '10%' }]}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Ethereum NFTs:

          </Text>

          <Text
            style={[main.centered, { marginTop: 10, marginBottom: '30%' }]}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Solana NFTs:
          </Text> */}

          {/* <Text
            style={[main.centered, { marginTop: 10, marginBottom: '30%' }]}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            Avalanche NFTs:
          </Text> */}
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


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // paddingTop: 22
  },
  item: {
    padding: 0,
    fontSize: 20,
    height: 30,
  },
});