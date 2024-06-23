import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native";

import { useNavigation } from "expo-router";
import getFormattedDate from "../../../utils/getFormattedDate";
import { useUser } from "../../../redux/userContext";
import getassessment from "../../../api/getassessment";
import clsx from "clsx";
import formatDateAndDay from "../../../utils/formatDateAndDay";
import Notavailable from "../../../assets/icons/notavailable";
import { useRoute } from "@react-navigation/native";
import getStudentassessmentteacher from "../../../api/getstudentassessmentteacher";
import getStudentassessmentadmin from "../../../api/getstudentassessmentadmin";

const Studentassessment = ({}) => {
  const { state } = useUser();
  const [activeTab, setActiveTab] = useState("pending");
  const navigation = useNavigation();
  const user = state.user;
  const [date, setdate] = useState();
  const [pageload, setpageload] = useState(true);
  const [subjectAssignments, setsubjectAssignments] = useState();
  const route = useRoute();
  const { id, student } = route.params;
  useEffect(() => {
    setdate(getFormattedDate());
    const getAssignmentBySubject = async () => {
      if (user.usertype == "student") {
        const data = await getassessment();

        setsubjectAssignments(data);
        setpageload(false);
      } else if (user.usertype == "teacher") {
        const data = await getStudentassessmentteacher(id);
        setsubjectAssignments(data);
        setpageload(false);
      } else if (user.usertype == "admin") {
        const data = await getStudentassessmentadmin(id);
        setsubjectAssignments(data);
        setpageload(false);
      }
    };
    getAssignmentBySubject();
  }, [user]);

  const Card = ({ field, details, bg }) => {
    return (
      <View
        className={clsx("flex-row w-full px-6 py-6", bg ? "bg-[#F9FBFC]" : "")}
      >
        <Text
          className="w-32 text-[#737A82] font-medium text-[16px] leading-5"
          style={{ fontFamily: "Matter500", wordBreak: "break-word" }}
        >
          {field}
        </Text>
        <Text
          className="text-[16px] w-[60%] leading-5"
          style={{ fontFamily: "Matter", wordBreak: "break-word" }}
        >
          {details}
        </Text>
      </View>
    );
  };

  return (
    <View className={`flex-1`}>
      {pageload ? (
        <View className={`flex justify-center items-center h-full`}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView className="flex-1">
          <View className={`flex-1 h-full`}>
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
                  {student ? `${student} - ` : ""}Assessment
                </Text>

                <Text
                  className="ext-gray-600 text-base"
                  style={{
                    fontFamily: "Matter",
                  }}
                >
                  {date}
                </Text>
              </View>
            </View>

            <View className={`flex-1 h-full pt-12 px-4 pb-4`}>
              {subjectAssignments ? (
                <View className={`flex-1 h-full  p-4`}>
                  {subjectAssignments.pending.length > 0 ||
                  subjectAssignments.submitted.length > 0 ? (
                    <View className={`flex-row mb-4 gap-[16px]`}>
                      <TouchableOpacity
                        className={clsx(
                          "flex-1 items-center py-2 rounded-lg",
                          activeTab === "pending"
                            ? `bg-blue-500`
                            : `bg-[#6C6C6C]`
                        )}
                        onPress={() => setActiveTab("pending")}
                      >
                        <Text
                          className="text-lg text-white"
                          style={{
                            fontFamily: "Avant",
                          }}
                        >
                          Pending
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className={clsx(
                          "flex-1 items-center py-2 rounded-lg",
                          activeTab === "submitted"
                            ? `bg-blue-500`
                            : `bg-[#6C6C6C]`
                        )}
                        onPress={() => setActiveTab("submitted")}
                      >
                        <Text
                          className="text-lg text-white"
                          style={{
                            fontFamily: "Avant",
                          }}
                        >
                          Submitted
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}

                  {activeTab === "pending" ? (
                    <View className=" h-full">
                      {subjectAssignments.pending &&
                      subjectAssignments.pending.length > 0 ? (
                        <ScrollView className={`flex-col gap-8 flex py-12 `}>
                          {subjectAssignments.pending
                            .slice()
                            .reverse()
                            .map((item, index) => (
                              <View
                                key={item._id}
                                className={clsx(
                                  "flex   text-[#000000] overflow-hidden",
                                  index ===
                                    subjectAssignments.pending.length - 1 &&
                                    `rounded-xl border-2 border-[#E2E4E8]`,
                                  index % 2 !== 0 &&
                                    `border-2 border-[#E2E4E8] rounded-xl `,
                                  index % 2 === 0 &&
                                    `rounded-xl border-2 border-[#E2E4E8]`
                                )}
                              >
                                <Card
                                  field="Title:"
                                  details={item?.title}
                                  bg={true}
                                />
                                <Card field="Class:" details={item?.class} />
                                <Card
                                  field="Subject:"
                                  details={item?.subject}
                                  bg={true}
                                />
                                <Card
                                  field="Assigned by:"
                                  details={item?.teacher?.name}
                                />
                                <Card
                                  field="Assigned date:"
                                  details={
                                    formatDateAndDay(item?.updatedAt).date
                                  }
                                  bg={true}
                                />
                                <Card
                                  field="Assigned time:"
                                  details={
                                    formatDateAndDay(item?.updatedAt).time
                                  }
                                />
                                <Card
                                  bg={true}
                                  field="Total Score:"
                                  details={item.totalAssessmentScore}
                                />
                                {user.usertype == "student" && (
                                  <View
                                    className={`flex-row  py-[16px] pr-3 justify-end`}
                                  >
                                    <TouchableOpacity
                                      onPress={() => {
                                        navigation.navigate(
                                          "student/singleassessment",
                                          {
                                            id: item._id,
                                          }
                                        );
                                      }}
                                      className={`bg-[#205FFF] w-[120px]  flex justify-center  rounded-full items-center h-[40px]`}
                                    >
                                      <Text
                                        className={
                                          "text-white font-medium   pb-1 text-[12px]"
                                        }
                                        style={{
                                          fontFamily: "Matter",
                                        }}
                                      >
                                        Attempt now
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                )}
                              </View>
                            ))}
                        </ScrollView>
                      ) : (
                        <View
                          className={`flex-1 justify-center   items-center`}
                        >
                          <Notavailable />
                          <Text
                            className="text-lg text-[#3B3B3B"
                            style={{
                              fontFamily: "Avant",
                            }}
                          >
                            No Pending Assessment
                          </Text>
                        </View>
                      )}
                    </View>
                  ) : (
                    <View>
                      {subjectAssignments.submitted &&
                      subjectAssignments.submitted.length > 0 ? (
                        <View className={`flex-col gap-8 flex py-12 `}>
                          {subjectAssignments.submitted
                            .slice()
                            .reverse()
                            .map((item, index) => (
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate(
                                    "student/submitedassessment",
                                    {
                                      id: item._id,
                                      studentId: id,
                                    }
                                  );
                                }}
                                key={item._id}
                                className={clsx(
                                  "flex   text-[#000000] overflow-hidden",
                                  index ===
                                    subjectAssignments.submitted.length - 1 &&
                                    `rounded-xl border-2 border-[#E2E4E8]`,
                                  index % 2 !== 0 &&
                                    `border-2 border-[#E2E4E8] rounded-xl `,
                                  index % 2 === 0 &&
                                    `rounded-xl border-2 border-[#E2E4E8]`
                                )}
                              >
                                <Card
                                  field="Title:"
                                  details={item?.title}
                                  bg={true}
                                />
                                <Card field="Class:" details={item?.class} />
                                <Card
                                  field="Subject:"
                                  details={item?.subject}
                                  bg={true}
                                />
                                <Card
                                  field="Marks:"
                                  details={item.totalAssessmentScore}
                                />
                                <Card
                                  field="Score:"
                                  details={item?.score}
                                  bg={true}
                                />
                                <Card
                                  field="Assigned by:"
                                  details={item?.teacher?.name}
                                />
                                <Card
                                  field="Assigned date:"
                                  details={
                                    formatDateAndDay(item?.updatedAt).date
                                  }
                                  bg={true}
                                />
                                <Card
                                  field="Assigned time:"
                                  details={
                                    formatDateAndDay(item?.updatedAt).time
                                  }
                                />
                                <Card
                                  field="Completed date:"
                                  details={
                                    formatDateAndDay(item?.completedAt).date
                                  }
                                  bg={true}
                                />
                                <Card
                                  field="Completed Time:"
                                  details={
                                    formatDateAndDay(item?.completedAt).time
                                  }
                                />
                              </TouchableOpacity>
                            ))}
                        </View>
                      ) : (
                        <View
                          className={`flex-1 justify-center py-[160px] items-center`}
                        >
                          <TouchableOpacity
                            onPress={() => setActiveTab("pending")}
                            className={`bg-[#205FFF] w-[150px] py-4 pb-[20px]  rounded-full items-center min-h-[50px]`}
                          >
                            <Text
                              className="text-white font-medium text-[16px]"
                              style={{
                                fontFamily: "Matter500",
                              }}
                            >
                              Begin now
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              ) : (
                <View className={`flex-1 justify-center py-12 items-center`}>
                  <Text
                    className="text-lg text-black"
                    style={{
                      fontFamily: "Avant",
                    }}
                  >
                    No Assessment available
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Studentassessment;
