import * as React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

const Loader = () => (
  <ActivityIndicator animating={true} color={Colors.white} />
);

export default Loader;
