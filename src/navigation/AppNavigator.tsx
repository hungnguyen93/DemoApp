import { observer } from "mobx-react-lite";
import React from "react";
import { RootStack } from "./types";
import Private from "./private-routes";
import Public from "./public-routes";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import ModalStack from "./modal-routes";
import { appModel } from "../view-models/app-view-model";
import { navigationRef } from "../services/navigation-services";
import CalendarScreen from "../modules/calendar/Calendar";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};
const AppNavigator = () => {
  const isAuthenticated = appModel.authenticate.isAuthenticated;

  return (
    <NavigationContainer theme={navTheme} ref={navigationRef}>
      <RootStack.Navigator
        initialRouteName="calendar"
        screenOptions={{
          headerShown: false,
        }}
      >
        {isAuthenticated ? (
          <RootStack.Screen name={"private"} component={Private} />
        ) : (
          <RootStack.Screen name={"public"} component={Public} />
        )}
        <RootStack.Group
          screenOptions={{
            headerShown: false,
            presentation: "transparentModal",
            gestureDirection: "vertical",
          }}
        >
          <RootStack.Screen component={ModalStack} name="modalLoading" />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default observer(AppNavigator);
