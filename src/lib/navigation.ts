import { ScreenNames } from "./../constants/Layout";
import { CommonActions, NavigationProp } from "@react-navigation/native";

export const resetToHome = (navigation: NavigationProp<any>, params?: {}) => {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: ScreenNames.HOME, params: params || {} }],
  });

  navigation.dispatch(resetAction);
};

export const goBackHome = (navigation: NavigationProp<any>) => {
  navigation.dispatch(CommonActions.goBack());
};

export const updateHomeParams = (
  navigation: NavigationProp<any>,
  params: any
) => {
  navigation.dispatch({
    ...CommonActions.setParams(params),
    source: ScreenNames.HOME,
  });
};
