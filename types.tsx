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
  Profile: undefined;
  Gallery: undefined;
  Transfer: undefined;
};


export type HomeParamList = {
  Home: undefined;
};

export type ProfileParamList = {
  Profile: undefined;
};

export type MessagingParamList = {
  Messaging: undefined;
};

export type GalleryParamList = {
  Gallery: undefined;
};

export type TransferParamList = {
  Transfer: undefined;
};

export type ScanParamList = {
  Scan: undefined;
};

export type onPressFunc = (event: GestureResponderEvent) => void;
