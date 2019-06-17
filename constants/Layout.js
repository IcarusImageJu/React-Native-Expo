import { Dimensions } from 'react-native';
import Constants from 'expo-constants'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  statusBarHeight: Constants.statusBarHeight,
  isSmallDevice: width < 375,
};
