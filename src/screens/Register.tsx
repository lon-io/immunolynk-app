import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { connect } from 'react-redux'
import { Dispatch } from 'redux';
import Logo from '../components/Logo';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../lib/utils';
import { ScreenNames } from '../constants/Layout';
import BgScreenContainer from '../components/BgScreenContainer';
import { setUserData } from '../store/actions';
import { UserData } from '../store/actions/user.types';
import { registerUser } from '../lib/apiService';
import { UserOperationSuccess, UserOperationError } from '../lib/userRepo';
import Loader from '../components/Loader';
import { NavigationProp } from '@react-navigation/native';
import { resetToHome } from '../lib/navigation';


type Props = {
  navigation: NavigationProp<any>;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onSignUpPressed = async () => {
    Keyboard.dismiss();
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);
    const response = await registerUser({
      email: email.value,
      password: password.value,
      username: name.value,
    });
    setLoading(false);

    setUserData((response as UserOperationSuccess).data);

    resetToHome(navigation);
  };

  return (
    <BgScreenContainer>
      <Logo />

      <TextInput
        label="UserName"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

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

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        {
          loading
            ? <Loader />
            : "SIGN-UP"
        }
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.LOGIN)}>
          <Text style={styles.link}>LOG-IN</Text>
      </TouchableOpacity>

      {/* <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.LOGIN)}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View> */}
    </BgScreenContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
    fontFamily: 'Avenir Next',
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Avenir Next',
  },
});

const mapDispatchToProps = (dispatch: Dispatch): {} => ({
  setUserData: (data: UserData) => dispatch(setUserData(data)),
});


export default memo(connect(null, mapDispatchToProps)(RegisterScreen));
