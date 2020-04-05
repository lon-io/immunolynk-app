import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  CameraScreen,
} from './screens';
import { ScreenNames } from './constants/Layout';
import configureStore from './store';

const Stack = createStackNavigator();
const { store } = configureStore()

function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ScreenNames.REGISTER}>
          <Stack.Screen name={ScreenNames.HOME} component={HomeScreen} options={() => ({ header: () => null })} />
          <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} options={() => ({ header: () => null })} />
          <Stack.Screen name={ScreenNames.REGISTER} component={RegisterScreen} options={() => ({ header: () => null })} />
          <Stack.Screen name={ScreenNames.FORGOT_PASSWORD} component={ForgotPasswordScreen} options={() => ({ header: () => null })} />
          <Stack.Screen name={ScreenNames.CAMERA} component={CameraScreen} options={() => ({ header: () => null })} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
