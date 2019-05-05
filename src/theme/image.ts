import { Dimensions, StyleProp, ImageStyle } from 'react-native';

const { height, width } = Dimensions.get('screen');

export const SCREEN_IMAGE_LOGO: StyleProp<ImageStyle> = {
  opacity: 0.5,
  alignSelf: 'center',
  height: height / 3.65,
  width: width / 1.37,
  resizeMode: 'center',
};
