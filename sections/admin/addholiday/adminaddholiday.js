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
import Holidaydate from "../../../components/holidaydate";

const Adminaddholiday = ({}) => {
  const pagerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(getFormattedDate());
  const [attendence, setAttendence] = useState({});
  const [currentpage, setCurrentPage] = useState(0); // State to track the current page
  const { state } = useUser();
  const user = state.user;
  const navigation = useNavigation();



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
                           <Holidaydate entry={entry} index={index} entryIndex={entryIndex} setAttendence={setAttendence}/>
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
