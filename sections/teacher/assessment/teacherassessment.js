import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';


import clsx from 'clsx';
import { useUser } from '../../../redux/userContext';
import getFormattedDate from '../../../utils/getFormattedDate';

const Teacherassessment = ({ }) => {
    const { state } = useUser();

    const navigation = useNavigation();
    const user = state.user;
    const [date, setdate] = useState(getFormattedDate());
    const [pageload, setpageload] = useState(false);
    const [activeTab, setActiveTab] = useState();


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
                                    Homework
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
                            {user?.teachingclass?.map((teachingClass, index) => (
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate("teacher/assessmentbyclass", { class1: teachingClass }), setActiveTab(teachingClass) }}
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
                            <TouchableOpacity
                                onPress={() => { navigation.navigate("teacher/assessmentbyclass", { class1: "Assigned" }), setActiveTab("Assigned") }}
                                className={clsx(`p-3 flex justify-center items-center py-[48px]  rounded-lg`, // Padding and rounded corners for the items
                                    activeTab === "Assigned" ? `bg-blue-500` : `bg-gray-600`,)}
                                style={


                                    {
                                        width: '48%', // Ensure two items per row with some space between them
                                        margin: '1%', // Margin for the gap between items
                                    }
                                }

                            >
                                <Text
                                    className="text-[20px] text-white"
                                    style={[

                                        { fontFamily: "Avant" },
                                    ]}
                                >
                                    Assigned
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => { navigation.navigate("teacher/addhomework"), setActiveTab("your") }}
                                className={clsx(`p-3 flex justify-center items-center py-[48px]  rounded-lg`, // Padding and rounded corners for the items
                                    activeTab === "your" ? `bg-blue-500` : `bg-gray-600`,)}
                                style={[
                                    // Background color based on active tab
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
                                    Add
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                </ScrollView>


            )
            }
        </View >
    )
};



export default Teacherassessment;