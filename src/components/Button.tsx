import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../core/theme';
import Colors from '../constants/Colors';
type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({ mode, style, children, ...props }: Props) => (
  <PaperButton
    style={[
      styles.button,
      mode === 'outlined' && { backgroundColor: theme.colors.accent },
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.mint,
    width: '100%',
    marginVertical: 10,
    fontFamily: 'Avenir Next'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    fontFamily: 'Avenir Next',
  },
});

export default memo(Button);
