import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export enum ScreenNames {
  HOME = 'Home',
  LOGIN = 'Login',
  REGISTER = 'Register',
  FORGOT_PASSWORD = 'Forgot Password',
  CAMERA = 'Camera',
  BARCODE = 'Barcode Scan',
}

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};
