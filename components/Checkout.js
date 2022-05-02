// import { useStripe } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { CHECKOUT_URL } from "@env";
import tw from 'twrnc';
import { useDispatch } from "react-redux"; 
import { emptyCart } from "../reduxToolkit/cartSlice";
// import useAuth from "../hooks/useAuth";
import { StackActions } from '@react-navigation/native';

const Checkout = ({ orderDetails }) => {
  // const { user } = useAuth();
  const { total, name } = orderDetails
  // const stripe = useStripe();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [checkedout, setCheckedOut] = useState(false)
  const clearCart = () => {
    dispatch(emptyCart())
  }

  const stripePurchase = async () => {

    try {
      if (total < 1) return Alert.alert("Something went wrong...");
      console.log('API URL set in .envs is: ', CHECKOUT_URL)


      const response = await fetch(CHECKOUT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total, name }),
      },
      );
      const data = await response.json();
      console.log('Response from API: ', JSON.stringify(data))

      if (!response.ok) {
        return Alert.alert(data.message);
      }

      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
      });

      if (initSheet.error) {
        console.error(initSheet.error);
        return Alert.alert(initSheet.error.message);
      }

      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: data.clientSecret,
      });

      if (presentSheet.error) {
        console.error(presentSheet.error);
        return Alert.alert(presentSheet.error.message);
      }

      navigation.navigate('Home')
      dispatch(emptyCart())
      Alert.alert("purchased successfully! Welcome to the future.");
    } catch (err) {

      console.error(err);
      Alert.alert(`Payment failed with error: ${err}`);

    }

  };



  const cardPurchase = () => {
    // Check if authenticated
    if(name){
      navigation.navigate('Payment')
    } else {
      Alert('You must be logged in to purchase an NFT')
      navigation.navigate('Modal Screen')
    }
  }

  
  return (
    <View >
      <TouchableOpacity
        onPress={clearCart}
        style={[tw.style("flex-row items-center justify-center bg-gray-400 px-5 mx-3 my-1 rounded-lg"), styles.cardShadow]}>
        <Text style={tw.style("text-lg text-white py-8 font-semibold")}> Clear Cart </Text>

      </TouchableOpacity>

      <TouchableOpacity
        onPress={cardPurchase}
        style={[tw.style("flex-row items-center justify-center bg-red-400 px-5 mx-3 my-1 rounded-lg"), styles.cardShadow,]}>
        <Text style={tw.style("text-lg text-white py-8 font-semibold")}> Checkout ${total} </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Checkout

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
