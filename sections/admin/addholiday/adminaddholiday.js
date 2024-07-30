import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { ScrollView } from "react-native";
import PagerView from "react-native-pager-view";
import { useUser } from "../../../redux/userContext";
import getFormattedDate from "../../../utils/getFormattedDate";

import Assbtn from "../../../assets/icons/assbtn";
import { useNavigation } from "expo-router";
import Getattendancedatesadmin from "../../../api/getaatendancedatesadmin";
import MarkHoliday from "../../../api/markholiday";

const Adminaddholiday = ({}) => {
  const pagerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(getFormattedDate());
  const [attendence, setAttendence] = useState({});
  const [currentpage, setCurrentPage] = useState(0); // State to track the current page
  const { state } = useUser();
  const [dateLoad, setdateLoad] = useState(false);
  const user = state.user;
  const navigation = useNavigation();

  const [lastPress, setLastPress] = useState(0);
  const DOUBLE_PRESS_DELAY = 300; // Double press interval in milliseconds

  const toggleHoliday = async (val, targetDate) => {
    const res = await MarkHoliday({ date: targetDate, isHoliday: val });
    console.log(res, "rrrrrrrrrrrrrrrrr");
    if (res?.error) {
      ToastAndroid.show(res?.error, ToastAndroid.SHORT);
      return;
    }
    const data = await Getattendancedatesadmin();
    setAttendence(data);
    setdateLoad(false);
    ToastAndroid.show(res?.data, ToastAndroid.SHORT);
  };

  const handlePress = (value, date, index) => {
    const now = Date.now();

    if (now - lastPress < DOUBLE_PRESS_DELAY) {
      setdateLoad(index);
      console.log(date);
      toggleHoliday(!value, date);
    } else {
      ToastAndroid.show(
        !value
          ? "Press one more time to mark it as holiday."
          : "Press one more time to un-mark holiday.",
        ToastAndroid.SHORT
      );
    }
    setLastPress(now);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await Getattendancedatesadmin();
      setAttendence(data);
      console.log(data);
      setLoading(false);
    };
    if (user) {
      getData();
    }
  }, [user]);

  const gotoprevpage = () => {
    if (currentpage > 0) {
      // Check if current page is greater than 0
      setCurrentPage(currentpage - 1); // Decrement current page
      pagerRef.current.setPage(currentpage - 1); // Go to previous page
    } else {
      ToastAndroid.show("This is First Month", ToastAndroid.SHORT);
    }
  };
  const gotonextpage = () => {
    if (currentpage < Object.keys(attendence).length - 1) {
      // Check if current page is less than total pages
      setCurrentPage(currentpage + 1); // Increment current page
      pagerRef.current.setPage(currentpage + 1); // Go to next page
    } else {
      ToastAndroid.show("You have reached last Month", ToastAndroid.SHORT);
    }
  };

  return (
    <View className={`flex-1 h-full`}>
      {loading ? (
        <View className={`flex justify-center items-center h-full`}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView className={``}>
          <View className={`flex-1`}>
            <View className={`w-full border-b border-gray-300`}>
              <View className={`p-6`}>
                <Text
                  style={{
                    fontFamily: "Avant",

                    textTransform: "uppercase",

                    fontSize: 20,
                  }}
                >
                  SELECT DATE
                </Text>

                <Text
                  className="text-gray-600 text-base"
                  style={{
                    fontFamily: "Matter",
                  }}
                >
                  {date}
                </Text>
              </View>
            </View>

            <View style={{ display: "flex" }}>
              <PagerView
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                initialPage={0}
                ref={pagerRef}
                scrollEnabled={false}
              >
                {Object.keys(attendence)
                  ?.slice()
                  .reverse()
                  .map((month, index) => (
                    <View key={index} className={` w-[100%] p-4   `}>
                      <View
                        className={`border-[1px] border-[#E2E4E8] py-[12px] rounded-xl w-[100%]  `}
                      >
                        <Text
                          className={` border-[#E2E4E8] border-b-[1px] px-2  text-center uppercase text-[24px] pb-[12px] `}
                          style={{
                            marginBottom: 8,
                            fontFamily: "Avant",
                          }}
                        >
                          {month}
                        </Text>
                        <View
                          className=" px-2"
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                          }}
                        >
                          {attendence[month]?.map((entry, entryIndex) => (
                            <TouchableOpacity
                              onPress={() =>
                                handlePress(entry.holiday, entry.date, index)
                              }
                              key={entryIndex}
                              className="p-2"
                              style={{
                                width: "20%",
                              }}
                            >
                              {dateLoad == entryIndex ? (
                                <ActivityIndicator size={10} />
                              ) : (
                                <Text
                                  className="border-[#EAEAEE]  border-[1px] py-3 rounded-lg  text-[15px]  text-center"
                                  style={{
                                    fontFamily: "Matter",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    textDecorationLine: entry.holiday
                                      ? "line-through"
                                      : "",
                                    color: entry.holiday ? "#fff" : "#737A82",
                                    borderColor: entry.holiday
                                      ? "#0470BC"
                                      : "#EAEAEE",

                                    backgroundColor: entry.holiday
                                      ? "#0470BC"
                                      : "#fff",
                                  }}
                                >
                                  {entryIndex + 1}
                                </Text>
                              )}
                            </TouchableOpacity>
                          ))}
                        </View>
                      </View>
                    </View>
                  ))}
              </PagerView>
            </View>
          </View>
        </ScrollView>
      )}
      <View className="px-4 pb-4">
        <View
          className={`flex  flex-row justify-between  border-[1px] border-[#E4E4E5] rounded-full px-3 py-3 items-center`}
        >
          <TouchableOpacity onPress={gotoprevpage}>
            <Assbtn color={currentpage > 0 ? `#205FFF` : `#9B9B9B`} />
          </TouchableOpacity>

          <TouchableOpacity onPress={gotonextpage} className={" rotate-180"}>
            <Assbtn
              color={
                currentpage < Object.keys(attendence).length - 1
                  ? `#205FFF`
                  : `#9B9B9B`
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Adminaddholiday;
