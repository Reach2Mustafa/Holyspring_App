import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
    Linking,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal,
} from "react-native";

import { useRoute } from "@react-navigation/native";
import { useUser } from "../../../redux/userContext";
import getFormattedDate from "../../../utils/getFormattedDate";
import gethomeworkbyId from "../../../api/gethomeworkbyId";
import clsx from "clsx";
import formatDateAndDay from "../../../utils/formatDateAndDay";
import { IMAGE_BASE_URL } from "../../../api/variables";


const Card = ({ field, details, bg }) => {
    return (
        <View className={clsx("flex-row w-full px-6 py-6", bg ? "bg-[#F9FBFC]" : "")} >
            <Text className="w-32 text-[#737A82] font-medium text-[16px]" style={{ fontFamily: "Matter500", wordBreak: "break-word" }}>{field}</Text>
            <Text className="text-[16px] w-[60%]" style={{ fontFamily: "Matter", wordBreak: "break-word" }}>{details}</Text>
        </View>
    );
};
const Studentsinglehomework = ({ }) => {
    const [pageload, setPageload] = useState(true); // Corrected useState typo
    const [details, setdetails] = useState();
    const { state } = useUser();


    const user = state.user;
    const [date, setdate] = useState();
    const route = useRoute();
    const { id } = route.params;
    const [fullScreenImage, setFullScreenImage] = useState(null);
    const handleViewFile = async () => {
        try {
            await Linking.openURL(
                IMAGE_BASE_URL + details?.document
            );
        } catch (error) {
            console.error("Error opening link:", error);
        }
    };
    useEffect(() => {
        const assignment = async () => {
            setdate(getFormattedDate());
            if (id != null) {
                const data = await gethomeworkbyId(id);

                setdetails(data);

                setPageload(false);
            }
        };
        assignment();
    }, [id]);
    return (
        <View className={`flex-1 `}>
            {pageload ? (
                <View className={`flex justify-center items-center h-full`}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <ScrollView className={`flex-1  `}>
                    <View className={`w-full border-b border-gray-300`}>
                        <View className={`p-6`}>
                            <Text style={{ fontFamily: "Avant", fontFeatures: [{ "salt": 1 }], textTransform: "uppercase", fontWeight: "bold", fontSize: 20 }}>
                                Homework details
                            </Text>

                            <Text className={"text-gray-600 text-base"} style={{ fontFamily: "Matter", }}>{date}</Text>

                        </View>
                    </View>
                    <View className={`relative flex-1`}>

                        <View className={`p-6`}>

                            <View
                                className={`border border-gray-300 my-6 rounded-xl overflow-hidden`}
                            >
                                <Card
                                    field="Description:"
                                    details={details?.description}
                                    bg={true}
                                />
                                <Card field="Subject:" details={details?.subject} />
                                <Card
                                    field="Class:"
                                    details={details?.class}
                                    bg={true}
                                />
                                <Card field="Assigned by:" details={details?.teacher?.name} />
                                <Card
                                    bg={true}
                                    field="Assigned date:"
                                    details={formatDateAndDay(details?.updatedAt).date}
                                />
                                <Card
                                    field="Assigned time:"
                                    details={formatDateAndDay(details?.updatedAt).time}
                                />
                                {details?.document && <View className={clsx("flex-row w-full bg-[#F9FBFC] px-6 py-6",)} >
                                    <Text className="w-32 text-[#737A82] font-medium text-[16px]" style={{ fontFamily: "Matter500", wordBreak: "break-word" }}>Attachment</Text>
                                    <Text onPress={() => setFullScreenImage(details?.document.replace("public", "/"))} className="text-[14px] bg-[#205FFF] text-white w-max px-4 py-1.5 pb-2.5 rounded-full " style={{ fontFamily: "Matter", wordBreak: "break-word" }}>
                                        View
                                    </Text>
                                </View>}

                            </View>

                            <Modal visible={fullScreenImage !== null} transparent={true}>
                                <View className="flex-1 justify-center items-center bg-black" >
                                    <TouchableOpacity
                                        className="absolute top-4 right-4 z-10"

                                        onPress={() => setFullScreenImage(null)}
                                    >
                                        <Text className="text-white text-lg" >&#10005;</Text>
                                    </TouchableOpacity>
                                    <Image
                                        source={{
                                            uri:
                                                IMAGE_BASE_URL +
                                                fullScreenImage,
                                        }}
                                        style={{ width: "100%", height: "100%" }}
                                        resizeMode="contain"
                                    />
                                </View>
                            </Modal>
                        </View>
                    </View>
                </ScrollView>
            )}
        </View>
    );
};



export default Studentsinglehomework;
