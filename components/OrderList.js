import React from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import tw from 'twrnc';
// import useAuth from "../hooks/useAuth";
// import { fetchBasket } from "../lib/firebase";
import { selectItem } from "../reduxToolkit/cartSlice";
import OrderItem from "./OrderItem";
import Checkout from "../components/Checkout";

function renderFooter(nfts, total) {
  if (!nfts) return null;
  
  // console.log('user is ', user);
  let name = "Guest";

  function iterate(item) {
    console.log('Nft id is ', item._id)
    console.log('Nft price is ', item.price)
    let int = parseFloat(item.price)
    total = total + int
    console.log('New Total is ', total.toFixed(2))

  }

  nfts.forEach(iterate);
  const orderDetails = { total, name }

  return (
    <Checkout orderDetails={orderDetails} />
  );
}

const OrderList = () => {
  // const { user } = useAuth();
  let total = 0;
  // Redux Can store the state of the cart or
  const nfts = useSelector(selectItem);

  // React-Query Can store the state of the cart as well
  // const { data } = useQuery("addToCart", () => fetchBasket(user));

  console.log('NFTs are: ', nfts)

  return nfts?.length > 0 ? (

    <>
      <FlatList
        style={tw.style("h-3\/4")}
        data={nfts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) =>
          <>
            <OrderItem orderDetails={item} />
          </>
        }
        ListFooterComponent={renderFooter(nfts, total)}
      />
    </>
  ) : (

    <View style={tw.style("p-5")}>
      <Text style={tw.style("text-center text-lg")}>No NFTs in Cart </Text>
    </View>

  );
};

export default OrderList;
