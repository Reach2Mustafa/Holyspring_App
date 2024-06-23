import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
    ToastAndroid,
} from "react-native";
import { ScrollView } from "react-native";

import Email from "../../../assets/icons/email";
import Call from "../../../assets/icons/call";
import Date from "../../../assets/icons/date";
import Class from "../../../assets/icons/class";
import Eye from "../../../assets/icons/eye";
import Eyeslash from "../../../assets/icons/eyeslash";
import clsx from "clsx";
import { useUser } from "../../../redux/userContext";
import { useRoute } from "@react-navigation/native";
import ChangeStudentPassword from "../../../api/changestudentpassword";
import getStudentById from "../../../api/getstudentbyid";
import ChangeStudentPasswordByadmin from "../../../api/changestudentpassbyadmin";
import Profile from "../../../assets/icons/profile";
import EditIcon from "../../../assets/icons/editpencil";
import CloseIcon from "../../../assets/icons/closeicon";
import DoneIcon from "../../../assets/icons/doneicon";
import ChangeStudentName from "../../../api/changestudentname";

const StudentprofileAdmin = ({ }) => {
    const route = useRoute();
    const { id } = route.params;
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [oldpassword, setoldPassword] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [isEmpty, setIsEmpty] = useState(0);
    const [loading, setLoading] = useState(false);

    const changePassword = async () => {
        console.log(oldpassword, newpassword);
        if (oldpassword !== newpassword) {
            setIsEmpty(1);
            ToastAndroid.show("Please enter same password.", ToastAndroid.SHORT);
            return;
        }
        setLoading(true);
        const Changenewpassword = await ChangeStudentPasswordByadmin(
            id,
            newpassword
        );
        if (Changenewpassword.error) {
            setLoading(false);
            return ToastAndroid.show(Changenewpassword.error, ToastAndroid.SHORT);
        }
        setLoading(false);
        ToastAndroid.show(Changenewpassword.message, ToastAndroid.SHORT);
        setoldPassword("");
        setnewpassword("");
    };
    const [activeTab, setActiveTab] = useState("Profile");
    const [user, setuser] = useState("");
    const [pageload, setpageload] = useState(true);

    const [editingName, setEditingName] = useState(false);
    const [editedName, setEditedName] = useState("");

    const handleNameEdit = async () => {
        if (editedName.trim() === "") {
            ToastAndroid.show("Name cannot be empty.", ToastAndroid.SHORT);
            return;
        }
        const changename = await ChangeStudentName(id, editedName)
        if (changename.error) {
            return ToastAndroid.show(changename.error, ToastAndroid.SHORT);
        }

        setuser((prevUser) => ({ ...prevUser, name: editedName }));
        setEditingName(false);
        ToastAndroid.show("Name updated successfully.", ToastAndroid.SHORT);
    };

    useEffect(() => {
        const getStudent = async () => {
            const data = await getStudentById(id);
            if (data.error) {
                return ToastAndroid.show(data.error, ToastAndroid.SHORT);
            }
            setuser(data);
            setEditedName(data.name);
            setpageload(false);
        };
        getStudent();
    }, []);

    return (
        <View className={`flex-1`}>
            {pageload ? (
                <View className={`flex justify-center items-center h-full`}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <View className={`pt-16 px-4 `}>
                    <View className={`flex-row mb-4 gap-4`}>
                        <TouchableOpacity
                            className={clsx(
                                "flex-1 items-center py-2 rounded-lg",
                                activeTab === "Profile" ? `bg-blue-500` : `bg-[#6C6C6C]`
                            )}
                            onPress={() => setActiveTab("Profile")}
                        >
                            <Text
                                className="text-lg text-white"
                                style={{
                                    fontFamily: "Avant",
                                }}
                            >
                                Profile
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={clsx(
                                "flex-1 items-center py-2 rounded-lg",
                                activeTab === "Password" ? `bg-blue-500` : `bg-[#6C6C6C]`
                            )}
                            onPress={() => setActiveTab("Password")}
                        >
                            <Text
                                className="text-lg text-white"
                                style={{
                                    fontFamily: "Avant",
                                }}
                            >
                                Password
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {activeTab == "Profile" ? (
                        <ScrollView>
                            <View className={` `}>
                                <View className={`pt-8 `}>
                                    <View className="border-[1px] border-[#E2E4E8] px-4 py-5 rounded-xl bg-[#FAFBFD]">
                                        <View className={`flex flex-row  items-center gap-4 `}>
                                            <View
                                                className={`rounded-full  h-[60px] w-[60px]  bg-black text-white text-[18px] 2xl:text-[32px] font-semibold flex justify-center items-center`}
                                            >
                                                <Text className="text-white font-semibold uppercase text-[32px]">
                                                    {user?.name?.[0]}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text
                                                    className="text-[#3F3F3F] uppercase text-[20px] font-semibold"
                                                    style={{
                                                        fontFamily: "Matter500",
                                                    }}
                                                >
                                                    {user?.name.split(" ")[0]}
                                                </Text>
                                                <Text
                                                    className="text-[14.5px] font-normal text-[#858585]"
                                                    style={{
                                                        fontFamily: "Matter",
                                                    }}
                                                >
                                                    {user?.class} Class
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View className={`pt-8`}>
                                    <View className={`border border-[#E2E4E8] px-4 py-2 rounded-xl bg-[#FAFBFD]`}>
                                        <View className={`flex flex-row justify-between pt-5`}>
                                            <Text
                                                className="text-[20px] text-[#16191D] font-medium"
                                                style={{ fontFamily: "Matter500" }}
                                            >
                                                Personal information
                                            </Text>
                                        </View>
                                        <View className={` w-full py-6`}>
                                            <View className={`flex flex-row gap-3 pt-6`}>
                                                <View className={`pt-1`}>
                                                    <Profile />
                                                </View>
                                                <View className={`text-[15.2px] w-full`}>
                                                    {editingName ? (
                                                        <View className="flex flex-row   gap-8">
                                                            <TextInput
                                                                autoFocus
                                                                value={editedName}
                                                                onChangeText={setEditedName}
                                                                className="  text-[16px] text-[#2E303A] h-[21.25px]   "
                                                                style={{ fontFamily: "Matter500" }}

                                                            />
                                                            <TouchableOpacity onPress={handleNameEdit}>
                                                                <DoneIcon />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => setEditingName(false)}>
                                                                <CloseIcon />
                                                            </TouchableOpacity>
                                                        </View>
                                                    ) : (
                                                        <View className="flex flex-row w-full items-center gap-16">
                                                            <Text
                                                                className="text-[#2E303A]   text-[16px]"
                                                                style={{ fontFamily: "Matter500" }}
                                                            >
                                                                {user?.name}
                                                            </Text>
                                                            <TouchableOpacity onPress={() => setEditingName(true)}>
                                                                <EditIcon />
                                                            </TouchableOpacity>
                                                        </View>
                                                    )}
                                                    <Text
                                                        style={{
                                                            color: `#737A82`,
                                                            fontFamily: "Matter",
                                                        }}
                                                    >
                                                        Student Name
                                                    </Text>
                                                </View>
                                            </View>
                                            <View className={`flex flex-row gap-3 pt-6`}>
                                                <View className={`pt-1`}>
                                                    <Email />
                                                </View>
                                                <View className={`text-[15.2px] w-max`}>
                                                    <Text
                                                        className="text-[#2E303A] font-semibold text-[16px]"
                                                        style={{
                                                            fontFamily: "Matter500",
                                                        }}
                                                    >
                                                        {user?.rollno}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            color: `#737A82`,
                                                            fontFamily: "Matter",
                                                        }}
                                                    >
                                                        Student ID
                                                    </Text>
                                                </View>
                                            </View>
                                            <View className={`flex flex-row gap-3 pt-6`}>
                                                <View className={`pt-1`}>
                                                    <Call />
                                                </View>
                                                <View className={`text-[15.2px]`}>
                                                    <Text
                                                        className="text-[#2E303A] font-semibold text-[16px]"
                                                        style={{
                                                            fontFamily: "Matter500",
                                                        }}
                                                    >
                                                        {user?.phone}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            color: `#737A82`,
                                                            fontFamily: "Matter",
                                                        }}
                                                    >
                                                        Phone Number
                                                    </Text>
                                                </View>
                                            </View>
                                            <View className={`flex flex-row gap-3 pt-6`}>
                                                <View className={`pt-1`}>
                                                    <Class />
                                                </View>
                                                <View className={`text-[15.2px]`}>
                                                    <Text
                                                        className="text-[#2E303A] font-semibold text-[16px]"
                                                        style={{
                                                            fontFamily: "Matter500",
                                                        }}
                                                    >
                                                        {user?.class}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            color: `#737A82`,
                                                            fontFamily: "Matter",
                                                        }}
                                                    >
                                                        Grade
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    ) : (
                        <View className={`pt-8`}>
                            <View
                                className={`border border-[#E2E4E8] px-4 py-2 rounded-xl bg-[#FAFBFD]`}
                            >
                                <View className={`flex flex-row justify-between pt-5`}>
                                    <Text
                                        className="text-[20px] text-[#16191D] font-medium"
                                        style={{ fontFamily: "Matter500" }}
                                    >
                                        Change Password
                                    </Text>
                                </View>
                                <View className={`py-6`}>
                                    <View className={`flex flex-row gap-3`}>
                                        <View className={`pt-1`}>
                                            <Eye />
                                        </View>
                                        <View className={`text-[15.2px]`}>
                                            <TextInput
                                                ref={passwordRef}
                                                value={oldpassword}
                                                onChangeText={setoldPassword}
                                                secureTextEntry={!showPassword}
                                                placeholder="Old Password"
                                                className={`border border-[#E2E4E8] rounded-lg px-4 py-2`}
                                            />
                                        </View>
                                    </View>
                                    <View className={`flex flex-row gap-3 pt-6`}>
                                        <View className={`pt-1`}>
                                            <Eyeslash />
                                        </View>
                                        <View className={`text-[15.2px]`}>
                                            <TextInput
                                                ref={passwordRef}
                                                value={newpassword}
                                                onChangeText={setnewpassword}
                                                secureTextEntry={!showPassword}
                                                placeholder="New Password"
                                                className={`border border-[#E2E4E8] rounded-lg px-4 py-2`}
                                            />
                                        </View>
                                    </View>
                                    <View className={`flex flex-row gap-3 pt-6`}>
                                        <TouchableOpacity
                                            onPress={changePassword}
                                            className={`bg-blue-500 rounded-lg py-2 px-4`}
                                        >
                                            {loading ? (
                                                <ActivityIndicator size="small" color="#fff" />
                                            ) : (
                                                <Text
                                                    className="text-white text-center"
                                                    style={{ fontFamily: "Matter500" }}
                                                >
                                                    Change Password
                                                </Text>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
};

export default StudentprofileAdmin;
