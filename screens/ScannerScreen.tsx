

import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { addToCart } from "../reduxToolkit/cartSlice";
import { useDispatch } from "react-redux";
import Clarifai from 'clarifai'
import tw from 'twrnc';
import { useWalletConnect } from "@walletconnect/react-native-dapp";

const apiUrl = 'https://api.cloudinary.com/v1_1/dp8lp5b68/image/upload';
const CLARIFAY_KEY = "83e67f71dd034c60b784e4a050228303"
const WINDOW_HEIGHT = Dimensions.get('window').height;
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08);

export default function ScannerScreen() {
  const connector = useWalletConnect();
  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [items, setItems] = useState(null);
  const dispatch = useDispatch();
  const [scanned, setScanned] = useState(false)
  const navigation = useNavigation();

  const [bluntVerified, setBluntVerified] = useState(false)
  const [aiData, setAiData] = useState(null)

  const clarifai = new Clarifai.App({
    apiKey: CLARIFAY_KEY
  })

  useEffect(() => {
    onHandlePermission();
  }, []);

  const onHandlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType(prevCameraType =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };




  const onSnap = async () => {
    if (cameraRef.current) {
      console.log('MAGIC CAMERA SEES A: ', cameraRef.current)
      const options = { quality: 0.9, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.base64;


      if (source) {
        let base64Img = `data:image/jpg;base64,${source}`;
        let data = {
          file: base64Img,
          upload_preset: 'edscgabu'
        };
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        fetch(apiUrl, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST'
        })
          .then(async response => {
            let data = await response.json();
            if (data.secure_url) {
              process.nextTick = setImmediate // RN polyfill
              clarifai.models.predict(Clarifai.GENERAL_MODEL, data.secure_url)
                .then(response => {
                  const { concepts } = response.outputs[0].data
                  if (concepts && concepts.length > 0) {
                    for (const prediction of concepts) {
                      if (prediction.name) {
                        fetch('https://thirdweb-nextjs-minting-api.vercel.app/api/mint', {
                          body: JSON.stringify({
                            "mintToAddress": connector.accounts[0],
                            "supply": 1,
                            "message": prediction.name,
                            "metadata": {
                              "name": prediction.name,
                              "description": prediction.name,
                              "image": data.secure_url,
                              "external_url": data.secure_url,
                              "uri": data.secure_url,
                              "background_color": "",
                              "attributes": [
                                {
                                  "value": "AI reading",
                                  "trait_type": prediction.name
                                }
                              ]
                            }
                          }),
                          headers: {
                            'content-type': 'application/json'
                          },
                          method: 'POST'
                        })
                        setBluntVerified(true)
                        Alert.alert(`Minted NFT for ${connector.accounts[0]}!`);
                        navigation.navigate('Home')
                      } else {
                        // Anything else gets output as alert
                        Alert.alert('Couldnt mint nft of: ', prediction.name);
                      }

                      // All Predictions should be logged
                      console.log('PREDEICTION FROM CLARIFAI: ', prediction)
                      setAiData(prediction)
                      return
                    }
                  }
                })
            }
          })
          .catch(err => {
            Alert.alert('Error Verifiying Blunt');
            console.log(err);
          });

      }
    }
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback
      delayLongPress={630}
      onLongPress={() => navigation.goBack()}
    >
      <View style={styles.container}>
        <Camera
          ref={cameraRef}
          style={styles.container}
          type={cameraType}
          onCameraReady={onCameraReady}
          useCamera2Api={true}
        />
        <View style={styles.container}>
          {isPreview && (
            <> 
            <View style={{ alignSelf: 'center', padding: '80%' }}>
            {!bluntVerified  && <ActivityIndicator size="large" color="#00ff00"/>}
            </View>
            <TouchableOpacity
              onPress={cancelPreview}
              style={styles.closeButton}
              activeOpacity={0.7}
            >
              <AntDesign name='close' size={32} color='#fff' />
            </TouchableOpacity>
            </>
          )}
          {!isPreview && (
            <View style={styles.bottomButtonsContainer}>
              <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
                <MaterialIcons name='flip-camera-ios' size={28} color='white' />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={!isCameraReady}
                onPress={onSnap}
                style={styles.capture}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  text: {
    color: '#fff'
  },
  bottomButtonsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    right: 20,
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A45FF',
    opacity: 0.7
  },
  capture: {
    backgroundColor: '#5A45FF',
    // borderRadius: 5,
    height: CAPTURE_SIZE,
    width: CAPTURE_SIZE,
    borderRadius: Math.floor(CAPTURE_SIZE / 2),
    marginBottom: 28,
    marginHorizontal: 30
  }
});