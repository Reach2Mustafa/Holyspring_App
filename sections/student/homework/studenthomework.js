import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";


import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "expo-router";
import Notavailable from "../../../assets/icons/notavailable";
import { useUser } from "../../../redux/userContext";
import getFormattedDate from "../../../utils/getFormattedDate";
import getstudenthomework from "../../../api/getstudenthomework";
import clsx from "clsx";
import formatDateAndDay from "../../../utils/formatDateAndDay";



const Studenthomework = ({ }) => {
    const { state } = useUser();

    const navigation = useNavigation();
    const user = state.user;
    const [date, setdate] = useState();
    const [pageload, setpageload] = useState(true);
    const [subjectAssignments, setsubjectAssignments] = useState();
    useEffect(() => {
        setdate(getFormattedDate());
        const getHomework = async () => {
            const token = await AsyncStorage.getItem("token");

            const data = await getstudenthomework(token);
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
                                    Homework
                                </Text>

                                <Text className={"text-gray-600 text-base"} style={{ fontFamily: "Matter" }}>{date}</Text>

                            </View>
                        </View>


                        <View className={`flex-1 pt-8 px-4 pb-4`}>
                            {subjectAssignments ? (
                                <View className=" border-[1px] rounded-3xl border-[#D9E1F1] ">
                                    <View
                                        className="flex flex-row   w-full  text-[#000000]  font-medium rounded-t-3xl  bg-[#FAFBFD] border-b-[1px] border-[#D9E1F1] py-4 "

                                    >
                                        <View className={`flex flex-row justify-center w-[30%] px-1`}>
                                            <Text className="font-medium text-base text-black" style={{ fontFamily: "Matter500" }}>

                                                S.No
                                            </Text>
                                        </View>

                                        <View className={`flex flex-row justify-center  w-[35%] px-1`}>
                                            <Text style={{ fontFamily: "Matter500", }}>
                                                Assigned date
                                            </Text>
                                        </View>

                                        <View className={`flex flex-row justify-center w-[35%] px-1`}>
                                            <Text style={{ fontFamily: "Matter500", }}>
                                                Subject
                                            </Text>
                                        </View>
                                    </View>
                                    <View className={` w-full`}>
                                        {subjectAssignments.slice()
                                            .reverse()
                                            .map((item, index) => (

                                                <TouchableOpacity
                                                    key={item._id}
                                                    onPress={() => { navigation.navigate("student/singlehomework", { id: item._id }) }}
                                                    className={clsx("flex flex-row     text-[#000000] py-6", index === subjectAssignments.length - 1 && `rounded-b-3xl`,
                                                        index % 2 != 0 && `bg-[#F9FBFC]`)}

                                                >
                                                    <View className={`flex flex-row justify-center px-1 w-[30%]`}>
                                                        <Text className="font-medium text-base text-black" style={{ fontFamily: "Matter", }}>{index + 1}</Text>
                                                    </View>
                                                    <View className={`flex flex-row justify-center px-1 w-[35%]`}>
                                                        <View className={`flex flex-col w-full`}>
                                                            <Text className="font-medium  text-[14.5px] text-black" style={{ fontFamily: "Matter", }}>{formatDateAndDay(item.updatedAt).date}</Text>

                                                            <Text className="font-medium text-[12.8px]   text-[#737A82]" style={{ fontFamily: "Matter", }}>
                                                                {formatDateAndDay(item.updatedAt).time}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View className={`flex flex-row justify-center w-[35%] px-1`}>
                                                        <Text className="font-medium  text-base" style={{ fontFamily: "Matter", }}>{item.subject}</Text>
                                                    </View>
                                                </TouchableOpacity>




                                            ))}
                                    </View>

                                </View>
                            ) : (
                                <View className={`flex-1 justify-center py-8 items-center`}>
                                    <Notavailable />
                                    <Text className="text-xl text-black" style={{

                                        fontFamily: "Avant",
                                    }}>
                                        No Homework available
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



export default Studenthomework;
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
