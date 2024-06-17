import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { useUser } from "../../../redux/userContext";
import getFormattedDate from "../../../utils/getFormattedDate";
import getdashboarddata from "../../../api/getdashboard";
import DashboardCard from "../../../components/dashboardcard";
import AttendanceCard from "../../../components/attendencecard";



const Dashboard = ({ }) => {
    const [date, setDate] = useState(getFormattedDate());
    const [loading, setLoading] = useState(true);
    const [data, setdata] = useState();
    const { state } = useUser();
    const user = state.user;
    useEffect(() => {
        const getData = async () => {
            const data1 = await getdashboarddata();

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
                                    Student Name:
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
                                    <Text
                                        className="text-gray-600 text-base"
                                        style={{
                                            fontFamily: "Matter",

                                        }}
                                    >
                                        Class-{user?.class}
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

                                <DashboardCard
                                    name={"Homework"}
                                    submitted={data?.homeworkData?.thisMonth}
                                    total={data?.homeworkData?.total}
                                    name1={"Total Homework"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>

                                <DashboardCard
                                    name={"Remarks"}
                                    submitted={data?.remarkdata?.thisMonth}
                                    total={data?.remarkdata?.total}
                                    name1={"Total Remarks"}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>

                                <DashboardCard
                                    name={"Assessment"}
                                    submitted={data?.assessmentData?.submitted}
                                    total={data?.assessmentData?.total}

                                    name1={"Assessment Completed"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity>

                                <AttendanceCard
                                    present={data.attendanceData?.present}
                                    absent={data.attendanceData?.absent}
                                    late={data.attendanceData?.late}
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
        fontFamily: "Matter",
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 20,
    },
    content: {
        marginTop: 16,
    },
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    dataLabel: {
        fontFamily: "Matter",
        fontSize: 16,
        color: '#8A8A8A',
    },
    dataValue: {
        fontFamily: "Matter",
        fontSize: 16,
    },
});

export default Dashboard;
