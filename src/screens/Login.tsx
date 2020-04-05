import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert, Keyboard } from 'react-native';
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../lib/utils';
import { Navigation } from '../types';
import { ScreenNames } from '../constants/Layout';
import BgScreenContainer from '../components/BgScreenContainer';
import { setUserData } from '../store/actions';
import { UserData } from '../store/actions/user.types';
import { loginUser } from '../lib/apiService';
import { UserOperationSuccess, UserOperationError } from '../lib/userRepo';
import Loader from '../components/Loader';
import { resetToHome } from '../lib/navigation';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
  setUserData: typeof setUserData;
};

const LoginScreen = ({ navigation, setUserData }: Props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onLoginPressed = async () => {
    Keyboard.dismiss();
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);
    const response = await loginUser({
      email: email.value,
      password: password.value,
      username: '',
    })
    setLoading(false);

    if ((response as UserOperationError).message) {
      Alert.alert((response as UserOperationError).message)
      return;
    }

    setUserData((response as UserOperationSuccess).data);

    resetToHome(navigation);
  };

  return (
    <BgScreenContainer>
      <Logo />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNames.FORGOT_PASSWORD)}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}

      <Button mode="contained" onPress={_onLoginPressed}>
        {
          loading
            ? <Loader />
            : "LOG-IN"
        }
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.REGISTER)}>
          <Text style={styles.link}>SIGN-UP</Text>
      </TouchableOpacity>
    </BgScreenContainer>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontFamily: 'Avenir Next',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

const mapDispatchToProps = (dispatch: Dispatch): {} => ({
  setUserData: (data: UserData) => dispatch(setUserData(data)),
});

export default memo(connect(null, mapDispatchToProps)(LoginScreen));
