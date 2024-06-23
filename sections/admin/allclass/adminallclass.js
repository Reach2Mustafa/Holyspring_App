import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';


import clsx from 'clsx';
import { useUser } from '../../../redux/userContext';
import getFormattedDate from '../../../utils/getFormattedDate';
import { useRoute } from "@react-navigation/native";


const Adminallclass = ({ }) => {
    const { state } = useUser();
    const route = useRoute();

    const { callback } = route.params;
    const navigation = useNavigation();
    const user = state.user;
    const [date, setdate] = useState(getFormattedDate());
    const [pageload, setpageload] = useState(false);
    const [activeTab, setActiveTab] = useState();

    const classes = [
        "NURA", "LKGA", "UKGA",
        "1A", "1B", "2A", "2B",
        "3A", "3B", "4A", "4B",
        "5A", "5B", "6A", "6B",
        "7A", "7B", "8A", "8B",
        "9A", "9B", "10A", "10B"
    ]

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
                                <Text style={{ fontFamily: "Avant", fontFeatures: [{ "salt": 1 }], textTransform: "uppercase", fontWeight: "bold", fontSize: 20 }}>
                                    Select The class
                                </Text>

                                <Text className="text-gray-600 text-base" style={{ fontFamily: "Matter" }}>{date}</Text>

                            </View>
                        </View>
                        <View
                            className="px-6 py-4"
                            style={{

                                flexDirection: "row",
                                flexWrap: "wrap",
                            }}
                        >
                            {classes.map((teachingClass, index) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (callback == "students") { navigation.navigate("teacher/studentbyclass", { class1: teachingClass }) }
                                        else if (callback == "teacher") {
                                            navigation.navigate("admin/teachers", { class1: teachingClass })
                                        }
                                        else if (callback == "chat") {
                                            navigation.navigate("chat", { group: teachingClass })
                                        } setActiveTab(teachingClass)
                                    }}
                                    key={index}
                                    className={clsx(`p-3 flex justify-center items-center py-[48px]  rounded-lg`,
                                        activeTab === teachingClass ? `bg-blue-500` : `bg-gray-600`,)}
                                    style={[

                                        {
                                            width: '48%', // Ensure two items per row with some space between them
                                            margin: '1%', // Margin for the gap between items
                                        }
                                    ]}

                                >
                                    <Text
                                        className="text-[20px] text-white"
                                        style={[

                                            { fontFamily: "Avant" },
                                        ]}
                                    >
                                        {teachingClass}
                                    </Text>
                                </TouchableOpacity>

                            ))}


                        </View>

                    </View>

                </ScrollView>


            )
            }
        </View >
    )
};



export default Adminallclass;