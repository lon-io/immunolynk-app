import { UserData, UserActionTypes, AddUserAction } from "./user.types";

export const setUserData = (userData: UserData): AddUserAction => {
    return {
        payload: userData,
        type: UserActionTypes.SET_LOGGED_IN_USER,
    }
}
