import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Animated,
    TouchableOpacity,
    ToastAndroid,
    TextInput,
} from "react-native";
import { ScrollView } from "react-native";

import { useRoute } from "@react-navigation/native";

import PagerView from "react-native-pager-view";

import { router, useNavigation } from "expo-router";
import clsx from "clsx";
import { useUser } from "../../../redux/userContext";
import getassessmentbyId from "../../../api/getassessmentbyId";
import getFormattedDate from "../../../utils/getFormattedDate";
import getScoreForAssessment from "../../../api/getScoreForAssessment";
import ArrowRight from "../../../assets/icons/arrowright";
import ArrowLeft from "../../../assets/icons/arrowleft";
import Assbtn from "../../../assets/icons/assbtn";
import Eye from "../../../assets/icons/eye";
import Eyeslash from "../../../assets/icons/eyeslash";
import AddTeacher from "../../../api/addTeacher";
import Addstudent from "../../../api/addstudent";
const Adminaddstudent = ({ }) => {
    const pagerRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [isEmpty, setIsEmpty] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setname] = useState("");
    const [phone, setphone] = useState("");
    const [currentpage, setCurrentPage] = useState(0); // State to track the current page
    const [loading, setLoading] = useState(false);
    const [classteacher, setClassteacher] = useState(); //



    const gotonextpage = () => {
        if (currentpage < 1) {
            if (validateCurrentPageFields()) {
                setCurrentPage(currentpage + 1);
                pagerRef.current.setPage(currentpage + 1);
            }
        } else {
            ToastAndroid.show("You have reached last step", ToastAndroid.SHORT);
        }
    };

    const gotoprevpage = () => {
        if (currentpage > 0) {
            setCurrentPage(currentpage - 1);
            pagerRef.current.setPage(currentpage - 1);
        } else {
            ToastAndroid.show("No previous step", ToastAndroid.SHORT);
        }
    };





    const validateCurrentPageFields = () => {
        if (currentpage === 0) {
            if (!name || !email || !password) {
                ToastAndroid.show("Please fill in all fields", ToastAndroid.SHORT);
                return false;
            }

        } else if (currentpage === 1) {
            if (selectedSubjects.length === 0) {
                ToastAndroid.show("Please select at least one subject", ToastAndroid.SHORT);
                return false;
            }
        } else if (currentpage === 2) {
            if (selectedClasses.length === 0) {
                ToastAndroid.show("Please select at least one class", ToastAndroid.SHORT);
                return false;
            }
        } else if (currentpage === 3) {
            if (!classteacher) {
                ToastAndroid.show("Please select a class teacher", ToastAndroid.SHORT);
                return false;
            }
        }
        return true;
    };




    const { state } = useUser();

    const navigation = useNavigation();
    const user = state.user;
    const [date, setdate] = useState();
    const [pageload, setpageload] = useState(true);
    const [details, setdetails] = useState();
    const route = useRoute();




    useEffect(() => {
        setpageload(false)
        setdate(getFormattedDate());

    }, [user]);



    const Submit = async () => {
        setLoading(true)
        if (!classteacher) {
            ToastAndroid.show("Please select a class ", ToastAndroid.SHORT);
            return;
        }
        if (!loading && (currentpage == 1)) {
            console.log({
                name: name,
                rollno: email,
                password: password,
                class: classteacher,
                grade: classteacher.slice(0, -1),
                section: classteacher.split("").pop(),
                phone: phone


            });
            const addteacher = await Addstudent({
                name: name,
                rollno: classteacher + "-" + email,
                password: password,
                class: classteacher,
                grade: classteacher.slice(0, -1),
                section: classteacher.split("").pop(),
                phone: phone


            })
            if (addteacher.error) {
                setLoading(false)

                ToastAndroid.show(addteacher.error, ToastAndroid.SHORT);
                return;
            }

            ToastAndroid.show('Added successfully!', ToastAndroid.SHORT);
            navigation.navigate("admin/studentprofileadmin", {
                id: addteacher._id,
            });

        }

        setLoading(false)
    }



    const classes = [
        "NURA", "LKGA", "LKGB", "UKGA", "UKGB",
        "1A", "1B", "2A", "2B",
        "3A", "3B", "4A", "4B",
        "5A", "5B", "6A", "6B",
        "7A", "7B", "8A", "8B",
        "9A", "9B", "10A", "10B"
    ]


    const handleClassTeacherPress = (teachingClass) => {
        setClassteacher((prevClassteacher) => prevClassteacher === teachingClass ? null : teachingClass);
    };

    <View>
        <Text className=" p-2" style={{ fontSize: 16, fontFamily: "Matter500" }}>Phone</Text>

        <TextInput
            onPress={() => {
                setIsEmpty(0);
            }}
            ref={emailRef}
            onChangeText={setphone}
            value={phone}
            className={clsx("text-[#858585] px-3  border-[1px]  active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl  pt-3.5 pb-[14.5px] bg-white", isEmpty === 1 || isEmpty === 2 ? `border-[#F42F4E]`
                : `border-[#EDEEF4]`,)}
            style={{
                fontSize: 16, fontFamily: "Matter", // Set the font size explicitly
            }}

            placeholder="Phone"
            keyboardType="number-pad"
        />
    </View>

    return (
        <View className={`flex-1  h-full`}>
            {pageload ? (
                <View className={`flex justify-center items-center h-full`}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <View className={` flex-1 `}>
                    <View className={`flex-1  `}>
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
                                    {currentpage == 0 ? "1.Basic details" : "2.Select Class"}
                                </Text>

                                <Text
                                    className="text-gray-600 text-base uppercase"
                                    style={{
                                        fontFamily: "Matter",

                                    }}
                                >
                                    {getFormattedDate()}
                                </Text>
                            </View>
                        </View>


                        <View>
                            <View className="  flex ">
                                <PagerView
                                    className="flex flex-row"
                                    initialPage={0}
                                    ref={pagerRef}
                                    scrollEnabled={false}
                                >
                                    <ScrollView className={`p-6    flex flex-col gap-8 w-full`}>

                                        <View>
                                            <Text className=" p-2" style={{ fontSize: 16, fontFamily: "Matter500" }}>Name</Text>

                                            <TextInput
                                                onPress={() => {
                                                    setIsEmpty(0);
                                                }}
                                                ref={emailRef}
                                                onChangeText={setname}
                                                value={name}
                                                className={clsx("text-[#858585] px-3  border-[1px]  active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl  pt-3.5 pb-[14.5px] bg-white", isEmpty === 1 || isEmpty === 2 ? `border-[#F42F4E]`
                                                    : `border-[#EDEEF4]`,)}
                                                style={{
                                                    fontSize: 16, fontFamily: "Matter", // Set the font size explicitly
                                                }}
                                                placeholder="Name"
                                                keyboardType="email-address"
                                            />
                                        </View>
                                        <View>
                                            <Text className=" p-2" style={{ fontSize: 16, fontFamily: "Matter500" }}>Roll Number</Text>

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
                                                placeholder="Email"
                                                keyboardType="email-address"
                                            />
                                        </View>
                                        <View>
                                            <Text className=" p-2" style={{ fontSize: 16, fontFamily: "Matter500" }}>Phone</Text>

                                            <TextInput
                                                onPress={() => {
                                                    setIsEmpty(0);
                                                }}
                                                ref={emailRef}
                                                onChangeText={setphone}
                                                value={phone}
                                                className={clsx("text-[#858585] px-3  border-[1px]  active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl  pt-3.5 pb-[14.5px] bg-white", isEmpty === 1 || isEmpty === 2 ? `border-[#F42F4E]`
                                                    : `border-[#EDEEF4]`,)}
                                                style={{
                                                    fontSize: 16, fontFamily: "Matter", // Set the font size explicitly
                                                }}

                                                placeholder="Phone"
                                                keyboardType="number-pad"
                                            />
                                        </View>
                                        <View>
                                            <Text className=" p-2" style={{ fontSize: 16, fontFamily: "Matter500" }}>Password</Text>


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
                                    </ScrollView>


                                    <ScrollView>

                                        <View
                                            className="p-6 w-full pb-[100px]"
                                            style={{

                                                flexDirection: "row",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            {classes.map((teachingClass, index) => (
                                                <TouchableOpacity
                                                    onPress={() => { handleClassTeacherPress(teachingClass) }}
                                                    key={index}
                                                    className={clsx(`p-3 flex justify-center items-center py-[48px]    rounded-lg`,
                                                        classteacher === teachingClass ? `bg-blue-500` : `bg-gray-600`,)}
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
                                    </ScrollView>
                                </PagerView>
                            </View>
                        </View>
                    </View>

                </View>
            )}
            <View className="px-4 py-4 ">

                <View className={`flex  flex-row justify-between bg-white  border-[1px] border-[#E4E4E5] rounded-full px-2 py-2 items-center`}>


                    <Text style={{ fontFamily: "Matter500" }} className={` leading-none text-[14px]   py-2.5 pb-[14px]  px-2 font-medium`}>
                        Add Student
                    </Text>

                    {/* <View className=" h-[4px] w-[50px] bg-[#D9D9D9] rounded-full mt-1 ">
                        <View
                            style={{ width: `${scrollprogress}%` }}
                            className=" h-full  bg-[#1D55E5] rounded-full transition-all duration-1000"
                        ></View>
                    </View> */}
                    <View className=" flex  gap-4 flex-row">
                        <TouchableOpacity
                            onPress={() => { gotoprevpage() }}

                        >
                            <Assbtn color={currentpage > 0 ? `#205FFF` : `#9B9B9B`} />

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { gotonextpage() }}
                            className={(" rotate-180")}

                        >
                            <Assbtn color={currentpage < 3 ? `#205FFF` : `#9B9B9B`} />

                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => Submit()}
                        className={clsx(" rounded-full w-[80px] flex items-center ", currentpage === 1 ? `bg-[#205FFF]` : `bg-[#9B9B9B]`)}

                    >
                        <Text style={{ fontFamily: "Matter500" }} className={`text-white leading-none text-[14px]   py-2.5 pb-[14px] font-medium`}>
                            {loading ? <ActivityIndicator color={"#fff"} /> : "Add"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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

export default Adminaddstudent;
