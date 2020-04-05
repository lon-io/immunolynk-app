import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const CameraIcon = () => (
  <Image source={require('../assets/camera.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 55,
    height: 53,
  },
});

export default memo(CameraIcon);
