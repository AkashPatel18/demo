import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

export const Profile = ({ route }) => {
  const { pokemon } = route.params;

  const [data, setData] = useState({});

  const getPokemon = async () => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon`);

    console.warn(data);
    setData(data);
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <View>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};
