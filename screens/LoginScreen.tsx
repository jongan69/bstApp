import React from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();

  return (
    <View style={tw("flex-1")}>
      <ImageBackground
        source={{ url: "https://res.cloudinary.com/dtram9qiy/image/upload/v1643408218/my-uploads/n3br5a3xurmrnhssfixj.jpg" }}
        resizeMode="cover"
        style={tw("flex-1")}
      >
        <TouchableOpacity
          style={[
            tw("absolute bottom-40 w-80 p-4 rounded-2xl bg-gray-100"),
            { marginHorizontal: "7.5%" },
          ]}
          onPress={signInWithGoogle}
        >
          <Text style={tw("font-semibold text-lg text-center text-gray-700")}>
            Sign in & get MobileNFT's
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
