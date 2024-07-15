import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import getallnotices from "../../../api/getallnotices";
import { useNavigation } from "expo-router";
import clsx from "clsx";

const Notice = () => {
  const [notices, setnotices] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const getNotices = async () => {
      const response = await getallnotices();
      setnotices(response);
    };
    getNotices();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <View className=" flex flex-col justify-between h-full ">
      <ScrollView>
        <View className=" p-6 w-full border-b border-gray-300 ">
          <Text
            style={{
              fontFamily: "Avant",
              fontFeatures: [{ salt: 1 }],
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Notice
          </Text>
        </View>
        <View className="p-6 grid gap-6 w-full">
          {notices?.map((notice) => (
            <View className={"p-5 w-full border rounded-xl border-gray-300"}>
              <View className=" ">
                <Text className=" font-Avant text-[20px] ">{notice.title}</Text>
                <Text className=" pt-2 text-[16px] leading-6 font-Matter font-medium text-[#444444] ">
                  {notice.description}
                </Text>
              </View>
              <View className=" w-full pt-5 font-Matter font-medium flex flex-1 justify-end flex-row ">
                <Text className="">~{formatDate(notice.createdAt)}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View className=" sticky bottom-2 right-0 w-full flex items-end px-6 ">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("admin/addnotice");
          }}
          className={clsx(
            `p-3 flex justify-center w-[100px] bg-blue-500 items-center rounded-xl`
          )}
        >
          <Text
            className="text-[18px] text-white"
            style={[{ fontFamily: "Avant" }]}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Notice;
