import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import theme from "../global/theme";

import { Player } from "../screens/Player";
import { AudioList } from "../screens/AudioList";
import { PlayList } from "../screens/PlayList";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.primary_light,
        inactiveTintColor: theme.colors.secundary_light,
        showLabel: false,
        iconStyle: {
          fontSize: 30,
        },
        style: {
          height: 60,
          backgroundColor: theme.colors.secundary,
          paddingVertical: 5,
          borderTopWidth: 0,
        },
      }}
    >
      <Screen
        name="AudioList"
        component={AudioList}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons name="queue-music" size={size} color={color} />
            );
          },
        }}
      />

      <Screen
        name="Player"
        component={Player}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons name="speaker-group" size={size} color={color} />
            );
          },
        }}
      />

      <Screen
        name="PlayList"
        component={PlayList}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons name="library-music" size={size} color={color} />
            );
          },
        }}
      />
    </Navigator>
  );
}
