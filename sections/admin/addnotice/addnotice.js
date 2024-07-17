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
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AddNoticeApi from "../../../api/addnotice";
import getFormattedDate from "../../../utils/getFormattedDate";
import { useNavigation } from "expo-router";

const Addnotice = () => {
  const [date, Setdate] = useState(getFormattedDate());
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const handleAddNotice = async () => {
    if (!title || !description) {
      ToastAndroid.show("Fill all the details.", ToastAndroid.SHORT);
      return;
    }
    setLoading(true)
    const res = await AddNoticeApi({ title: title, description: description });
    if (res.error) {
      ToastAndroid.show(res.error, ToastAndroid.SHORT);
      return;
    }
    ToastAndroid.show("Notice added successfully.", ToastAndroid.SHORT);
    navigation.navigate("admin/home");
    setTitle("");
    setDescription("");
  };

  return (
    <View className=" h-full flex flex-col justify-between ">
      <ScrollView>
      <View className={`w-full sticky top-0  border-b border-gray-300`}>
            <View className={`w-full border-b border-gray-300`}>
              <View className={`p-6`}>
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

                <Text
                  className={"text-gray-600 text-base"}
                  style={{ fontFamily: "Matter" }}
                >
                  {date}
                </Text>
              </View>
            </View>
          </View>
        <View className="p-6 grid gap-6 w-full">
         
          <View style={styles.descriptionContainer}>
              <Text
                className=" pb-2"
                style={{ fontSize: 16, fontFamily: "Matter500" }}
              >
                Title
              </Text>
              <TextInput
                className="text-[#858585] px-3  border-[1px] border-[#EDEEF4] active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl  pt-3.5 pb-[14.4px] bg-white"
                style={[
                  { fontSize: 16, fontFamily: "Matter" }, // Set the font size explicitly
                ]}
                placeholder="Enter title"
                value={title}
                onChangeText={setTitle}
                multiline
              />
            </View>
            <View>
              <Text
                className="pb-4"
                style={{ fontSize: 16, fontFamily: "Matter500" }}
              >
                Description
              </Text>
              <TextInput
                className="text-[#858585] px-3 min-h-[300px] text-start border-[1px] border-[#EDEEF4] active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl pt-3.5 pb-[14.4px] bg-white"
                style={{
                  fontSize: 16,
                  fontFamily: "Matter",
                  textAlignVertical: "top",
                }}
               placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
              />
            </View>
        
         
        </View>
      </ScrollView>
      <View className="px-4 pb-4">
        <View className="flex flex-row justify-between border-[1px] border-[#E4E4E5] rounded-full px-2 py-2 items-center">
          <Text
            style={{
              fontFamily: "Matter500",
            }}
            className="leading-none pb-1 px-2 text-[16px]"
          >
            Add Notice
          </Text>
          <TouchableOpacity
            onPress={ handleAddNotice}
            className="rounded-full w-[80px] flex items-center bg-[#205FFF]"
          >
            <Text
              style={{ fontFamily: "Matter500" }}
              className="text-white leading-none text-[14px] py-2.5 pb-[14px] font-medium"
            >
              {loading ? <ActivityIndicator color={"#fff"} /> : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdown: {
    flex: 1,
    margin: 10,
  },
  measureContent: {
    position: "absolute",
    top: -1000, // Move it out of view
    left: 0,
    right: 0,
  },
  content: {
    overflow: "hidden",
    width: "100%",
  },
  text: {
    padding: 20,
    color: "white",
    textAlign: "center",
  },
  descriptionContainer: {
    marginTop: 20,
  },
  textInput: {
    height: 100,
    fontSize: 16,
    fontFamily: "Inter-Black",
    textAlignVertical: "top",
  },
});
export default Addnotice;
