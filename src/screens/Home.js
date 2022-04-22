import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Home = () => {
  const [search, setSearch] = useState();

  const handleChange = (text) => {
    setSearch(text);
  };

  const { navigate } = useNavigation();

  const handleNavigate = () => {
    navigate("Profile", { pokemon: search });
  };

  return (
    <View>
      <TextInput
        placeholder="enter text"
        onChangeText={(text) => handleChange(text)}
        style={{ borderWidth: 1, borderColor: "red" }}
      />
      <Button title={"find pokemon"} onPress={handleNavigate} />
    </View>
  );
};
