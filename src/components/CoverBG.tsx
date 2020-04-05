import React, { memo } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

type Props = {
    children: React.ReactNode;
  };

const CoverBG = ({ children }: Props) => (
    <ImageBackground
    source={require('../assets/bg.png')}
    resizeMode="cover"
    style={styles.background}
  >
      { children }
    </ImageBackground>
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
  background: {
    flex: 1,
    width: '100%',
    zIndex: 1,
  },
});

export default memo(CoverBG);
