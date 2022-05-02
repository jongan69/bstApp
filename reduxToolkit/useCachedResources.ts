import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
// import { FontAwesome } from '@expo/vector-icons';
// import * as Font from 'expo-font';
// import { useQuery } from "react-query";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // let data;
        // while(data === undefined || null ){
        //   const NFT_URL = "https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20";
        //   const options = { method: "GET", headers: { Accept: "application/json", "X-API-KEY": "5bec8ae0372044cab1bef0d866c98618", },};
        //   const fetchNFTS = () => fetch(NFT_URL, options).then((res) => res.json())
        
        //   return { data: nftCard, isLoading } = useQuery("cards", async () => await fetchNFTS(), { keepPreviousData : true })
        // }
        
        // Load fonts
        // await Font.loadAsync({
        //   ...FontAwesome.font,
        //   'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        // });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;

}