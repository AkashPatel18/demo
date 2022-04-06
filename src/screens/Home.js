import React, { useState } from "react";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [inputItems, setInputItem] = useState([]);

  const { navigate } = useNavigation();

  const handleAddItem = () => {
    setInputItem((items) => {
      return [
        ...items,
        {
          image: null,
          title: "",
          description: "",
          quantity: null,
          price: null,
          date: new Date(),
        },
      ];
    });
  };

  const handleAddImagePress = async (index) => {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    });

    const updatedItems = inputItems.map((item, i) => {
      if (i == index) {
        item.image = image.path;
      }
      return item;
    });

    setInputItem(updatedItems);
  };

  const handleChange = (index, type, value) => {
    const updatedItems = inputItems.map((item, i) => {
      if (i === index) {
        item[type] = value;
      }
      return item;
    });
    setInputItem(updatedItems);
  };

  const navigateToItems = () => {
    navigate("ItemList");
  };

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem("items", JSON.stringify(inputItems));
    } catch (e) {
      // saving error
      console.log(e);
    }
    ToastAndroid.show("Submitted items successfully", ToastAndroid.SHORT);
    setInputItem([]);
  };

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
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={{ height: 180, width: "90%", borderRadius: 10 }}
            />
          ) : (
            <Text>Add Image</Text>
          )}
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
            <TextInput
              onChangeText={(text) => handleChange(index, "title", text)}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>Description :</Text>
            <TextInput
              onChangeText={(text) => handleChange(index, "description", text)}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>Quantity :</Text>
            <TextInput
              onChangeText={(text) => handleChange(index, "quantity", text)}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>Price :</Text>
            <TextInput
              onChangeText={(text) => handleChange(index, "price", text)}
            />
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
        }}
      >
        <Pressable
          onPress={navigateToItems}
          style={{
            width: "90%",
            height: 40,
            padding: 10,
            backgroundColor: "#4CAF50",
            borderRadius: 8,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Go to ItemList
          </Text>
        </Pressable>
        <Pressable
          onPress={handleAddItem}
          activeOpacity={0.7}
          style={{
            width: "90%",
            height: 40,
            padding: 10,
            backgroundColor: "#4CAF50",
            borderRadius: 8,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>Add Items</Text>
        </Pressable>
      </View>
      <FlatList
        renderItem={renderItem}
        data={inputItems}
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
      <Pressable
        onPress={handleSubmit}
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
          alignItems: "center",
          justifyContent: "center",
          width: 70,
          position: "absolute",
          bottom: 20,
          right: 20,
          height: 70,
          backgroundColor: "#87CEEB",
          borderRadius: 100,
        }}
      >
        <Text>Submit</Text>
      </Pressable>
    </View>
  );
}
