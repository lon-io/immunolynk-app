import React, { useState, memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../core/theme';
import Colors from '../constants/Colors';

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const TextInput = ({ errorText, ...props }: Props) => {
  let inputRef: typeof Input | null;
  const [showLabel, setShowLabel] = useState(true);
  return (
    <View style={styles.container}>
      <Input
        ref={ref => {
          // @ts-ignore
          inputRef = ref;
        }}
        style={styles.input}
        selectionColor="transparent"
        // underlineColor="transparent"
        mode="outlined"
        theme={theme}
        {...props}
        onFocus={() => setShowLabel(false)}
        // @ts-ignore
        // onBlur={() => !inputRef?.target?.value ? setShowLabel(true) : null}
        // @ts-ignore
        label={showLabel && !inputRef?.target?.value ? props?.label || '' : ''}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    fontFamily: 'Avenir Next',
    backgroundColor: "transparent",
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default TextInput;
