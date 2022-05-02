import { Foundation, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';


const Header = ({ title, callEnabled, logout }) => {
  const navigation = useNavigation();
  return (
    <View style={tw.style("p-2 flex-row items-center justify-between")}>
      <View style={tw.style("flex flex-row items-center")}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw.style("p-2")}>
          <Ionicons name="chevron-back-outline" size={34} color="#ff5864" />
        </TouchableOpacity>
        <Text style={tw.style("text-2xl font-bold pl-2")}>{title}</Text>
      </View>
      {callEnabled && (
        <TouchableOpacity style={tw.style("rounded-full mr-4 p-3 bg-red-200")}>
          <Foundation
            style={tw.style("px-1")}
            name="telephone"
            size={20}
            color="red"
          />
        </TouchableOpacity>
      )}
      {logout && (
        <TouchableOpacity
          onPress={logout}
          style={tw.style("rounded-full mr-4 p-3 bg-black")}
        >
          <MaterialIcons name="logout" size={20} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
