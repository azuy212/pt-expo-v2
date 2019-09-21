import React from 'react';
import { Video } from 'expo-av';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface IProps {
  videoUrl: string;
  onError?: (error: string) => void;
}

const VideoPlayer = (props: IProps) => {
  return (
    <Video
      source={{ uri: props.videoUrl }}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode='contain'
      shouldPlay={true}
      style={{ width, height: 300 }}
      useNativeControls={true}
      onError={props.onError ? props.onError : console.log}
    />
  );
};

export default VideoPlayer;
