import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import clsx from "clsx";
import { useUser } from "../../../redux/userContext";
import getFormattedDate from "../../../utils/getFormattedDate";
import getstudentremark from "../../../api/getstudentremark";
import Notavailable from "../../../assets/icons/notavailable";
import formatDateAndDay from "../../../utils/formatDateAndDay";
import getsinglestudentremark from "../../../api/getsinglestudentremark";
import { useNavigation } from "expo-router";
import getsinglestudentremarkadmin from "../../../api/getstudentremarkadmin";
const Card = ({ field, details, bg }) => {
  return (
    <View
      className={clsx("flex-row w-full px-6 py-6", bg ? "bg-[#efefef]" : "")}
    >
      <Text
        className="w-32 text-[#737A82] font-medium text-[16px]"
        style={{ fontFamily: "Matter500", wordBreak: "break-word" }}
      >
        {field}
      </Text>
      <Text
        className="text-[16px] w-[60%]  leading-5"
        style={{ fontFamily: "Matter", wordBreak: "break-word" }}
      >
        {details}
      </Text>
    </View>
  );
};
const Studentremark = ({ }) => {
  const [remark, setremark] = useState();
  const { state } = useUser();
  const navigation = useNavigation();

  const user = state.user;
  const [date, setdate] = useState();
  const [pageload, setpageload] = useState(true);
  const route = useRoute();

  const { id, student } = route.params;
  console.log(id, "idddddd");

  useEffect(() => {
    setdate(getFormattedDate());
    const getdata = async () => {
      if (user.usertype == "student") {
        setpageload(true);
        const data = await getstudentremark();
        setremark(data);
        setpageload(false);
      } else if (user.usertype == "teacher") {
        setpageload(true);
        const data = await getsinglestudentremark(id);
        setremark(data);
        setpageload(false);
      }
      else if (user.usertype == "admin") {
        setpageload(true);
        const data = await getsinglestudentremarkadmin(id);
        setremark(data);
        setpageload(false);
      }
    };
    getdata();
  }, []);

  return (
    <View className={`flex-1`}>
      {pageload ? (
        <View className={`flex justify-center items-center h-full`}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          <View className={`flex-1  `}>
            <View className={`w-full border-b border-gray-300`}>
              <View className={`p-6`}>
                <Text
                  style={{
                    fontFamily: "Avant",

                    textTransform: "uppercase",

                    fontSize: 20,
                  }}
                >
                  {student ? `${student} - ` : ""}Remarks
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

            {remark.length > 0 ? (
              <View className={`flex-col px-5 gap-8 py-12`}>
                {remark
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <View
                      key={item._id}
                      className={clsx(
                        `flex text-[#000000] overflow-hidden`,
                        index === remark.length - 1 &&
                        `rounded-xl border-2 border-[#E2E4E8]`,
                        index % 2 !== 0 &&
                        `border-2 border-[#E2E4E8] rounded-xl`,
                        index % 2 === 0 &&
                        `rounded-xl border-2 border-[#E2E4E8]`
                      )}
                    >
                      <Card field="Remark:" details={item?.remark} bg={true} />

                      <Card field="Remark by:" details={item?.teacher?.name} />
                      <Card
                        field="Remark date:"
                        details={formatDateAndDay(item?.updatedAt).date}
                        bg={true}
                      />
                      <Card
                        field="Remark time:"
                        details={formatDateAndDay(item?.updatedAt).time}
                      />
                    </View>
                  ))}
              </View>
            ) : (
              <View className={`flex-1 justify-center py-20   items-center`}>
                <Notavailable />
                <Text
                  className="text-lg text-[#3B3B3B"
                  style={{
                    fontFamily: "Avant",
                  }}
                >
                  No Remark's
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
      {user.usertype == "teacher" && (
        <TouchableOpacity
          onPress={() => {
            console.log("tatattaatatat");
            navigation.navigate("teacher/addremark", {
              id: id,
              student: student,
            });
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

export default Studentremark;
