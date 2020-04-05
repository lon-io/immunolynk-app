import { UserAction, UserActionTypes } from "../actions/user.types";

const INITIAL_STATE = {
  user: {
    email: '',
    password: '',
    username: '',
  },
};

const authReducer = (state = INITIAL_STATE, action: UserAction) => {
  const { type, payload } = action;

  switch (type) {
    case UserActionTypes.SET_LOGGED_IN_USER:
      return {
        ...state,
        user: {
          payload,
        }
      };
    default:
      return state;
  }
};

export default authReducer;
