import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useNavigation } from "expo-router";
import clsx from "clsx";
import getallnotices from "../../api/getallnotices";
import { useUser } from "../../redux/userContext";
import getFormattedDate from "../../utils/getFormattedDate";

const Notice = () => {
  const [notices, setnotices] = useState();
  const [date, Setdate] = useState(getFormattedDate());
const[pageload,setpageload]=useState(true)
  const navigation = useNavigation();
const {state}=useUser()
const user=state.user;
  useEffect(() => {
    const getNotices = async () => {
      const response = await getallnotices();
      setnotices(response);
      setpageload(false)
    };
    getNotices();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  if(pageload){
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View className=" flex flex-col justify-between h-full ">
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
                 Notice
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
      {user.usertype == "admin" && (
        <TouchableOpacity
        onPress={() => {
          navigation.navigate("admin/addnotice");
        }}
          className=" bg-blue-600 absolute bottom-5 right-5 h-[50px] w-[50px] flex justify-center items-center rounded-full "
        >
          <View>
            <Text className=" text-white text-[35px] leading-[35px] font-Matter font-medium text-center  ">
              +
            </Text>
          </View>
        </TouchableOpacity>
      )}
     
    </View>
  );
};

export default Notice;
