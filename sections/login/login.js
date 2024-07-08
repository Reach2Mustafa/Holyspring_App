import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Vibration,
    ActivityIndicator,
} from "react-native";
import { Link, SplashScreen, useNavigation } from "expo-router";


import AsyncStorage from "@react-native-async-storage/async-storage";

import clsx from "clsx";
import { useUser } from "../../redux/userContext";
import Eyeslash from "../../assets/icons/eyeslash";
import Eye from "../../assets/icons/eye";
import login1 from "../../api/login";
import Teacherlogin from "../../api/teacherlogin";
import adminlogin from "../../api/adminlogin";
const Login = () => {

    const { state, dispatch } = useUser();
    const user = state.user;
    useEffect(() => {

        const user1 = async () => {
            const token = await AsyncStorage.getItem("token");
            if (user) {
                if (user.usertype == "student") {

                    navigation.navigate("student/home");
                }
                else if (user.usertype == "teacher") {
                    navigation.navigate("teacher/home");
                }
                else if (user.usertype == "admin") {
                    navigation.navigate("admin/home");
                }

            } else if (!user && token == null) {
                setpageload(false);
            }
        };
        user1();

    }, [user, value]);
    const [value, setValue] = useState(true); // Initial value can be true or false

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(prevValue => !prevValue); // Toggle the value
        }, 30000); // 30000 milliseconds = 30 seconds

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);


    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [isEmpty, setIsEmpty] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [pageload, setpageload] = useState(true);

    const validatePassword = (password) => {
        return password?.length >= 6;
    };
    const handleSignup = async () => {
        const emailValue = email;
        const passwordValue = password;

        if (emailValue.length === 0 || passwordValue.length === 0) {
            if (emailValue.length === 0 && passwordValue.length === 0) {
                setIsEmpty(1);
            } else if (emailValue.length === 0) {
                setIsEmpty(2);
            } else {
                setIsEmpty(3);
            }
        } else if (!validatePassword(password)) {
            setIsEmpty(3);
            Vibration.vibrate(300);
            ToastAndroid.show("Incorect password", ToastAndroid.SHORT);
        } else {
            if (emailValue.includes("@")) {
                const user = await Teacherlogin(email, password);
                if (user.name) {

                    dispatch({ type: "SET_USER", payload: user });
                }
                else {
                    ToastAndroid.show("Invalid Details", ToastAndroid.SHORT);

                }
            }
            else if (emailValue.includes("admin")) {
                const user = await adminlogin(email, password);
                if (user.name) {

                    dispatch({ type: "SET_USER", payload: user });
                }
                else {
                    ToastAndroid.show("Invalid Details", ToastAndroid.SHORT);

                }
            }
            else {
                const user = await login1(email, password);
                if (user.name) {

                    dispatch({ type: "SET_USER", payload: user });
                }
                else {
                    ToastAndroid.show("Invalid Details", ToastAndroid.SHORT);

                }
            }

        }
        setLoading(false);
    };

    return (
        <View className="w-[100%]">
            {pageload ? (
                <View className={`flex justify-center items-center h-full`}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <View
                    onPress={() => {
                        setIsEmpty(0);
                    }}
                    className={` h-full  flex justify-center w-full bg-[#f9fafb] items-center`}
                >
                    <View
                        className={` py-10 px-4 lg:px-0 w-[90%] md:max-w-[450px] bg-white border-[1px] border-[#dadcdd] rounded-3xl`}
                    >
                        <Text
                            className="pt-4 pb-[32px] text-[#252525] font-bold text-2xl text-center}"
                            style={{ fontFamily: "Matter" }}
                        >
                            Login
                        </Text>

                        <View className={`pb-6  flex flex-col gap-8 w-full`}>
                            <TextInput
                                onPress={() => {
                                    setIsEmpty(0);
                                }}
                                ref={emailRef}
                                onChangeText={setEmail}
                                value={email}
                                className={clsx("text-[#858585] px-3  border-[1px]  active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl  pt-3.5 pb-[14.5px] bg-white", isEmpty === 1 || isEmpty === 2 ? `border-[#F42F4E]`
                                    : `border-[#EDEEF4]`,)}
                                style={{
                                    fontSize: 16, fontFamily: "Matter", // Set the font size explicitly
                                }}
                                placeholder="Username"
                                keyboardType="email-address"
                            />

                            <View
                                onPress={() => {
                                    setIsEmpty(0);
                                }}
                                className={`relative flex items-center  w-full`}
                            >
                                <TextInput
                                    onPress={() => {
                                        setIsEmpty(0);
                                    }}
                                    ref={passwordRef}
                                    onChangeText={setPassword}
                                    value={password}
                                    className={clsx("text-[#858585] px-3  border-[1px]  active:border-[1px] focus:border-[1px] focus:border-[#205FFF]  w-full rounded-xl  pt-3.5 pb-[14.5px] bg-white", isEmpty === 1 || isEmpty === 3 ? `border-[#F42F4E]`
                                        : `border-[#EDEEF4]`,)}
                                    style={{
                                        fontSize: 16, fontFamily: "Matter", // Set the font size explicitly
                                    }}
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

                        <TouchableOpacity
                            className={`bg-[#205FFF] w-full py-4 rounded-full items-center min-h-[60px]`}
                            onPress={async () => {
                                setLoading(true);
                                await handleSignup();
                            }}
                        >
                            <Text className={`text-white text-lg font-medium`}>
                                {loading ? <ActivityIndicator color={"#fff"} /> : "Sign In"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Login;
