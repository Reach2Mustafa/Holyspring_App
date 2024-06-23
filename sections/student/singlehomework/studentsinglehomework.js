import React, { useEffect, useRef, useState } from "react";
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
    TextInput,
    ToastAndroid,
} from "react-native";

import { useRoute } from "@react-navigation/native";
import { useUser } from "../../../redux/userContext";
import getFormattedDate from "../../../utils/getFormattedDate";
import gethomeworkbyId from "../../../api/gethomeworkbyId";
import clsx from "clsx";
import formatDateAndDay from "../../../utils/formatDateAndDay";
import { IMAGE_BASE_URL } from "../../../api/variables";
import gethomeworkbyIdteacher from "../../../api/gethomeworkbyidteacher";
import Edithomeworkteacher from "../../../api/Edithomeworkteacher";
import deletehomeworkbyId from "../../../api/deletehomeworkteacher";
import Edit from "../../../assets/icons/edit";
import Save from "../../../assets/icons/save";
import Delete from "../../../assets/icons/delete";
import { router } from "expo-router";
import gethomeworkbyIdadmin from "../../../api/gethomeworkbyidadmin";
import deletehomeworkbyIdadmin from "../../../api/deletehomeworkbyidadmin";
import Edithomeworkadmin from "../../../api/edithomeworkadmin";

const Card = ({ field, details, bg }) => {
    return (
        <View className={clsx("flex-row w-full px-6 py-6", bg ? "bg-[#F9FBFC]" : "")} >
            <Text className="w-32 text-[#737A82] font-medium text-[16px] leading-5" style={{ fontFamily: "Matter500", wordBreak: "break-word" }}>{field}</Text>
            <Text className="text-[16px] w-[60%] leading-5" style={{ fontFamily: "Matter", wordBreak: "break-word" }}>{details}</Text>
        </View>
    );
};
const Studentsinglehomework = ({ }) => {
    const [pageload, setPageload] = useState(true); // Corrected useState typo
    const [details, setdetails] = useState();
    const { state } = useUser();
    const [description, setDescription] = useState();
    const [edit, setedit] = useState(false);
    const ref = useRef()

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
        if (edit && ref.current) {
            ref.current.focus();
        }
    }, [edit]);
    useEffect(() => {
        const assignment = async () => {
            setdate(getFormattedDate());
            if (id != null) {
                if (user.usertype == "student") {

                    const data = await gethomeworkbyId(id);
                    setDescription(data?.description)
                    setdetails(data);
                }
                else if (user.usertype == "teacher") {
                    const data = await gethomeworkbyIdteacher(id)
                    setdetails(data);
                    setDescription(data?.description)
                }
                else if (user.usertype == "admin") {
                    const data = await gethomeworkbyIdadmin(id)
                    setdetails(data);
                    setDescription(data?.description)
                }

                setPageload(false);
            }
        };
        assignment();
    }, [id]);
    const editting = async () => {
        if (description) {
            if (user.usertype == "teacher") {
                const data = await Edithomeworkteacher(id, description)
                if (!data.error) {
                    setdetails(data);
                    setedit(false)
                    ToastAndroid.show("Homework Updated", ToastAndroid.SHORT);
                }
                else {
                    ToastAndroid.show("Something went wrong try again", ToastAndroid.SHORT);

                }
            }
            if (user.usertype == "admin") {
                const data = await Edithomeworkadmin(id, description)
                if (!data.error) {
                    setdetails(data);
                    setedit(false)
                    ToastAndroid.show("Homework Updated", ToastAndroid.SHORT);
                }
                else {
                    ToastAndroid.show("Something went wrong try again", ToastAndroid.SHORT);

                }
            }


        }
        else {
            ToastAndroid.show("Invalid Description", ToastAndroid.SHORT);
        }
    }
    const Delete1 = async () => {
        if (user.usertype == "teacher") {
            const data = await deletehomeworkbyId(id)
            if (!data.error) {
                ToastAndroid.show("Homework Deleted", ToastAndroid.SHORT);

                router.navigate("/teacher/home");
            }
            else {
                ToastAndroid.show("Something went wrong try again", ToastAndroid.SHORT);

            }
        }
        if (user.usertype == "admin") {
            const data = await deletehomeworkbyIdadmin(id)
            if (!data.error) {
                ToastAndroid.show("Homework Deleted", ToastAndroid.SHORT);

                router.back();
            }
            else {
                ToastAndroid.show("Something went wrong try again", ToastAndroid.SHORT);

            }
        }
    }
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

                                <View className={`flex-row w-full px-6 py-6 bg-[#F9FBFC]`}>
                                    <Text
                                        className="w-32 text-[#737A82] font-medium text-[16px]"
                                        style={{

                                            fontFamily: 'Matter500',
                                            wordBreak: 'break-word',
                                        }}
                                    >
                                        Description
                                    </Text>
                                    {edit ? (
                                        <TextInput
                                            ref={ref}
                                            className="text-[16px] h-max w-[60%]"
                                            style={{
                                                fontFamily: 'Matter',
                                                wordBreak: 'break-word',


                                            }}
                                            multiline={true}
                                            value={description}
                                            onChangeText={setDescription}
                                        />
                                    ) : (
                                        <Text
                                            className="text-[16px] w-[60%]"
                                            style={{
                                                fontFamily: 'Matter',
                                                wordBreak: 'break-word',

                                            }}
                                        >
                                            {details?.description}
                                        </Text>
                                    )}
                                </View>
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
            {user.usertype == "teacher" && user._id == details?.teacher?._id && <View className="px-4 pb-4">

                <View className={`flex  flex-row justify-between  border-[1px] border-[#E4E4E5] rounded-full px-2 py-2 items-center`}>


                    <TouchableOpacity onPress={() => { Delete1() }}><Delete /></TouchableOpacity>

                    {
                        edit ?
                            <View className={` flex items-center flex-row gap-4`}>

                                <TouchableOpacity className={` `} onPress={() => { setedit(false) }}>
                                    <Text className={`text-[16px] text-[#F42F4E] underline `} style={{ fontFamily: "Matter500" }}>Abort</Text>

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { editting() }}><Save /></TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity onPress={() => { setedit(true) }}><Edit /></TouchableOpacity>

                    }


                </View>
            </View>}
            {user.usertype == "admin" && <View className="px-4 pb-4">

                <View className={`flex  flex-row justify-between  border-[1px] border-[#E4E4E5] rounded-full px-2 py-2 items-center`}>


                    <TouchableOpacity onPress={() => { Delete1() }}><Delete /></TouchableOpacity>

                    {
                        edit ?
                            <View className={` flex items-center flex-row gap-4`}>

                                <TouchableOpacity className={` `} onPress={() => { setedit(false) }}>
                                    <Text className={`text-[16px] text-[#F42F4E] underline `} style={{ fontFamily: "Matter500" }}>Abort</Text>

                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { editting() }}><Save /></TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity onPress={() => { setedit(true) }}><Edit /></TouchableOpacity>

                    }


                </View>
            </View>}

        </View>
    );
};



export default Studentsinglehomework;
