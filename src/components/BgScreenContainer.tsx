import React, { memo } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../constants/Colors';
import CoverBG from './CoverBG';

type Props = {
  children: React.ReactNode;
};

const Background = ({ children }: Props) => (
  <View style={styles.wrapper}>
    <CoverBG>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.containerChildWrapper}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </CoverBG>
  </View>
)

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    zIndex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.darkGreyRgba,
  },
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkGreyRgba,
  },
  containerChildWrapper: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default memo(Background);
