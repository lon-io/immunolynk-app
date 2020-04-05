import { AsyncStorage } from 'react-native';
import { UserData } from '../store/actions/user.types';
const USER_STORE_KEY = 'USERS_STORE';

export interface UserOperationSuccess {
  code: number,
  data: UserData,
}

export interface UserOperationError {
  code: number,
  message: string,
}

/**
 * [setUserLoggedIn description]
 */
const getAllUsers = () => {
  return AsyncStorage.getItem(USER_STORE_KEY).then((value) => {
    try {
      const users: UserData[] = JSON.parse(<string>value);

      return users || [];
    } catch (error) {
      return [];
    }
  });
};

/**
 * [setUserLoggedIn description]
 */
const registerUser = async (userData: UserData): Promise<UserOperationSuccess> => {
  const users = await getAllUsers();

  const newUsers = [
    ...(users || [].filter(({ email, }) => email !== userData.email)),
    userData,
  ];

  AsyncStorage.setItem(USER_STORE_KEY, JSON.stringify(newUsers));

  return {
    code: 200,
    data: userData,
  }
};

/**
 * [setUserLoggedIn description]
 */
const loginUser = async (userData: Omit<UserData, 'username'>): Promise<UserOperationSuccess | UserOperationError> => {
  const users = await getAllUsers();

  const existingUser = users.find(({ email, password }) => email === userData.email);

  if (!existingUser) {
    return {
      code: 400,
      message: 'Sorry, we could not find this user',
    }
  }

  const passwordIsValid = existingUser?.password === userData.password;

  if (!passwordIsValid) {
    return {
      code: 400,
      message: 'Sorry, it seems the password entered is incorrect',
    }
  }

  return {
    code: 200,
    data: existingUser,
  }
};

export default {
  registerUser,
  loginUser
}
