import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Animated,
    TouchableOpacity,
    ToastAndroid,
} from "react-native";
import { ScrollView } from "react-native";

import { useRoute } from "@react-navigation/native";

import PagerView from "react-native-pager-view";

import { useNavigation } from "expo-router";
import clsx from "clsx";
import { useUser } from "../../../redux/userContext";
import getassessmentbyId from "../../../api/getassessmentbyId";
import getFormattedDate from "../../../utils/getFormattedDate";
import getScoreForAssessment from "../../../api/getScoreForAssessment";
import ArrowRight from "../../../assets/icons/arrowright";
import ArrowLeft from "../../../assets/icons/arrowleft";
import Assbtn from "../../../assets/icons/assbtn";
const Studentsingleassessment = ({ }) => {
    const pagerRef = useRef(null);
    const [currentpage, setCurrentPage] = useState(0); // State to track the current page
    const [loading, setLoading] = useState(false);
    const gotonextpage = () => {
        if (currentpage < details?.questions.length - 1) {
            // Check if current page is less than total pages
            setCurrentPage(currentpage + 1); // Increment current page
            pagerRef.current.setPage(currentpage + 1); // Go to next page
            const length = details?.questions.length;
            const p = 100 / length;
            setscrollprogress((prev) => prev + p);
        } else {
            ToastAndroid.show("You have reached last question", ToastAndroid.SHORT);
        }
    };

    const gotoprevpage = () => {
        if (currentpage > 0) {
            // Check if current page is greater than 0
            setCurrentPage(currentpage - 1); // Decrement current page
            pagerRef.current.setPage(currentpage - 1); // Go to previous page
            const length = details?.questions.length;
            const p = 100 / length;
            setscrollprogress((prev) => prev - p);
        } else {
            ToastAndroid.show("No previous question", ToastAndroid.SHORT);
        }
    };
    const { state } = useUser();
    const [currentindex, setcurrentindex] = useState(0);
    const [transform, settransform] = useState(parseFloat("0%"));
    const navigation = useNavigation();
    const user = state.user;
    const [date, setdate] = useState();
    const [pageload, setpageload] = useState(true);
    const [details, setdetails] = useState();
    const route = useRoute();
    const { id } = route.params;
    const [scrollprogress, setscrollprogress] = useState(0);

    const [selectedOption, setSelectedOption] = useState({
        assementId: id,
        answers: [],
    });
    useEffect(() => {
        setdate(getFormattedDate());
        const data = async () => {
            const d = await getassessmentbyId(id);
            setdetails(d);
            setpageload(false);
        };
        if (id) {
            data();
        }
    }, [user, id]);
    const handleOptionChange = (sno, selectedAnswer) => {
        setSelectedOption((prevSelectedOption) => {
            const existingAnswerIndex = prevSelectedOption.answers.findIndex(
                (answer) => Number(answer.sno) === Number(sno)
            );

            // If sno is not present in answers array, push it
            if (existingAnswerIndex === -1) {
                return {
                    ...prevSelectedOption,
                    answers: [
                        ...prevSelectedOption.answers,
                        { sno: Number(sno), answer: selectedAnswer },
                    ],
                };
            } else {
                // Replace the existing answer if sno is already present
                const newAnswers = [...prevSelectedOption.answers];
                newAnswers[existingAnswerIndex] = { sno: Number(sno), answer: selectedAnswer };
                return { ...prevSelectedOption, answers: newAnswers };
            }
        });
    };


    useEffect(() => {
        console.log(selectedOption);
    }, [selectedOption]);
    const Submit = async () => {
        setLoading(true)
        if (!loading && (currentpage == details?.questions.length - 1)) {

            await getScoreForAssessment(selectedOption)
            ToastAndroid.show('Submitted successfully!', ToastAndroid.SHORT);
            navigation.navigate("student/assessment", {
                id: "dummy",
            })
        }

        setLoading(false)
    }
    useEffect(() => {
        if (details) {
            const length = details?.questions.length;
            const p = 100 / length;
            setscrollprogress(p);
        }
    }, [details]);

    return (
        <View className={`flex-1  h-full`}>
            {pageload ? (
                <View className={`flex justify-center items-center h-full`}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <ScrollView className={` `}>
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
                                    {details?.title}
                                </Text>

                                <Text
                                    className="text-gray-600 text-base uppercase"
                                    style={{
                                        fontFamily: "Matter",

                                    }}
                                >
                                    {details?.subject}
                                </Text>
                            </View>
                        </View>
                        <View className={` flex flex-col gap-2 pt-8`}>

                            <View>
                                <Text
                                    className="text-gray-600 text-lg text-center"
                                    style={{
                                        fontFamily: "Matter",

                                    }}
                                >
                                    Question {currentpage + 1} of {details?.questions?.length}
                                </Text>
                            </View>
                        </View>

                        <View>
                            <View className="  flex ">
                                <PagerView
                                    style={styles.container}
                                    initialPage={0}
                                    ref={pagerRef}
                                    scrollEnabled={false}
                                >
                                    {details?.questions.map((question, questionIndex) => (
                                        <View
                                            key={questionIndex + 1}
                                            className={`px-8 w-[100%] py-6`}
                                        >
                                            <Text
                                                className="text-[16px]"
                                                style={{

                                                    fontFamily: "Matter500",
                                                }}
                                            >
                                                {question.question}
                                            </Text>
                                            <View className={`py-4 gap-4`}>
                                                {question.options.map((option, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        onPress={() =>
                                                            handleOptionChange(questionIndex + 1, option)
                                                        }
                                                        className={clsx("text-[0.95rem]  px-2 leading-none py-3 pb-3.5 border-[1px] rounded-lg flex items-center  font-medium", selectedOption?.answers[questionIndex]?.answer ===
                                                            option // Corrected access to selectedOption
                                                            ? `border-[#205FFF] bg-[#205FFF] text-white`
                                                            : `border-[#E2E4E8] bg-white text-[#373737]`,)}

                                                    >
                                                        <Text
                                                            className={clsx(selectedOption?.answers[questionIndex]
                                                                ?.answer === option
                                                                ? `text-white`
                                                                : `text-[#373737]`)}
                                                            style={{

                                                                fontFamily: "Matter",
                                                            }}
                                                        >
                                                            {["A", "B", "C", "D"][index]}. &nbsp; {option}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                                </PagerView>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            )}
            <View className="px-4 pb-4">

                <View className={`flex  flex-row justify-between  border-[1px] border-[#E4E4E5] rounded-full px-2 py-2 items-center`}>

                    <TouchableOpacity
                        onPress={() => { Submit() }}
                        className={clsx(" rounded-full w-[80px] flex items-center ", currentpage === details?.questions.length - 1 ? `bg-[#205FFF]` : `bg-[#9B9B9B]`)}

                    >
                        <Text style={{ fontFamily: "Matter500" }} className={`text-white leading-none text-[14px]   py-2.5 pb-[14px] font-medium`}>
                            {loading ? <ActivityIndicator color={"#fff"} /> : "Submit"}</Text>
                    </TouchableOpacity>
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
                            <Assbtn color={currentpage < details?.questions.length - 1 ? `#205FFF` : `#9B9B9B`} />

                        </TouchableOpacity>
                    </View>
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

export default Studentsingleassessment;
