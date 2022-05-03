import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet
} from "react-native";
import tw from 'twrnc';
import Header from "../components/Header";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import WalletConnectButton from "../components/WalletConnect";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, logOut, logIn } from "../reduxToolkit/userSlice";

import { FontAwesome, Ionicons, SimpleLineIcons, Fontisto } from "@expo/vector-icons";
import Constants from 'expo-constants';

export default function ProfileScreen() {

  const dispatch = useDispatch()
  const user = useSelector(userSelector);
  const [name, setName] = useState(user.name || "N/A");
  const [email, setEmail] = useState(user.email || "N/A");
  const [phone, setPhone] = useState(user.phone || "N/A");
  // const navigation = useNavigation();

  // _handleOpenWithWebBrowser = () => {
  //   const url = 'https://marketplace-xi.vercel.app/'
  //   console.log('EXPORT CONSTANTS: ', Constants.linkingUri)
  //   WebBrowser.openAuthSessionAsync(url);
  // };

  function Button({ onPress, label }) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    );
  }

  const incomplete = !name || !email || !phone;
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(async () => {
    return connector.connect()
  }, [connector]);


  const killSession = React.useCallback(() => {
    dispatch(logOut())
    return connector.killSession();
  }, [connector]);


  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(
      address.length - 4,
      address.length
    )}`;
  };

  const updateUserProfile = (user, address) => {
    const userData = { 'name': name, 'email': email, 'phone': phone, 'address': [address || null] };
    console.log('ALL THE USER DATAS: ', userData)
    dispatch(logIn(userData))
    console.log('Data in store: ', user)
    return
  }

  return (
    <SafeAreaView style={tw.style('flex-1')} onPress={Keyboard.dismiss}>
      <View style={tw.style("flex-1 pt-1")}>
        <Header title="Profile" />
        <View style={tw.style("flex-1 items-center pt-0")}>
          <Text style={tw.style("text-center p-4 font-black text-3xl text-red-400")}>
            Collectifi
          </Text>

          {!incomplete && connector?.accounts[0]
            ?
            <View>
              <Text style={tw.style("text-xl text-gray-500 p-4 font-bold")}>
                Current Wallet {shortenAddress(connector?.accounts[0])}
              </Text>
              <Text style={tw.style("text-xl text-gray-500 p-4 font-bold")}>
                Name: {user.name}
              </Text>
              <Text style={tw.style("text-xl text-gray-500 p-4 font-bold")}>
                Email: {user.email}
              </Text>
              <Text style={tw.style("text-xl text-gray-500 p-4 font-bold")}>
                Phone: {user.phone}
              </Text>
              <Button onPress={killSession} label="Log out" />
            </View>
            :
            <>
              <Text style={tw.style("text-xl text-gray-500 p-0 font-bold")}>
                Welcome to Collectifi!
              </Text>
              <Text style={tw.style("text-center p-2 font-bold text-blue-500")}>
                Step 1: The Name
              </Text>

              {/* USER DATA WE CAN STORE IN REDUX TOOLKIT SLICE */}
              <TextInput
                value={name}
                onChangeText={setName}
                style={tw.style("text-center text-xl pb-2")}
                placeholder="Enter your Full Name"
              />

              <Text style={tw.style("text-center p-4 font-bold text-blue-500")}>
                Step 2: The Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={tw.style("text-center text-xl pb-2")}
                placeholder="Enter your Email"
              />

              <Text style={tw.style("text-center p-4 font-bold text-blue-500")}>
                Step 3: The Phone
              </Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                style={tw.style("text-center text-xl pb-2")}
                placeholder="Enter your Phone"
                keyboardType="numeric"
                maxLength={12}
                onEndEditing={Keyboard.dismiss}
              />
                            <Text style={tw.style("text-center p-2 font-bold text-blue-500")}>
                Step 4: The Wallet
              </Text>
              <WalletConnectButton />
              
              {/* {incomplete ? null 
              :
              <TouchableOpacity
              // onPress={updateUserProfile}
              // onPress={this._handleOpenWithWebBrowser}
              onPress={updateUserProfile(user, connector.accounts[0])}
              disabled={incomplete}
              style={[
                tw.style("w-64 p-3 rounded-xl absolute bottom-10"),
                incomplete ? tw.style("bg-gray-400") : tw.style("bg-red-400"),
              ]}
            >
              <Text style={tw.style("text-center text-white text-xl")}  >
                Update Profile
              </Text>
            </TouchableOpacity>
              } */}
            </>
          }
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5A45FF",
    color: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

