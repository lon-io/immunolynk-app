import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const LogoAlt = () => (
  <Image source={require('../assets/logo-y.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 257,
    height: 291,
  },
});

export default memo(LogoAlt);
