import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import AddRemarkapi from "../../../api/addremark";
import { useNavigation } from "expo-router";

const TeacherAddRemark = ({}) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  const { id, student } = route.params;

  const handleSubmit = async () => {
    console.log(description, description.length, id, "dddddddddddddd");
    if (description.trim().length == 0) {
      return ToastAndroid.show("Description Required", ToastAndroid.SHORT);
    }
    setLoading(true);

    const data = await AddRemarkapi(description, id);
    if (data) {
      ToastAndroid.show("Remark Added", ToastAndroid.SHORT);
      navigation.navigate("teacher/home");
    }
  };

  return (
    <View className={`flex-1`}>
      <ScrollView>
        <View className={`flex-1  `}>
          <View className={`w-full border-b border-gray-300`}>
            <View className={` px-6 pt-6 pb-3 `}>
              <Text
                style={{
                  fontFamily: "Avant",

                  textTransform: "uppercase",

                  fontSize: 25,
                }}
              >
                Add Remark
              </Text>

              <Text
                className="text-gray-600 pt-1 text-sm"
                style={{
                  fontFamily: "Matter",
                }}
              >
                This remark reflects on the - {student} performance.
              </Text>
            </View>
          </View>
          <View className="px-6 pt-8">
            <Text
              className=" pb-2 "
              style={{ fontSize: 16, fontFamily: "Matter500" }}
            >
              Description
            </Text>
            <TextInput
              className="text-[#858585] px-3 min-h-[300px] text-start  border-[1px] border-[#EDEEF4] active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl  pt-3.5 pb-[14.4px] bg-white"
              style={[
                {
                  fontSize: 16,
                  fontFamily: "Matter",
                  textAlignVertical: "top",
                },
              ]}
              placeholder="Enter description"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>
        </View>
      </ScrollView>
      <View
        className={`flex absolute bottom-3 w-full justify-center items-center `}
      >
        <TouchableOpacity
          onPress={() => handleSubmit()}
          className=" bg-blue-600 w-[170px]  py-4 rounded-full flex justify-center items-center  "
        >
          {!loading ? (
            <Text className="text-white text-[16px] font-Avant uppercase leading-[20px] font-medium ">
              Submit Remark
            </Text>
          ) : (
            <ActivityIndicator color={"white"} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TeacherAddRemark;
