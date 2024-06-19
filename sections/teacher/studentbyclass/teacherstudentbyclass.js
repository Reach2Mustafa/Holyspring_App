import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, ScrollView, TextInput } from "react-native";


import AsyncStorage from "@react-native-async-storage/async-storage";

import { Link, useNavigation } from "expo-router";
import Notavailable from "../../../assets/icons/notavailable";
import { useUser } from "../../../redux/userContext";
import getFormattedDate from "../../../utils/getFormattedDate";
import getstudenthomework from "../../../api/getstudenthomework";
import clsx from "clsx";
import formatDateAndDay from "../../../utils/formatDateAndDay";
import { useRoute } from "@react-navigation/native";
import gethomeworkbyclass from "../../../api/gethomeworkbyclass";
import getstudentsbystandard from "../../../api/getstudentsbystandard";
import Attendence from "../../../assets/icons/attendence";
import Assessment from "../../../assets/icons/assessment";
import Remark from "../../../assets/icons/remark";
import Search from "../../../assets/icons/search";

const Card = ({ field, details, bg }) => {
    return (
        <View className={clsx("flex-row w-full px-6 py-6", bg ? "bg-[#F9FBFC]" : "")} >
            <Text className="w-32 text-[#737A82] font-medium text-[16px]" style={{ fontFamily: "Matter500", wordBreak: "break-word" }}>{field}</Text>
            <Text className="text-[16px] w-[60%]" style={{ fontFamily: "Matter", wordBreak: "break-word" }}>{details}</Text>
        </View>
    );
};

const Teacherstudentbyclass = ({ }) => {
    const { state } = useUser();
    const [searchQuery, setSearchQuery] = useState('');


    const navigation = useNavigation();
    const user = state.user;
    const [date, setdate] = useState();
    const [pageload, setpageload] = useState(true);
    const route = useRoute();

    const { class1 } = route.params;
    const [subjectAssignments, setsubjectAssignments] = useState();
    useEffect(() => {
        setdate(getFormattedDate());
        const getHomework = async () => {
            const token = await AsyncStorage.getItem("token");

            const data = await getstudentsbystandard(class1);
            console.log(data);
            setsubjectAssignments(data);
            setpageload(false);
        };
        getHomework();

        if (user) {
            console.log(user);
        }
    }, [user]);
    const navigate = async () => {

    }

    const filteredAssignments = subjectAssignments?.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <View className={`flex-1  h-full`}>
            {pageload ? (
                <View className={`flex justify-center items-center h-full`}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <ScrollView>

                    <View className={`flex-1 `}>
                        <View className={`w-full border-b border-gray-300`}>
                            <View className={`p-6`}>
                                <Text className=" leading-none" style={{ fontFamily: "Avant", textTransform: "uppercase", fontSize: 20 }}>
                                    {class1}-Students
                                </Text>

                                <Text className={"text-gray-600 text-base"} style={{ fontFamily: "Matter" }}>{date}</Text>

                            </View>
                        </View>
                        <View className="px-6 pt-6">
                            <View className="  relative">

                                <TextInput

                                    placeholder="Search by name"
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    className="py-2 pl-8  border caret-black border-gray-300 bg-[#F9FBFC] rounded-xl focus:border-[#205FFF] focus:outline-[#205FFF]"
                                />
                                <View className="absolute left-2 h-full flex justify-center ">
                                    <Search />
                                </View>
                            </View>
                        </View>

                        <View className={`flex-1 pt-4 px-4 pb-4`}>
                            {filteredAssignments &&
                                filteredAssignments.length > 0 ? (
                                <ScrollView className={`flex-col gap-8 flex py-4 `}>
                                    {filteredAssignments.map((item, index) => (
                                        <View
                                            key={item._id}
                                            className={clsx("flex   text-[#000000] overflow-hidden", index ===
                                                filteredAssignments.length - 1 &&
                                                `rounded-xl border-2 border-[#E2E4E8]`,
                                                index % 2 !== 0 &&
                                                `border-2 border-[#E2E4E8] rounded-xl `,
                                                index % 2 === 0 &&
                                                `rounded-xl border-2 border-[#E2E4E8]`,)}

                                        >
                                            <Card
                                                field="Name:"
                                                details={item?.name}
                                                bg={true}
                                            />
                                            <Card field="Roll-No:" details={item?.rollno} />
                                            <Card
                                                field="Class:"
                                                details={item?.class}
                                                bg={true}
                                            />
                                            <Text className="w-40 px-6 pt-6  text-[#737A82] font-medium text-[16px]" style={{ fontFamily: "Matter500", wordBreak: "break-word" }}>Academic:</Text>

                                            <View className="flex-row py-[16px] px-2 gap-[3.33%]  ">
                                                <TouchableOpacity
                                                    onPress={() => { navigation.navigate("student/attendence", { id: item._id }) }}
                                                    className="flex px-2 py-2 rounded-lg bg-[#17a2b8] min-w-[30%] max-w-[30%] items-center"
                                                >
                                                    <View className="flex justify-center items-center flex-row pt-2 w-full">
                                                        <Attendence color={"white"} />
                                                    </View>
                                                    <Text className="w-full text-center" style={{ fontFamily: "Matter500", color: "white", fontSize: 14 }}>
                                                        Attendance
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    onPress={() => { navigation.navigate("student/assessment", { id: item._id }) }}
                                                    className="flex px-2 py-2 rounded-lg bg-[#17a2b8] min-w-[30%] max-w-[30%] items-center"
                                                >
                                                    <View className="flex justify-center items-center flex-row pt-2 w-full">
                                                        <Assessment color={"white"} />
                                                    </View>
                                                    <Text className="w-full text-center" style={{ fontFamily: "Matter500", color: "white", fontSize: 14 }}>
                                                        Assessment
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    className="flex px-2 py-2 rounded-lg bg-[#17a2b8] min-w-[30%] max-w-[30%] items-center"
                                                >
                                                    <View className="flex justify-center items-center flex-row pt-2 w-full">
                                                        <Remark color={"white"} />
                                                    </View>
                                                    <Text className="w-full text-center" style={{ fontFamily: "Matter500", color: "white", fontSize: 14 }}>
                                                        Remark
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            ) : (
                                <View className={`flex-1 justify-center py-8 items-center`}>
                                    <Notavailable />
                                    <Text className="text-xl text-black" style={{

                                        fontFamily: "Inter-BoldItalic",
                                    }}>
                                        No Students available
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



export default Teacherstudentbyclass;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
        justifyContent: 'center',
        alignItems: 'center',

    },
});
