import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./../screens/Home";
import ItemList from "./../screens/ItemList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="ItemList"
          component={ItemList}
          options={{ title: "Items" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
