import { NavigationContainer } from "@react-navigation/native";
import { Home } from "../screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Profile } from "./../screens/Profile";
import React from "react";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
