import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { useUser } from "../../../redux/userContext";
import getFormattedDate from "../../../utils/getFormattedDate";
import getdashboarddata from "../../../api/getdashboard";
import getTeacherDashboardData from "../../../api/getteacherdashboard";
import DashboardCard from "../../../components/dashboardcard";





const Dashboard = ({ }) => {
    const [date, setDate] = useState(getFormattedDate());
    const [loading, setLoading] = useState(true);
    const [data, setdata] = useState();
    const { state } = useUser();
    const user = state.user;
    useEffect(() => {
        const getData = async () => {
            const data1 = await getTeacherDashboardData();

            setdata(data1);
            setLoading(false);
        };
        getData();
    }, [user]);
    return (
        <View className={`flex-1  h-full`}>
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
                                    className="text-gray-600 text-base "
                                    style={{
                                        fontFamily: "Matter",

                                    }}
                                >
                                    Teacher Name:
                                </Text>
                                <View className={`flex flex-row gap-2 items-end`}>

                                    <Text
                                        style={{
                                            fontFamily: "Avant",

                                            textTransform: "uppercase",
                                            fontSize: 20,
                                        }}
                                    >
                                        {user?.name}
                                    </Text>

                                </View>

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
                        <View className={`py-4  flex flex-col gap-4 h-max`}>
                            <TouchableOpacity>
                                <View className={`flex-1 overflow-hidden px-4`}>

                                    <View className="h-full w-full p-6 rounded-3xl border border-[#F1F1F1] bg-[#FAFAFC] flex flex-col justify-between">
                                        <Text className="font-medium pb-4 text-lg leading-none" style={{ fontFamily: "Matter500" }}>Basic Info</Text>
                                        <View style={styles.dataContainer}>
                                            <Text style={styles.dataLabel}>Classes:</Text>
                                         
                                                <View
                                                    className="   max-w-[200px]  gap-1"
                                                    style={{
                                                        wordbreak: "break-word",
                                                        display: "flex ",
                                                        flexDirection: "row",
                                                        flexWrap: "wrap",
                                                    }}
                                                >

                                                    {user?.teachingclass?.map((teachingClass, index) => (
                                                        <Text
                                                            key={index}
                                                            className="text-gray-600 text-base"
                                                            style={{
                                                                fontFamily: "Matter",

                                                            }}
                                                        >
                                                            {teachingClass} 
                                                        </Text>
                                                    ))}
                                                </View>
                                           
                                        </View>
                                        <View style={styles.dataContainer}>
                                            <Text style={styles.dataLabel}>Subjects</Text>
                                            <Text style={styles.dataValue}> <View
                                                className="  gap-1"
                                                style={{

                                                    display: "flex",
                                                    flexDirection: "row",
                                                    flexWrap: "wrap",
                                                }}
                                            >

                                                {user?.subjects?.map((teachingClass, index) => (
                                                    <Text
                                                        key={index}
                                                        className="text-gray-600 text-base"
                                                        style={{
                                                            fontFamily: "Matter",

                                                        }}
                                                    >
                                                        {teachingClass}
                                                    </Text>

                                                ))}
                                            </View></Text>
                                        </View>
                                    </View>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity>

                                <DashboardCard
                                    name={"Homework"}
                                    submitted={data?.homeworks?.thisMonth}
                                    total={data?.homeworks?.total}
                                    name1={"Total Homework"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>


                                <DashboardCard
                                    name={"Remarks"}
                                    submitted={data?.remarks?.thisMonth}
                                    total={data?.remarks?.total}
                                    name1={"Total Remarks"}
                                />

                            </TouchableOpacity>

                            <TouchableOpacity>

                                <DashboardCard
                                    teacher={true}
                                    name={"Assessment"}
                                    submitted={data?.assessments?.thisMonth}
                                    total={data?.assessments?.total}
                                    name1={"Assessment Completed"}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {

        padding: 24,
        borderRadius: 24,
        borderColor: '#F1F1F1',
        borderWidth: 1,
        backgroundColor: '#FAFAFC',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: "Matter500",
        fontSize: 20,
        lineHeight: 20,
    },
    content: {
        marginTop: 16,
    },
    dataContainer: {
        width:"100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    dataLabel: {
        fontFamily: "Matter500",
        fontSize: 16,
        color: '#8A8A8A',
    },
    dataValue: {
        fontFamily: "Matter",
        fontSize: 16,
    },
});


export default Dashboard;
