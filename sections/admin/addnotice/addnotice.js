import clsx from "clsx";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import AddNoticeApi from "../../../api/addnotice";

const Addnotice = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddNotice = async () => {
    if (!title || !description) {
      ToastAndroid.show("Fill all the details.", ToastAndroid.SHORT);
      return;
    }
    const res = await AddNoticeApi({ title: title, description: description });
    if (res.error) {
      ToastAndroid.show(res.error, ToastAndroid.SHORT);
      return;
    }
    ToastAndroid.show("Notice added successfully.", ToastAndroid.SHORT);
    setTitle("");
    setDescription("");
  };

  return (
    <View className=" h-full flex flex-col justify-between ">
      <ScrollView>
        <View className="p-6 w-full border-b border-gray-300">
          <Text
            style={{
              fontFamily: "Avant",
              fontFeatures: [{ salt: 1 }],
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Add Notice
          </Text>
        </View>
        <View className="p-6 grid gap-6 w-full">
          <View>
            <Text
              className=" font-Matter text-[17px] mb-2 "
              style={{
                fontFamily: "Matter500",
              }}
            >
              Title:
            </Text>
            <TextInput
              placeholder="Add title"
              value={title}
              onChangeText={setTitle}
              style={{
                borderWidth: 1,
                borderColor: "gray",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
            />
          </View>
          <View>
            <Text
              className=" font-Matter text-[17px] mb-2 "
              style={{
                fontFamily: "Matter500",
              }}
            >
              Description:
            </Text>
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={{
                borderWidth: 1,
                borderColor: "gray",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
                textAlignVertical: "top",
              }}
            />
          </View>
          <View className=" sticky bottom-2 right-0 w-full flex items-end px-6 ">
            <TouchableOpacity
              onPress={() => {
                handleAddNotice();
              }}
              className={clsx(
                `p-3 flex justify-center  w-[150px] bg-blue-500 items-center rounded-xl`
              )}
            >
              <Text
                className="text-[18px] text-white"
                style={[{ fontFamily: "Matter500" }]}
              >
                Add Notice
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Addnotice;
