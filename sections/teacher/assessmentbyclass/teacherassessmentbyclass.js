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
import getassessmentbyclass from "../../../api/getassessmentbyclass";
import { useRoute } from "@react-navigation/native";
import getassignedassessment from "../../../api/getassignedassessment";


const Teacherassessmentbyclass = ({ }) => {
    const { state } = useUser();
    const [activeTab, setActiveTab] = useState("pending");
    const navigation = useNavigation();
    const user = state.user;
    const [date, setdate] = useState();
    const [pageload, setpageload] = useState(true);
    const [subjectAssignments, setsubjectAssignments] = useState();

    const route = useRoute();

    const { class1 } = route.params;
    useEffect(() => {
        setdate(getFormattedDate());
        const getAssignmentBySubject = async () => {
            if (class1 == "Assigned") {
                const data = await getassignedassessment();

                setsubjectAssignments(data);
            }
            else {

                const data = await getassessmentbyclass(class1);

                setsubjectAssignments(data);
            }
            setpageload(false);
        };
        getAssignmentBySubject();
    }, [user]);

    const Card = ({ field, details, bg }) => {
        return (
            <View className={clsx("flex-row w-full px-6 py-6", bg ? "bg-[#F9FBFC]" : "")} >
                <Text className="w-32 text-[#737A82] font-medium text-[16px]" style={{ fontFamily: "Matter500", wordBreak: "break-word" }}>{field}</Text>
                <Text className="text-[16px] w-[60%]" style={{ fontFamily: "Matter", wordBreak: "break-word" }}>{details}</Text>
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
                                    {class1}-Assessment
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

                        <View className={`flex-1 h-full pt-4 px-4 pb-4`}>
                            {subjectAssignments?.length > 0 ? (




                                <View className=" h-full">
                                    {subjectAssignments &&
                                        subjectAssignments?.length > 0 ? (
                                        <ScrollView className={`flex-col gap-8 flex py-4 `}>
                                            {subjectAssignments.map((item, index) => (

                                                <TouchableOpacity onPress={() => { navigation.navigate("teacher/singleassessment", { id: item._id }) }}
                                                    key={item._id}
                                                    className={clsx("flex   text-[#000000] overflow-hidden", index ===
                                                        subjectAssignments?.length - 1 &&
                                                        `rounded-xl border-2 border-[#E2E4E8]`,
                                                        index % 2 !== 0 &&
                                                        `border-2 border-[#E2E4E8] rounded-xl `,
                                                        index % 2 === 0 &&
                                                        `rounded-xl border-2 border-[#E2E4E8]`,)}

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
                                                        details={formatDateAndDay(item?.updatedAt).date}
                                                        bg={true}
                                                    />
                                                    <Card
                                                        field="Assigned time:"
                                                        details={formatDateAndDay(item?.updatedAt).time}
                                                    />

                                                </TouchableOpacity>
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
                                                No  Assessment
                                            </Text>
                                        </View>
                                    )}
                                </View>


                            ) : (
                                <View className={`flex-1 justify-center py-12 items-center`}>
                                    <Notavailable />
                                    <Text
                                        className="text-lg text-[#3B3B3B"
                                        style={{

                                            fontFamily: "Avant",
                                        }}
                                    >
                                        No  Assessment
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

export default Teacherassessmentbyclass;
