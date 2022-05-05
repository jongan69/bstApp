import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  View
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StackHeaderLeftButtonProps, StackHeaderRightButtonProps } from '@react-navigation/stack';
import MenuIcon from '../components/MenuIcon';
import tw from 'twrnc';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { FontAwesome } from '@expo/vector-icons'
import Feed from '../components/Feed';
import ViewPager from '@react-native-community/viewpager';

import server from '../fakeServer.json';
import { Container, Header, Text, Tab, Separator } from '../styles/home';

import InfiniteScrollView from 'react-native-infinite-scroll-view';
import InfiniteScroll from 'react-infinite-scroll-component';
import WalletConnectButton from "../components/WalletConnect";
import { useQuery, } from "react-query";

// import Swiper from "react-native-deck-swiper";

const HomeScreen = () => {
  const navigation = useNavigation();
  const connector = useWalletConnect();
  const [tab, setTab] = useState(1);
  const [active, setActive] = useState(0);
  const dispatch = useDispatch()
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [data, setData] = useState([])

  useEffect(() => {
    setTab(1)
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
            style={{ borderWidth: 5, borderColor: 'white', borderRadius: 20, margin: 10, marginRight: 20 }}
            name="camera-retro" size={12} color="orange" />
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

  return (
    <SafeAreaView style={tw.style("flex-1")}>
      <Container>
        <Header>
          <Tab onPress={() => setTab(1)}>
            <Text active={tab === 1}>Browse</Text>
          </Tab>
          <Separator>|</Separator>
          <Tab onPress={() => {setTab(2), navigation.navigate("Scan")}}>
            <Text active={tab === 2}>Mint</Text>
          </Tab>
        </Header>
        <ViewPager
          onPageSelected={e => {
            setActive(e.nativeEvent.position);
          }}
          orientation="vertical"
          style={{ flex: 1 }}
          initialPage={0}
        >
          {server.feed.map(item => (
            <View key={item.id}>
              <Feed item={item} play={Number(item.id) === active} />
            </View>
          ))}

        </ViewPager>
      </Container>
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