import { Link, useNavigation } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Dashboard from "../assets/icons/dashboard";
import Homework from "../assets/icons/homework";
import Assessment from "../assets/icons/assessment";
import Chat from "../assets/icons/chat";
import Attendence from "../assets/icons/attendence";
import Profile from "../assets/icons/profile";
import Logout from "../assets/icons/logout";
import Remark from "../assets/icons/remark";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import { useUser } from "../redux/userContext";
const Menu = ({ toggleDrawer }) => {
  const navigation = useNavigation();
  const { state } = useUser();
  const user = state.user;
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      console.log("Logout successful");
      await Updates.reloadAsync(); // Reload the entire Expo app
      // After calling reloadAsync(), the app will reload and this line may not be necessary.
      navigation.navigate(" "); // You can remove this line if the app reloads immediately
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <View>
      {user?.usertype == "student" ? (
        <View className=" flex h-full py-[32px] px-[16px] flex-col justify-between">
          <View className=" space-y-4 divide-y divide-zinc-500 ">
            <Link href={"/student/home"}>
              <View className="flex flex-row items-center gap-2 ">
                <View>
                  <Dashboard />
                </View>
                <Text
                  className="text-[18px] "
                  style={{ fontFamily: "Matter500", color: "#16191D" }}
                >
                  Dashboard
                </Text>
              </View>
            </Link>
            <Link href={"/student/homework"}>
              <View className="flex flex-row    items-center gap-2 ">
                <View>
                  <Homework />
                </View>
                <Text
                  className="text-[18px]"
                  style={{ fontFamily: "Matter500", color: "#16191D" }}
                >
                  Homework
                </Text>
                {user.unreadHomework > 0 && (
                  <View className=" h-5 w-5 rounded-full flex flex-row justify-center items-center bg-blue-400">
                    <Text className={"  text-[12px] text-white text-center  "}>
                      {user.unreadHomework}
                    </Text>
                  </View>
                )}
              </View>
            </Link>
            <Link href={"/student/assessment"}>
              <View className="flex flex-row    items-center gap-2 ">
                <View>
                  <Assessment />
                </View>
                <Text
                  className="text-[18px] leading-none"
                  style={{ fontFamily: "Matter500", color: "#16191D" }}
                >
                  Assessment{" "}
                </Text>
                {user.unreadAssessment > 0 && (
                  <View className=" h-5 w-5 rounded-full flex flex-row justify-center items-center bg-blue-400">
                    <Text className={"  text-[12px] text-white text-center  "}>
                      {user.unreadAssessment}
                    </Text>
                  </View>
                )}
              </View>
            </Link>
            <Link href={"/student/attendence"}>
              <View className="flex flex-row    items-center gap-2 ">
                <View>
                  <Attendence />
                </View>
                <Text
                  className="text-[18px]"
                  style={{ fontFamily: "Matter500", color: "#16191D" }}
                >
                  Attendance
                </Text>
              </View>
            </Link>
            <Link href={"/student/remark"}>
              <View className="flex flex-row    items-center gap-2 ">
                <View>
                  <Remark />
                </View>
                <Text
                  className="text-[18px]"
                  style={{ fontFamily: "Matter500", color: "#16191D" }}
                >
                  Remarks
                </Text>
              </View>
            </Link>
            <Text
              onPress={() => {
                navigation.navigate("chat", { group: user?.class });
              }}
            >
              <View className="flex flex-row    items-center gap-2 ">
                <View>
                  <Chat />
                </View>
                <Text
                  className="text-[18px]"
                  style={{ fontFamily: "Matter500", color: "#16191D" }}
                >
                  Chat {user?.class}
                </Text>
              </View>
            </Text>
            <Link href={"/student/profile"}>
              <View className="flex flex-row    items-center gap-2 ">
                <View>
                  <Profile />
                </View>
                <Text
                  className="text-[18px]"
                  style={{ fontFamily: "Matter500", color: "#16191D" }}
                >
                  Profile
                </Text>
              </View>
            </Link>
            <Link href={"/notice"}>
              <View className="flex flex-row   items-center gap-2 ">
                <View>
                  <Profile />
                </View>
                <Text
                  className="text-[18px]"
                  style={{ fontFamily: "Matter500", color: "#16191D" }}
                >
                  Notice
                </Text>
              </View>
            </Link>
          </View>
          <View className={`w-full`}>
            <TouchableOpacity
              className={`rounded-md w-full justify-center border-[1px] py-2.5 pb-3.5 border-[#FC6C6C]`}
              onPress={() => {
                handleLogout();
              }}
            >
              <View
                className={`flex flex-row justify-center gap-2 items-center`}
              >
                {/* Replace Door with the SVG component */}
                <Text>
                  <Logout />
                </Text>
                <Text
                  className="text-[#FC6C6C] text-[16px] uppercase font-medium"
                  style={{ fontFamily: "Matter500" }}
                >
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : user?.usertype == "teacher" ? (
        <View className=" flex h-full py-[32px] px-[16px] flex-col justify-between">
          <ScrollView>
            <View className="space-y-4 divide-y divide-zinc-500 pb-10 ">
              <Link href={"/teacher/home"}>
                <View className="flex flex-row   items-center gap-2 ">
                  <View>
                    <Dashboard />
                  </View>
                  <Text
                    className="text-[18px]"
                    style={{ fontFamily: "Matter500", color: "#16191D" }}
                  >
                    Dashboard
                  </Text>
                </View>
              </Link>
              <Link href={"/teacher/homework"}>
                <View className="flex flex-row   items-center gap-2 ">
                  <View>
                    <Homework />
                  </View>
                  <Text
                    className="text-[18px]"
                    style={{ fontFamily: "Matter500", color: "#16191D" }}
                  >
                    Homework
                  </Text>
                </View>
              </Link>
              <Link href={"/teacher/assessment"}>
                <View className="flex flex-row   items-center gap-2 ">
                  <View>
                    <Assessment />
                  </View>
                  <Text
                    className="text-[18px]"
                    style={{ fontFamily: "Matter500", color: "#16191D" }}
                  >
                    Assessment
                  </Text>
                </View>
              </Link>
              {user.classteacher && (
                <Link href={"/teacher/attendence"}>
                  <View className="flex flex-row   items-center gap-2 ">
                    <View>
                      <Attendence />
                    </View>
                    <Text
                      className="text-[18px]"
                      style={{ fontFamily: "Matter500", color: "#16191D" }}
                    >
                      Attendance
                    </Text>
                  </View>
                </Link>
              )}

              <Link href={"/teacher/students"}>
                <View className="flex flex-row   items-center gap-2 ">
                  <View>
                    <Remark />
                  </View>
                  <Text
                    className="text-[18px]"
                    style={{ fontFamily: "Matter500", color: "#16191D" }}
                  >
                    Students
                  </Text>
                </View>
              </Link>
              {user?.teachingclass.map((classItem, index) => (
                <Text
                  key={index}
                  onPress={() => {
                    navigation.navigate("chat", { group: classItem });
                    toggleDrawer();
                  }}
                >
                  <View className={`flex flex-row items-center gap-2`}>
                    <View>
                      <Chat />
                    </View>
                    <Text
                      className=" text-[19.2px]"
                      style={{ fontFamily: "Matter500" }}
                    >
                      Chat- {classItem}
                    </Text>
                  </View>
                </Text>
              ))}
              <Link href={"/teacher/profile  "}>
                <View className="flex flex-row   items-center gap-2 ">
                  <View>
                    <Profile />
                  </View>
                  <Text
                    className="text-[18px]"
                    style={{ fontFamily: "Matter500", color: "#16191D" }}
                  >
                    Profile
                  </Text>
                </View>
              </Link>
              <Link href={"/notice"}>
              <View className="flex flex-row   items-center gap-2 ">
                <View>
                  <Profile />
                </View>
                <Text
                  className="text-[18px]"
                  style={{ fontFamily: "Matter500", color: "#16191D" }}
                >
                  Notice
                </Text>
              </View>
            </Link>
            </View>
          </ScrollView>
          <View className={`w-full pt-20 `}>
            <TouchableOpacity
              className={`rounded-md w-full justify-center border-[1px] py-2.5 pb-3.5 border-[#FC6C6C]`}
              onPress={() => {
                handleLogout();
              }}
            >
              <View
                className={`flex flex-row justify-center gap-2 items-center`}
              >
                {/* Replace Door with the SVG component */}
                <Text>
                  <Logout />
                </Text>
                <Text
                  className="text-[#FC6C6C] text-[16px] uppercase font-medium"
                  style={{ fontFamily: "Matter500" }}
                >
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className=" flex h-full py-[32px] px-[16px] flex-col justify-between">
          <View className="space-y-4 divide-y divide-zinc-500">
            <Link href={"/admin/home"}>
              <View className="flex flex-row   items-center gap-2 ">
                <View>
                  <Dashboard />
                </View>
                <Text
                  className="text-[18px]"
                  style={{ fontFamily: "Matter500", color: "#16191D" }}
                >
                  Dashboard
                </Text>
              </View>
            </Link>

            <Text
              onPress={() => {
                navigation.navigate("admin/allclass", { callback: "students" });
                toggleDrawer();
              }}
            >
              <View className={`flex flex-row items-center gap-2`}>
                <View>
                  <Remark />
                </View>
                <Text
                  className=" text-[19.2px]"
                  style={{ fontFamily: "Matter500" }}
                >
                  Students
                </Text>
              </View>
            </Text>
            <Text
              onPress={() => {
                navigation.navigate("admin/teachers");
                toggleDrawer();
              }}
            >
              <View className={`flex flex-row items-center gap-2`}>
                <View>
                  <Remark />
                </View>
                <Text
                  className=" text-[19.2px]"
                  style={{ fontFamily: "Matter500" }}
                >
                  Teachers
                </Text>
              </View>
            </Text>
            <Text
              onPress={() => {
                navigation.navigate("admin/allclass", { callback: "chat" });
                toggleDrawer();
              }}
            >
              <View className={`flex flex-row items-center gap-2`}>
                <View>
                  <Chat />
                </View>
                <Text
                  className=" text-[19.2px]"
                  style={{ fontFamily: "Matter500" }}
                >
                  Chat
                </Text>
              </View>
            </Text>
            <Text
              onPress={() => {
                navigation.navigate("admin/allclass", { callback: "homework" });
                toggleDrawer();
              }}
            >
              <View className={`flex flex-row items-center gap-2`}>
                <View>
                  <Homework />
                </View>
                <Text
                  className=" text-[19.2px]"
                  style={{ fontFamily: "Matter500" }}
                >
                  Homework
                </Text>
              </View>
            </Text>

            <Link href={"/admin/addteacher"}>
              <View className="flex flex-row   items-center gap-2 ">
                <View>
                  <Profile />
                </View>
                <Text
                  className="text-[18px]"
                  style={{ fontFamily: "Matter500", color: "#16191D" }}
                >
                  Add Teacher
                </Text>
              </View>
            </Link>
            <Link href={"/notice"}>
              <View className="flex flex-row   items-center gap-2 ">
                <View>
                  <Profile />
                </View>
                <Text
                  className="text-[18px]"
                  style={{ fontFamily: "Matter500", color: "#16191D" }}
                >
                  Notice
                </Text>
              </View>
            </Link>
          </View>
          <View className={`w-full`}>
            <TouchableOpacity
              className={`rounded-md w-full justify-center border-[1px] py-2.5 pb-3.5 border-[#FC6C6C]`}
              onPress={() => {
                handleLogout();
              }}
            >
              <View
                className={`flex flex-row justify-center gap-2 items-center`}
              >
                {/* Replace Door with the SVG component */}
                <Text>
                  <Logout />
                </Text>
                <Text
                  className="text-[#FC6C6C] text-[16px] uppercase font-medium"
                  style={{ fontFamily: "Matter500" }}
                >
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Menu;
