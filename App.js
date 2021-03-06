import "react-native-gesture-handler";

import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import theme from "./src/global/theme";

//const MyTheme = {
//  ...DefaultTheme,
//  colors: {
//    ...DefaultTheme.colors,
//    background: theme.colors.secundary,
//  },
//};

import AudioProvider from "./src/context/AudioProvider";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import AppNavigator from "./src/routes/app.routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AudioProvider>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.secundary}
        />
        <AppNavigator />
      </NavigationContainer>
    </AudioProvider>
  );
}
