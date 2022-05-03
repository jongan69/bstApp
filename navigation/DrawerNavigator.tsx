import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator, DrawerContentOptions, DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollViewProps, ColorSchemeName } from 'react-native';
import GalleryScreen from '../screens/GalleryScreen';
import TransferScreen from '../screens/TransferScreen';
import { DrawerParamList, HomeParamList, ProfileParamList, GalleryParamList, TransferParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
import Constants from "expo-constants"
import { DrawerNavigationHelpers, DrawerDescriptorMap } from '@react-navigation/drawer/lib/typescript/src/types';
import { DrawerNavigationState, ParamListBase } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import WalletConnectButton from '../components/WalletConnect';
import ProfileScreen from '../screens/ProfileScreen';

const version = Constants?.manifest?.version
const Drawer = createDrawerNavigator<DrawerParamList>();

const CustomDrawer = (props: Key | (JSX.IntrinsicAttributes & ScrollViewProps & { children: React.ReactNode; }) | (JSX.IntrinsicAttributes & Omit<DrawerContentOptions, "style" | "contentContainerStyle"> & { state: DrawerNavigationState<ParamListBase>; navigation: DrawerNavigationHelpers; descriptors: DrawerDescriptorMap; colorScheme: { colorScheme: ColorSchemeName } })) => {
  console.log('APP VERSION NUMBER: ', version)
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            backgroundColor: '#f6f6f6',
            marginBottom: 20,
          }}
        >
          <WalletConnectButton />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={() => WebBrowser.openBrowserAsync('https://github.com/jongan69/bstApp')}
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: '#f6f6f6',
          padding: 20,
        }}
      >
        <Text>Tap for Github</Text>
        <Text style={{ color: 'red' }}>Version: {version}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{ headerShown: false }}
      />

<Drawer.Screen
        name="Gallery"
        component={GalleryNavigator}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        name="Transfer"
        component={TransferNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeParamList>();
function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShadowVisible: false }}
      />
    </HomeStack.Navigator>
  )
}

const ProfileStack = createStackNavigator<ProfileParamList>();

function ProfileNavigator() {
  return (
    < ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShadowVisible: false }}
      />
    </ ProfileStack.Navigator>
  )
}

const GalleryStack = createStackNavigator<GalleryParamList>();

function GalleryNavigator() {
  return (
    <GalleryStack.Navigator>
      <GalleryStack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{ headerShadowVisible: false }}
      />
    </GalleryStack.Navigator>
  )
}


const TransferStack = createStackNavigator<TransferParamList>();

function TransferNavigator() {
  return (
    <TransferStack.Navigator>
      <TransferStack.Screen
        name="Transfer"
        component={TransferScreen}
        options={{ headerShadowVisible: false }}
      />
    </TransferStack.Navigator>
  )
}
