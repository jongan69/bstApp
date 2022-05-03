import { GestureResponderEvent } from "react-native";

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Profile: undefined;
  Scan: undefined;
  Cart: undefined;
  Payment: undefined;
  NotFound: undefined;
};


export type DrawerParamList = {
  Home: undefined;
  Gallery: undefined;
  Wallet: undefined;
  Transfer: undefined;
};



export type HomeParamList = {
  Home: undefined;
};

export type GalleryParamList = {
  Gallery: undefined;
};

export type WalletParamList = {
  Wallet: undefined;
};

export type TransferParamList = {
  Transfer: undefined;
};

export type ScanParamList = {
  ScanScreen: undefined;
};

export type onPressFunc = (event: GestureResponderEvent) => void;
