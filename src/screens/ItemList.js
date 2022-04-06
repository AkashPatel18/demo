import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Pressable,
  TextInput,
  Image,
  Alert,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ItemList() {
  const [items, setItems] = useState([]);

  const [search, setSearch] = useState("");

  const getItems = async () => {
    try {
      let items = await AsyncStorage.getItem("items");
      items = JSON.parse(items);
      if (items !== null) {
        setItems(items);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getItems();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ display: "flex", flexDirection: "row", padding: 10 }}>
        <Pressable
          onPress={() => handleAddImagePress(index)}
          style={{
            width: "40%",
            height: 200,
            borderWidth: 1,
            borderColor: "red",
            borderRadius: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ height: 180, width: "90%", borderRadius: 10 }}
          />
        </Pressable>
        <View style={{ marginLeft: 10 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>Title :</Text>
            <Text>{item.title}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>Description :</Text>
            <Text>{item.description}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>Quantity :</Text>
            <Text>{item.quantity}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>Price :</Text>
            <Text>{item.price}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>Date :</Text>
            <Text>{item.date}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
        }}
      >
        <TextInput
          placeholder="🔍 search..."
          onChangeText={(t) => setSearch(t)}
        />
      </View>
      <FlatList
        renderItem={renderItem}
        data={items.filter((item) => {
          return item.title.toLowerCase().includes(search.toLowerCase());
        })}
        ItemSeparatorComponent={() => (
          <View
            style={{
              margin: 10,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.2)",
            }}
          ></View>
        )}
      />
    </View>
  );
}
