import React from 'react';
import { Image, Animated, Easing, Text } from 'react-native';

import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Lottie from 'lottie-react-native';

import musicFly from '../../assets/lottie/music-fly.json';

import {
  Container,
  Details,
  Actions,
  User,
  Tags,
  Music,
  MusicBox,
  BoxAction,
  TextAction,
} from './styles';

interface Item {
  id: number;
  ownerAddress: string;
  username: string;
  tags: string;
  music: string;
  likes: number;
  comments: number;
  uri: string;
}

interface Props {
  play: boolean;
  item: Item;
}

const Feed: React.FC<Props> = ({ play, item }) => {
  const spinValue = new Animated.Value(0);
  const [status, setStatus] = React.useState({});
  const video = React.useRef(null);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 10000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const rotateProp = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <>

      <LinearGradient
        colors={['rgba(0,0,0,.3)', 'transparent']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '70%',
        }}
      />
      
      <Container>
          <Video
            source={{ uri: item.uri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={play}
            onPlaybackStatusUpdate={() => setStatus(() => status)}
            isLooping
            ref={video}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
      </Container>

      <Details>
        <User>{item.username}</User>
        {/* <Tags>{item.tags}</Tags> */}
        <MusicBox>
          <FontAwesome name="home" size={15} color="#f5f5f5" />
          <Text> of Owner</Text>
          <Music>{item.ownerAddress}</Music>
        </MusicBox>
      </Details>

      <Actions>
        <BoxAction>
          <AntDesign
            style={{ alignSelf: 'center' }}
            name={status.isPlaying ? 'pause' : 'play'}
            size={35}
            color="#fff"
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          />

        </BoxAction>

        <BoxAction>
          <AntDesign
            style={{ alignSelf: 'center' }}
            name="heart"
            size={35}
            color="#fff"
          />
          <TextAction>{item.likes}</TextAction>
        </BoxAction>

        <BoxAction>
          <FontAwesome
            style={{ alignSelf: 'center' }}
            name="commenting"
            size={35}
            color="#fff"
          />
          <TextAction>{item.comments}</TextAction>
        </BoxAction>

        <BoxAction>
          <FontAwesome
            style={{ alignSelf: 'center' }}
            name="whatsapp"
            size={35}
            color="#06d755"
          />
          <TextAction>Share</TextAction>
        </BoxAction>

        <BoxAction>
          <Animated.View
            style={{
              borderRadius: 50,
              borderWidth: 12,
              borderColor: '#292929',
              transform: [
                {
                  rotate: true ? rotateProp : 0,
                },
              ],
            }}
          >
            <Image
              style={{
                width: 35,
                height: 35,
                borderRadius: 25,
              }}
              source={{
                uri: 'https://media-exp1.licdn.com/dms/image/D4E35AQEhkAHUyuef3A/profile-framedphoto-shrink_100_100/0/1650131500876?e=1651752000&v=beta&t=1O0nYJvtEUITd44C94CAVZmU2sBazNspypuHZjzNc08',
              }}
            />
          </Animated.View>

          <Lottie
            source={musicFly}
            progress={play ? spinValue : 0}
            style={{ width: 150, position: 'absolute', bottom: 0, right: 0 }}
          />
        </BoxAction>
      </Actions>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,.4)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '50%',
        }}
      />
    </>
  );
};

export default Feed;
