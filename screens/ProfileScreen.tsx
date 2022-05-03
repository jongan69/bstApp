import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import MenuIcon from '../components/MenuIcon';
import tw from 'twrnc';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import WalletConnectButton from "../components/WalletConnect";
import { useDispatch, useSelector } from "react-redux";
import { userSelector, logOut, logIn } from "../reduxToolkit/userSlice";


export default function ProfileScreen() {

  const dispatch = useDispatch()
  const user = useSelector(userSelector);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const navigation = useNavigation();
  const incomplete = !name || !email || !phone;
  const connector = useWalletConnect();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (_props: StackHeaderLeftButtonProps) => (<MenuIcon />)
    });
  });


  function Button({ onPress, label }) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    );
  }

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

  const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
      {children}
    </TouchableWithoutFeedback>
  );

  return (
    <HideKeyboard>
    <SafeAreaView style={tw.style('flex-1')}>
        <View style={tw.style("flex-1 items-center pt-0")}>
          <Text style={tw.style("text-center p-4 font-black text-3xl text-black-400")}>
            BST
          </Text>
          
          {!incomplete || !connector.accounts[0]
            ?
            <View style={{ margin: 10}} >
              <Text style={tw.style("text-xl text-gray-500 p-4 font-bold")}>
                Current Wallet {shortenAddress(connector?.accounts[0])}
              </Text>
              <Text style={tw.style("text-xl text-gray-500 p-4 font-bold")}>
                Name: {name}
              </Text>
              <Text style={tw.style("text-xl text-gray-500 p-4 font-bold")}>
                Email: {email}
              </Text>
              <Text style={tw.style("text-xl text-gray-500 p-4 font-bold")}>
                Phone: {phone}
              </Text>
              <Button onPress={killSession} label="Log out" />
              <Button onPress={() => {
                setPhone(null),
                setEmail(null),
                setName(null)
              }} label="Clear Messaging Data" />
            </View>
            :
            <>
              <Text style={tw.style("text-xl text-gray-500 p-0 font-bold")}>
                Buy Sell Trade
              </Text>

              <Text style={tw.style("text-m text-gray-500 p-5 font-bold")}> In order to use messaging services you must add some user data</Text>
              <Text style={tw.style("text-center p-2 font-bold text-blue-500")}>
                Step 1: User name
              </Text>

              {/* USER DATA WE CAN STORE IN REDUX TOOLKIT SLICE */}
              <TextInput
                value={name}
                onChangeText={setName}
                style={tw.style("text-center text-xl pb-2")}
                placeholder="Enter your User Name"
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
                Linked Wallet
              </Text>
              <WalletConnectButton />
            </>
          }
        </View>
      {/* </View> */}
    </SafeAreaView>
    </HideKeyboard>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5A45FF",
    color: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 20
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

