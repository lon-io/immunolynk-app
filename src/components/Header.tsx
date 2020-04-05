import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';

type Props = {
  children: React.ReactNode;
};

const Header = ({ children }: Props) => (
  <Text style={styles.header}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontFamily: 'Avenir Next',
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
    lineHeight: 40,
  },
});

export default memo(Header);
