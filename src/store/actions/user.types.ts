import { AnyAction } from "redux";

export enum UserActionTypes {
  SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER',
}

export interface UserData {
  email: string;
  password: string;
  username: string;
}

export interface AddUserAction extends AnyAction {
  type: UserActionTypes.SET_LOGGED_IN_USER,
  payload: UserData,
}

export type UserAction = AddUserAction
