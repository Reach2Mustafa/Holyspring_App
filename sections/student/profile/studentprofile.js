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
import ChangeStudentPassword from "../../../api/changestudentpassword";

const Studentprofile = ({ }) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [oldpassword, setoldPassword] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [isEmpty, setIsEmpty] = useState(0);
    const [loading, setLoading] = useState(false);

    const changePassword = async () => {
        console.log(oldpassword, newpassword);
        if (oldpassword.trim().length <= 0) {
            setIsEmpty(1);
            return;
        }
        if (newpassword.trim().length <= 5) {
            setIsEmpty(2);
            ToastAndroid.show("Password must contain minimun 6 letters.", ToastAndroid.SHORT)
            return;
        }
        setLoading(true)
        const Changenewpassword = await ChangeStudentPassword(oldpassword, newpassword)
        if (Changenewpassword.error) {
            setLoading(false)
            return ToastAndroid.show(Changenewpassword.error, ToastAndroid.SHORT)
        }
        setLoading(false)
        ToastAndroid.show(Changenewpassword.message, ToastAndroid.SHORT)
        setoldPassword("")
        setnewpassword("")
    };
    const [activeTab, setActiveTab] = useState("Profile");
    const { state } = useUser();
    const user = state.user;
    const [pageload, setpageload] = useState(true);
    useEffect(() => {
        if (user) {
            setpageload(false);
        }
    }, [user]);
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
                            className={clsx("flex-1 items-center py-2 rounded-lg", activeTab === "Profile" ? `bg-blue-500` : `bg-[#6C6C6C]`)}

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
                            className={clsx("flex-1 items-center py-2 rounded-lg", activeTab === "Password" ? `bg-blue-500` : `bg-[#6C6C6C]`)}

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

                                        <View
                                            className={`flex flex-row  items-center gap-4 `}
                                        >
                                            <View
                                                className={`rounded-full  px-5 py-2 bg-black text-white text-[20px] 2xl:text-[32px] font-semibold flex justify-center items-center`}
                                            >
                                                <Text
                                                    className="text-white font-semibold uppercase text-[32px]"

                                                >
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
                                    <View
                                        className={`border border-[#E2E4E8] px-4 py-2 rounded-xl bg-[#FAFBFD]`}
                                    >
                                        <View className={`flex flex-row justify-between pt-5`}>
                                            <Text
                                                className="text-[20px] text-[#16191D] font-medium"
                                                style={{ fontFamily: "Matter500", }}
                                            >
                                                Personal information
                                            </Text>
                                        </View>
                                        <View className={`grid grid-cols-2 py-6`}>
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
                                                            color: `text-[#737A82]`,
                                                            fontFamily: "Matter",
                                                        }}
                                                    >Student ID
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
                                                            color: `text-[#737A82]`,
                                                            fontFamily: "Matter",
                                                        }}
                                                    >
                                                        Phone Number
                                                    </Text>
                                                </View>
                                            </View>
                                            {/* <View className={`flex flex-row gap-3 pt-12`}>
                                                <View className={`pt-1`}>
                                                    <Date />
                                                </View>
                                                <View className={`text-[15.2px]`}>
                                                    <Text
                                                        className="text-[#2E303A] font-semibold text-[16px]"
                                                        style={{

                                                            fontFamily: "Matter500",
                                                        }}
                                                    >
                                                        {user?.dob ? user?.dob : "-"}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            color: `text-[#737A82]`,
                                                            fontFamily: "Matter",
                                                        }}
                                                    >
                                                        Date of Birth
                                                    </Text>
                                                </View>
                                            </View> */}
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
                                                            color: `text-[#737A82]`,
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
                        <View className={`h-full`}>
                            <View
                                style={{
                                    paddingTop: "32px",
                                    fontFamily: "Avant",
                                    fontSize: "26px",
                                    fontStyle: "up",
                                    fontWeight: "700",
                                    padding: "24px",
                                    lineHeight: "tight",
                                }}
                            >
                                <Text className=" py-[32px] text-[20px] uppercase" style={{ fontFamily: "Avant", }}>Change Password</Text>
                            </View>
                            <View
                                className="flex flex-col gap-[32px] pb-[32px]"

                            >
                                <View className={`flex flex-col gap-[8px]`}>
                                    <View
                                        style={{
                                            color: "#000000",
                                            fontSize: "16px",
                                            fontWeight: "medium",
                                            paddingBottom: "8px",
                                        }}
                                    >
                                        <Text style={{ fontFamily: "Matter500", fontSize: 18 }}>Old Password :</Text>
                                    </View>
                                    <View
                                        onPress={() => {
                                            setIsEmpty(0);
                                        }}
                                        className={`relative flex items-center`}
                                    >
                                        <TextInput
                                            onPress={() => {
                                                setIsEmpty(0);
                                            }}
                                            ref={passwordRef}
                                            onChangeText={setoldPassword}
                                            value={oldpassword}
                                            className={clsx(`text-[#858585] px-3  border-[1px]  active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl pt-3.5 pb-[14.5px] bg-white`,
                                                isEmpty === 1
                                                    ? `border-[#F42F4E]`
                                                    : `border-[#EDEEF4]`,)}
                                            style={[

                                                { fontSize: 16 },
                                            ]}
                                            placeholder="Password"
                                            secureTextEntry={!showPassword}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowPassword(!showPassword)}
                                            className={`absolute right-3 h-full flex flex-row items-center`}
                                        >
                                            {showPassword ? <Eye /> : <Eyeslash />}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View className={`flex flex-col gap-[8px]`}>
                                    <View
                                        style={{
                                            color: "#000000",
                                            fontSize: "16px",
                                            fontWeight: "medium",
                                            paddingBottom: "8px",
                                        }}
                                    >
                                        <Text style={{ fontFamily: "Matter500", fontSize: 18 }}>New Password :</Text>
                                    </View>
                                    <View
                                        onPress={() => {
                                            setIsEmpty(0);
                                        }}
                                        className={`relative flex items-center`}
                                    >
                                        <TextInput
                                            onPress={() => {
                                                setIsEmpty(0);
                                            }}
                                            ref={passwordRef}
                                            onChangeText={setnewpassword}
                                            value={newpassword}
                                            className={clsx(`text-[#858585] px-3  border-[1px]  active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl pt-3.5 pb-[14.5px] bg-white`,
                                                isEmpty === 2
                                                    ? `border-[#F42F4E]`
                                                    : `border-[#EDEEF4]`,)}
                                            style={[

                                                { fontSize: 16 },
                                            ]}
                                            placeholder="Password"
                                            secureTextEntry={!showPassword}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowPassword(!showPassword)}
                                            className={`absolute right-3 h-full flex flex-row items-center`}
                                        >
                                            {showPassword ? <Eye /> : <Eyeslash />}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#205FFF",
                                    width: "100%",
                                    fontFamily: "Matter",
                                    cursor: "pointer",
                                    justifyContent: "center",
                                    marginTop: 5,
                                    textAlign: "center",
                                    color: "white",
                                    fontWeight: "medium",
                                    paddingVertical: 4,
                                    borderRadius: 999,
                                    flexDirection: "row",
                                    gap: 3,
                                    alignItems: "center",
                                    minHeight: 60,
                                }}
                                onPress={changePassword}
                            >
                                <Text style={{ color: "white", display: loading ? "none" : "flex", fontFamily: "Matter" }}>
                                    Change Password
                                </Text>
                                {loading && <ActivityIndicator color={"white"} />}
                            </TouchableOpacity>
                        </View>
                    )
                    }
                </View >
            )}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default Studentprofile;
