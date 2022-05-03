import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StackHeaderLeftButtonProps,  StackHeaderRightButtonProps } from '@react-navigation/stack';
import MenuIcon from '../components/MenuIcon';
import tw from 'twrnc';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { FontAwesome } from '@expo/vector-icons'
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import InfiniteScroll from 'react-infinite-scroll-component';
import WalletConnectButton from "../components/WalletConnect";
import { useQuery, } from "react-query";

// import Swiper from "react-native-deck-swiper";
// let defaultAvatar = 'https://avatars.dicebear.com/api/bottts/hi.svg?scale=10&colorful=true'

const HomeScreen = () => {
  const navigation = useNavigation();
  const connector = useWalletConnect();
  const dispatch = useDispatch()
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [data, setData] = useState([])

  useEffect(() => {
    //Get device Height
    setHeight(Dimensions.get('window').height);
    //Get device Width
    setWidth(Dimensions.get('window').width);

    navigation.setOptions({
      headerLeft: (_props: StackHeaderLeftButtonProps) => (<MenuIcon />),
      headerRight: (props: StackHeaderRightButtonProps) => (
        <TouchableOpacity
              onPress={() => navigation.navigate("Scan")}
            >
              <FontAwesome
                style={{ borderWidth: 5, borderColor: 'black', borderRadius: 20 , margin: 10, marginRight: 20}}
                name="camera-retro" size={14} color="orange" />
        </TouchableOpacity>
      )
    });
  });


  const _loadMoreContentAsync = async () => {
    const url = 'https://google.com'
    const options = {
      method: 'GET',
      // body: JSON.stringify(completeOrder),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, options);
    const data = await response.json();
    setData(data) 
    console.log('infite content load: ', data)
  }

  // const swipeRef = useRef(null);
  // Indicates the amount of items in basket
  // const nfts = useSelector(selectItem)
  // const ignore = useSelector(ignoreList)
  // Grabs the NFTS to display.
  // const { data: nftCard, isLoading } = useQuery("cards", async () => await getList());
  // let random = Math.floor(Math.random() * nftCard?.length);
  // console.log('Random index is ', random)
  // console.log('nfts length is ', nftCard?.length)
  // if (isLoading)
  //   return (
  //     <SafeAreaView>
  //       <View style={{
  //         paddingTop: '50%',
  //         flexDirection: 'column',
  //         justifyContent: 'center',
  //         alignItems: 'center'
  //       }}>
  //         <WalletConnectButton />
  //         <Text style={{ padding: 20 }}>Awaiting Data</Text>
  //         <ActivityIndicator
  //           color='#0a1142'
  //           size='large'
  //         />
  //       </View>
  //     </SafeAreaView>
  //   );

  return (
    <SafeAreaView style={tw.style("flex-1")}>
        <Text> Welcome home {connector.accounts[0]}</Text>
        {/* <FlatList
        renderScrollComponent={props => <InfiniteScrollView {...props} />}
        dataSource={data}
        renderRow={...}
        // canLoadMore={this.state.canLoadMoreContent}
        onLoadMoreAsync={_loadMoreContentAsync}
      /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});