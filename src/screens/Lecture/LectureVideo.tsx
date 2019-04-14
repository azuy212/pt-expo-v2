import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Container, Content, Text } from 'native-base';
import HeaderComponent from '../../components/HeaderComponent';
import { Video } from 'expo';
import VideoPlayer from '../../components/VideoPlayer';
import { showErrorAlert } from '../../services/error';

const { width } = Dimensions.get('window');

interface IProps {
  videoUrl: string;
  sTitle: string;
}

type AllProps = IProps & NavigationScreenProps;

const LectureVideo = (props: AllProps) => {

  const navigationParams = props.navigation.state.params;
  const videoUrl = props.videoUrl || (navigationParams && navigationParams.videoUrl);
  const title = props.sTitle || (navigationParams && navigationParams.sTitle) || 'Lecture Video';

  const errorHandler = () => {
    showErrorAlert('Error Playing Video', 'Video is unavailable or not supported');
    props.navigation.goBack();
  };

  return (
    <Container style={{ backgroundColor: 'black' }}>
      <HeaderComponent
        {...props}
        title={title}
      />
      <Content contentContainerStyle={styles.container}>
        {videoUrl ? (
          <VideoPlayer
            videoUrl={videoUrl}
            onError={errorHandler}
          />
        ) : (
          <Text style={{ color: 'white' }}>
            No Video Available
          </Text>
        )}
      </Content>
    </Container>
  );
};

export default LectureVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 50,
  },
  webView: {
    flex: 1,
  },
});
