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
import clsx from "clsx";
const Card = ({ field, details, bg }) => {
  return (
    <View className={clsx("flex-row w-full ", bg ? "bg-[#F9FBFC]" : "")} >
      <Text className="w-28 text-[#737A82] font-medium text-[16px] leading-5" style={{ fontFamily: "Matter500", wordBreak: "break-word" }}>{field}</Text>
      <Text className="text-[16px] w-[60%] leading-5" style={{ fontFamily: "Matter", wordBreak: "break-word" }}>{details}</Text>
    </View>
  );
};
const TeacherAddRemark = ({ }) => {
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

                  fontSize: 20,
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
                This remark reflects on the - <Text style={{
                  fontFamily: "Matter500",
                }} className="  text-black">{student}</Text> performance.
              </Text>
            </View>
          </View>
          <View className="px-6 pt-8 flex flex-col gap-4">

            <View>

              <Text
                className=" pb-4 "
                style={{ fontSize: 16, fontFamily: "Matter500" }}
              >
                Remark
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
                placeholder={`Add remark for ${student}`}
                value={description}
                onChangeText={setDescription}
                multiline
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="px-4 pb-4">

        <View className={`flex  flex-row justify-between  border-[1px] border-[#E4E4E5] rounded-full px-2 py-2 items-center`}>
          <Text style={{
            fontFamily: "Matter500"
          }} className=" leading-none pb-1 px-2 text-[16px] ">
            Add Remark
          </Text>
          <TouchableOpacity
            onPress={() => handleSubmit()}
            className={clsx(" rounded-full w-[80px] flex items-center bg-[#205FFF]")}

          >
            <Text style={{ fontFamily: "Matter500" }} className={`text-white leading-none text-[14px]   py-2.5 pb-[14px] font-medium`}>
              {loading ? <ActivityIndicator color={"#fff"} /> : "Add"}</Text>
          </TouchableOpacity>
          {/* <View className=" h-[4px] w-[50px] bg-[#D9D9D9] rounded-full mt-1 ">
                        <View
                            style={{ width: `${scrollprogress}%` }}
                            className=" h-full  bg-[#1D55E5] rounded-full transition-all duration-1000"
                        ></View>
                    </View> */}

        </View>
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
