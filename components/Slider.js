
   
import React, {useState} from 'react';
import { Text, StyleSheet, View, TextInput, Button, Alert} from 'react-native';
import Slider from '@react-native-community/slider'

const Slider = () => {
  const [value, setValue] = useState(0);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [message, setMessage] = useState(null)

  return (
    <View style={styles.container}>
      <Text style={styles.formLabel}> Enter NFT Data </Text>
      <View>

        <TextInput 
        placeholder="Name" 
        style={styles.inputStyle}
        value={name}
        onValueChange={value => setName(value)}
        />

        <TextInput 
        placeholder="Description" 
        style={styles.inputStyle}
        value={description}
        onValueChange={value => setDescription(value)} 
        />

        <TextInput 
        placeholder="Message" 
        style={styles.inputStyle}
        value={message}
        onValueChange={value => setMessage(value)} 
        />

        <Text style={{marginTop: 16, color: '#fff', fontSize: 15}}>
          How high are you?
        </Text>

        <Slider
          style={{marginTop: 20}}
          step={1}
          minimumValue={0}
          maximumValue={1000000}
          value={value}
          onValueChange={slideValue => setValue(slideValue)}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#b9e4c9"
        />
        <Text
          style={{
            fontSize: 30,
            color: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          ${value}
        </Text>
      </View>
      <View style={{marginTop: 150}}>

      <Button title="Mint" onPress={(async () => {
  const rawResponse = await fetch('https://thirdweb-nextjs-minting-api.vercel.app/api/mint', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    "mintToAddress": "0x9441ED1089f0196BBbBf8bD096b9CA23500ca7Ba",
    "supply" : 1,
    "message": message,
    "metadata": {
        "name": name,
        "description": description,
        "image": "https://gateway.ipfscdn.io/ipfs/QmbSDPPMhEp5od6pi6syEtKotJjyjvopv9wS8rCYvNqnvp/0.png",
        "external_url": "https://gateway.ipfscdn.io/ipfs/QmbSDPPMhEp5od6pi6syEtKotJjyjvopv9wS8rCYvNqnvp/1.pdf",
        "uri": "ipfs://QmUa6bkpZRDyYWjugp4VvKLjgndkQNvcBuiqWSLdNJ7P9b/0",
        "background_color": "",
        "attributes": [
            {
                "value": "very",
                "trait_type": "swag"
            }
        ]
    }
})
  });
  const content = await rawResponse.json();

  Alert.alert('NFT MINT: ', content)
})()} />

          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#356859',
    alignItems: 'center',
    justifyContent: 'center',
  },

  formLabel: {
    fontSize: 20,
    color: '#fff',
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#b9e4c9',
  },
});

export default Slider;