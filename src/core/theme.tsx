import { DefaultTheme } from 'react-native-paper';
import Colors from '../constants/Colors';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.mint,
    secondary: Colors.darkGrey,
    error: '#f13a59',
    // primary: string;
    //     background: string;
    //     surface: string;
    //     accent: string;
        // error: string;
      text: '#fff',
        // onSurface: string;
        // onBackground: string;
        // disabled: string;
    placeholder: '#fff',
        // backdrop: string;
        // notification: string;
  },
};
