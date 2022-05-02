import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import tw from 'twrnc';
import { truncate } from "../lib/truncate";
import { removeFromCart } from "../reduxToolkit/cartSlice";

const OrderItem = ({ orderDetails }) => {
  const navigate = useNavigation();
  const dispatch = useDispatch()
  const { _id, image_url, name, price } = orderDetails

  return (
    <TouchableOpacity
      delayLongPress={630}
      onLongPress={() => dispatch(removeFromCart({_id}))}
      style={[
        tw.style(
          "flex-row items-center justify-between py-3 px-5 bg-white mx-3 my-1 rounded-lg"
        ),
        styles.cardShadow,
      ]}
    >
      <Image
        style={tw.style("rounded-full h-16 w-16")}
        source={{ uri: image_url }}
      />

      <Text style={tw.style("text-lg font-semibold")}>
        {truncate(name, 16)}
      </Text>
      <Text>${truncate(price, 6)}</Text>
    </TouchableOpacity>
  );
};

export default OrderItem;

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
