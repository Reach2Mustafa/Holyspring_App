import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Animated, Easing, ToastAndroid, ActivityIndicator } from 'react-native'
import ArrowRight from '../../../assets/icons/arrowright';
import Arrowdown from '../../../assets/icons/Arrowdown';
import { useUser } from '../../../redux/userContext';
import getFormattedDate from '../../../utils/getFormattedDate';
import ArrowLeft from '../../../assets/icons/arrowleft';
import PagerView from 'react-native-pager-view';
import Addquestion from '../../../assets/icons/addquestion';
import Save from '../../../assets/icons/save';
import Addass from '../../../assets/icons/addass';
import clsx from 'clsx';
import Assbtn from '../../../assets/icons/assbtn';
import { router } from 'expo-router';
import postAssessment from '../../../api/postassessment';

const Teacheraddassessment = ({ }) => {
    const [title, setTitle] = useState('');
    const [date1, setdate1] = useState(getFormattedDate());
    const [currentindex, setcurrentindex] = useState(0);

    const chatContainerRef = useRef()
    const pagerRef = useRef(null);
    const [loading, setloading] = useState(false);
    const [subject, setSubject] = useState('');
    const [class1, setClass1] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [expanded1, setExpanded1] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const heightAnim = useRef(new Animated.Value(0)).current;
    const heightAnim1 = useRef(new Animated.Value(0)).current;
    const heightAnim2 = useRef(new Animated.Value(0)).current;
    const [arrowRotation] = useState(new Animated.Value(0));
    const [arrowRotation1] = useState(new Animated.Value(0));
    const [arrowRotation2] = useState(new Animated.Value(0));
    const [contentHeight, setContentHeight] = useState(0);
    const [contentHeight1, setContentHeight1] = useState(0);
    const [contentHeight2, setContentHeight2] = useState(0);
    const { state } = useUser()
    const [questions, setQuestions] = useState([
        {
            sno: 1,
            question: "",
            options: ["", "", "", ""],
            correctAnswer: "",
        },
    ]);
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollToEnd({ animated: true });
        }
    };
    const user = state.user;
    const toggleExpand = () => {
        Animated.timing(heightAnim, {
            toValue: expanded ? 0 : contentHeight,
            duration: 500,
            useNativeDriver: false,
        }).start();
        Animated.timing(arrowRotation, {
            toValue: expanded ? 0 : 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
        setExpanded(!expanded);
    };
    const toggleExpand1 = () => {
        Animated.timing(heightAnim1, {
            toValue: expanded1 ? 0 : contentHeight1,
            duration: 500,
            useNativeDriver: false,
        }).start();
        Animated.timing(arrowRotation1, {
            toValue: expanded1 ? 0 : 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
        setExpanded1(!expanded1);
    };
    const toggleExpand2 = () => {
        Animated.timing(heightAnim2, {
            toValue: expanded2 ? 0 : contentHeight2,
            duration: 500,
            useNativeDriver: false,
        }).start();
        Animated.timing(arrowRotation2, {
            toValue: expanded2 ? 0 : 1,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
        setExpanded2(!expanded2);
        scrollToBottom()
    };

    useEffect(() => {
        console.log(contentHeight);
    }, [contentHeight]);
    const handleQuestionChange = (index, field, value) => {
        console.log(index, field, value);
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };
    useEffect(() => {
        console.log(questions)
    }, [questions])
    const addNewQuestion = async () => {
        // Validate the current question
        const lastQuestion = questions[currentindex - 1];
        console.log(lastQuestion)

        if (
            lastQuestion &&
            (lastQuestion?.question?.toString().trim() === "" ||
                lastQuestion?.options?.some((option) => option.trim() === "") ||
                lastQuestion?.correctAnswer?.toString().trim() === "")
        ) {
            ToastAndroid.show("fill all the details for a new question", ToastAndroid.SHORT);
            // If validation fails, alert the user or handle the error as needed

            return;
        }
        setcurrentindex(currentindex + 1);
        setQuestions([
            ...questions,
            {
                sno: questions.length + 1,
                question: "",
                options: ["", "", "", ""],
                correctAnswer: "",
            },
        ]);
        ; // Go to next page

    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };
    const next = () => {
        const lastQuestion = questions[currentindex - 1];

        if (
            lastQuestion &&
            (lastQuestion.question.toString().trim() === "" ||
                lastQuestion.options.some(
                    (option) => option.toString().trim() === ""
                ) ||
                lastQuestion.correctAnswer.toString().trim() === "") &&
            currentindex != questions.length
        ) {
            // If validation fails, alert the user or handle the error as needed
            ToastAndroid.show("fill all the details to go to next question", ToastAndroid.SHORT);

            return;
        } else if (currentindex < questions.length) {
            setcurrentindex(currentindex + 1);

        } else {
            ToastAndroid.show("no next question", ToastAndroid.SHORT);

        }
    };
    useEffect(() => {
        pagerRef.current.setPage(currentindex)
    }, [currentindex])
    const prev = () => {

        if (currentindex > 0) {
            setcurrentindex(currentindex - 1);
            pagerRef.current.setPage(currentindex - 1)
        } else {
            ToastAndroid.show("no previous question", ToastAndroid.SHORT);
        }
    };
    const Submit = async () => {
        const lastQuestion = questions[currentindex - 1];
        console.log(lastQuestion)

        if (
            lastQuestion &&
            (lastQuestion?.question?.toString().trim() === "" ||
                lastQuestion?.options?.some((option) => option.trim() === "") ||
                lastQuestion?.correctAnswer?.toString().trim() === "")
        ) {
            ToastAndroid.show("fill all the details for a new question", ToastAndroid.SHORT);
            // If validation fails, alert the user or handle the error as needed

            return;
        }
        setloading(true);
        const data = await postAssessment(class1, subject, title, questions)
        if (data.error) {
            setloading(false)
            return ToastAndroid.show(
                "Something went wrong try again",
                ToastAndroid.SHORT
            );
        }
        ToastAndroid.show("Assessment added successfully", ToastAndroid.SHORT);
        router.navigate("/teacher/home");
    }
    return (
        <View className={`flex-1  `}>

            <ScrollView ref={chatContainerRef} style={{ flex: 1, }}>

                <View className={`w-full  border-b p-6 border-gray-300`}>
                    <View className={``}>
                        <Text style={{ fontFamily: "Avant", fontFeatures: [{ "salt": 1 }], textTransform: "uppercase", fontWeight: "bold", fontSize: 20 }}>
                            Add Assessment
                        </Text>

                        <Text className="text-gray-600 text-base" style={{ fontFamily: "Matter" }}>{date1}</Text>

                    </View>
                </View>
                <PagerView
                    style={styles.container}
                    initialPage={0}
                    ref={pagerRef}
                    scrollEnabled={false}
                >
                    <View className={`p-6 w-[100%] flex flex-col    gap-[32px]`}>
                        <View className="w-full">
                            <Text className="pb-2 w-full" style={{ fontSize: 16, fontFamily: "Matter500" }}>Title</Text>

                            <TextInput


                                onChangeText={setTitle}
                                value={title}
                                className="text-[#858585] px-3  border-[1px] border-[#EDEEF4]  active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl  pt-3.5 pb-[14.4px] bg-[#FAFBFC]"
                                style={[


                                    { fontSize: 16, fontFamily: "Matter" }, // Set the font size explicitly
                                ]}
                                placeholder="Enter  Tittle"
                                keyboardType="email-address"
                            />
                        </View>


                        <View

                            className={`relative w-full flex items-center`}
                        >
                            <Text className="pb-2 w-full" style={{ fontSize: 16, fontFamily: "Matter500" }}>Subject</Text>
                            <TouchableOpacity onPress={() => { toggleExpand() }} className={`relative flex w-full items-center`}>

                                <TextInput

                                    readOnly

                                    value={subject}
                                    className="text-[#858585] px-3   border-[1px] border-[#EDEEF4] active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl  pt-3.5 pb-[14.4px] bg-[#FAFBFC]"
                                    style={[


                                        { fontSize: 16, fontFamily: "Matter" }, // Set the font size explicitly
                                    ]}
                                    placeholder="Select Subject"

                                />
                                <TouchableOpacity
                                    onPress={() => { toggleExpand() }}
                                    className={`absolute right-3 h-full  flex flex-row items-center`}
                                >
                                    <Animated.View className="absolute right-3 h-full flex flex-row items-center" style={[{
                                        transform: [{
                                            rotate: arrowRotation.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '180deg'],
                                            }),
                                        }],
                                    }]}>
                                        <Arrowdown />
                                    </Animated.View>
                                </TouchableOpacity>
                            </TouchableOpacity>

                            <View
                                style={styles.measureContent}
                                onLayout={(event) => {
                                    const { height } = event.nativeEvent.layout;
                                    setContentHeight(height);
                                }}
                            >
                                <View className={`w-[100%]  mt-2 py-1 border-[1px] border-[#EDEEF4] rounded-xl bg-[#FAFBFC]`}>
                                    {user?.subjects.map((sub, index) => (
                                        <Text
                                            key={index}
                                            className="px-3 py-3 duration-300 font-medium text-[#707070] border-[#EDEEF4] uppercase w-full hover:text-[#707070] hover:bg-[#EDEDED] text-[16px] leading-none"
                                            style={[

                                                { fontFamily: 'Matter', borderBottomWidth: index !== user.subjects.length - 1 ? 1 : 0 },
                                            ]}
                                        >
                                            {sub}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                            <Animated.View style={[styles.content, { height: heightAnim, }]}>
                                <View className={`w-[100%]  mt-2 py-1 border-[1px] border-[#EDEEF4] rounded-xl bg-[#FAFBFC]`}>
                                    {user?.subjects.map((sub, index) => (
                                        <TouchableOpacity onPress={() => { setSubject(sub); toggleExpand() }}>

                                            <Text
                                                key={index}
                                                className="px-3 py-3 duration-300 font-medium text-[#707070] border-[#EDEEF4] uppercase w-full hover:text-[#707070] hover:bg-[#EDEDED] text-[16px] leading-none"
                                                style={[

                                                    { fontFamily: 'Matter', borderBottomWidth: index !== user.subjects.length - 1 ? 1 : 0 },
                                                ]}
                                            >
                                                {sub}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </Animated.View>

                        </View>
                        <View

                            className={`relative w-full flex items-center`}
                        >
                            <Text className="pb-2 w-full" style={{ fontSize: 16, fontFamily: "Matter500" }}>Class</Text>

                            <TouchableOpacity onPress={() => { toggleExpand1() }} className={`relative flex w-full items-center`}>

                                <TextInput

                                    readOnly

                                    value={class1}
                                    className="text-[#858585] px-3  border-[1px] border-[#EDEEF4] active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl  pt-3.5 pb-[14.4px] bg-[#FAFBFC]"
                                    style={[

                                        { fontSize: 16, fontFamily: "Matter" }, // Set the font size explicitly
                                    ]}
                                    placeholder="Select Class"

                                />
                                <TouchableOpacity

                                    className={`absolute right-3 h-full  flex flex-row items-center`}
                                >
                                    <Animated.View className="absolute right-3 h-full flex flex-row items-center" style={[{
                                        transform: [{
                                            rotate: arrowRotation1.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '180deg'],
                                            }),
                                        }],
                                    }]}>
                                        <Arrowdown />
                                    </Animated.View>
                                </TouchableOpacity>
                            </TouchableOpacity>

                            <View
                                style={styles.measureContent}
                                onLayout={(event) => {
                                    const { height } = event.nativeEvent.layout;
                                    setContentHeight1(height);
                                }}
                            >
                                <View className={`w-[100%]  mt-2 py-1 border-[1px] border-[#EDEEF4] rounded-xl bg-[#FAFBFC]`}>
                                    {user?.teachingclass.map((sub, index) => (
                                        <Text
                                            key={index}
                                            className="px-3 py-3 duration-300 font-medium text-[#707070] border-[#EDEEF4] uppercase w-full hover:text-[#707070] hover:bg-[#EDEDED] text-[16px] leading-none"
                                            style={[

                                                { fontFamily: 'Matter', borderBottomWidth: index !== user.subjects.length - 1 ? 1 : 0 },
                                            ]}
                                        >
                                            {sub}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                            <Animated.View style={[styles.content, { height: heightAnim1 }]}>
                                <View className={`w-[100%]  mt-2 py-1 border-[1px] border-[#EDEEF4] rounded-xl bg-[#FAFBFC]`}>
                                    {user?.teachingclass.map((sub, index) => (
                                        <TouchableOpacity onPress={() => { setClass1(sub); toggleExpand1() }}>
                                            <Text
                                                key={index}
                                                className="px-3 py-3 duration-300 font-medium text-[#707070] border-[#EDEEF4] uppercase w-full hover:text-[#707070] hover:bg-[#EDEDED] text-[16px] leading-none"
                                                style={[
                                                    ,
                                                    { fontFamily: 'Matter', borderBottomWidth: index !== user.teachingclass.length - 1 ? 1 : 0 },
                                                ]}
                                            >
                                                {sub}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </Animated.View>

                        </View>
                    </View>
                    {questions.map((question, qIndex) => (
                        <View key={qIndex} className={`relative flex flex-col p-6`}>
                            <View className={`relative flex flex-col overflow-y-scroll gap-2  w-full`}>
                                <Text style={{ fontFamily: "Matter500" }} className={`font-medium text-base`}>
                                    Question {qIndex + 1}
                                </Text>
                                <TextInput
                                    className="text-[#858585] px-3  border-[1px] border-[#EDEEF4]  active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl  pt-3.5 pb-[14.4px] bg-[#FAFBFC]"
                                    onChangeText={(text) => { handleQuestionChange(qIndex, "question", text) }}
                                    style={[


                                        { fontSize: 16, fontFamily: "Matter" }, // Set the font size explicitly
                                    ]}
                                    placeholder="Enter the description"
                                    value={question.question}
                                    multiline={true}
                                />
                                <View className={`flex flex-col gap-2 pt-[16px]`}>
                                    <Text style={{ fontFamily: "Matter500" }} className={`font-Matter font-medium pb-1 text-[15.2px]`}>
                                        Response options
                                    </Text>
                                    <View className={`flex flex-col gap-y-[16px]`}>
                                        {question.options.map((option, oIndex) => (
                                            <TextInput
                                                key={oIndex}
                                                onChangeText={(text) => {
                                                    if (expanded2) {
                                                        toggleExpand2()
                                                    }
                                                    handleOptionChange(qIndex, oIndex, text)
                                                }
                                                }
                                                className="outline-none cursor-pointer focus:border-[#205FFF] bg-[#FAFBFC] w-full px-2 py-3 border-[#EDEEF4] border-[1px] text-[14.4px] font-Matter rounded-lg"
                                                style={[

                                                    { fontFamily: "Matter" },
                                                ]}
                                                placeholder={`${String.fromCharCode(65 + oIndex)}.`}
                                                value={option}
                                            />
                                        ))}
                                    </View>
                                </View>
                                <View className={`flex flex-col gap-y-2 pt-[16px]`}>
                                    <Text className={`font-Matter font-medium pb-1 text-[15.2px]`}>
                                        Correct Response

                                    </Text>
                                    <View className={`flex flex-col gap-y-[16px]`}>
                                        <TouchableOpacity onPress={() => {
                                            if (question.options.includes("")) {
                                                ToastAndroid.show("All the options are required", ToastAndroid.SHORT);

                                            } else {
                                                toggleExpand2()
                                            }
                                        }} className={`relative flex w-full items-center`}>

                                            <TextInput

                                                readOnly

                                                value={
                                                    question.correctAnswer
                                                }
                                                className="outline-none cursor-pointer focus:border-[#205FFF] bg-[#FAFBFC] w-full px-2 py-3 border-[#EDEEF4] border-[1px] text-[14.4px] font-Matter rounded-lg"
                                                style={[

                                                    { fontFamily: "Matter" },
                                                ]}
                                                placeholder="Select an Option"

                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (question.options.includes("")) {
                                                        ToastAndroid.show("All the options are required", ToastAndroid.SHORT);

                                                    } else {
                                                        toggleExpand2()
                                                    }
                                                }}
                                                className={`absolute right-3 h-full  flex flex-row items-center`}
                                            >
                                                <Animated.View className="absolute right-3 h-full flex flex-row items-center" style={[{
                                                    transform: [{
                                                        rotate: arrowRotation.interpolate({
                                                            inputRange: [0, 1],
                                                            outputRange: ['0deg', '180deg'],
                                                        }),
                                                    }],
                                                }]}>
                                                    <Arrowdown />
                                                </Animated.View>
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                        <View
                                            style={styles.measureContent}
                                            onLayout={(event) => {
                                                const { height } = event.nativeEvent.layout;
                                                setContentHeight2(height);
                                            }}
                                        >
                                            <View className={`w-[100%]  mt-2 mb-10 py-1 border-[1px] border-[#EDEEF4] rounded-xl bg-[#FAFBFC]`}>
                                                {question.options.map((sub, index) => (
                                                    <TouchableOpacity onPress={() => {

                                                        setExpanded2(false);
                                                    }}>

                                                        <Text
                                                            key={index}
                                                            className="px-3 py-3 duration-300 font-medium text-[#707070] border-[#EDEEF4] uppercase w-full hover:text-[#707070] hover:bg-[#EDEDED] text-[16px] leading-none"
                                                            style={[

                                                                { fontFamily: 'Matter', borderBottomWidth: index !== question.options.length - 1 ? 1 : 0 },
                                                            ]}
                                                        >
                                                            {sub}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>
                                        <Animated.View style={[styles.content, { height: heightAnim2 }]}>
                                            <View className={`w-[100%]  mt-2 py-1 border-[1px] border-[#EDEEF4] rounded-xl bg-[#FAFBFC]`}>
                                                {question.options.map((sub, index) => (
                                                    <TouchableOpacity onPress={() => {
                                                        handleQuestionChange(qIndex, "correctAnswer", sub);
                                                        toggleExpand2(false);
                                                    }}>

                                                        <Text
                                                            key={index}
                                                            className="px-3 py-3 duration-300 font-medium text-[#707070] border-[#EDEEF4] uppercase w-full hover:text-[#707070] hover:bg-[#EDEDED] text-[16px] leading-none"
                                                            style={[

                                                                { fontFamily: 'Matter', borderBottomWidth: index !== question.options.length - 1 ? 1 : 0 },
                                                            ]}
                                                        >
                                                            {sub}
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </Animated.View>
                                    </View>
                                </View>

                            </View>
                        </View>
                    ))}
                </PagerView>

            </ScrollView>

            <View className="px-4 pb-4">

                <View className={`flex  flex-row justify-between  border-[1px] border-[#E4E4E5] rounded-full px-2 py-2 items-center`}>

                    <View className=" flex  gap-4 flex-row">


                        <TouchableOpacity
                            onPress={() => {
                                if (currentindex == 0) {
                                    if (!title) {
                                        ToastAndroid.show("title is required", ToastAndroid.SHORT);

                                    } else if (!subject) {
                                        ToastAndroid.show("subject is required", ToastAndroid.SHORT);

                                    }
                                    else if (!class1) {
                                        ToastAndroid.show("class is required", ToastAndroid.SHORT);
                                    }
                                    else {

                                        ; // Go to next page
                                        setcurrentindex(currentindex + 1);


                                    }
                                } else if (questions.length == currentindex) {

                                    addNewQuestion();
                                } else {
                                    ToastAndroid.show("go to last question for adding new question ", ToastAndroid.SHORT);

                                }
                            }}
                            className={clsx(" rounded-full w-[120px] flex items-center ", questions.length == currentindex ? `bg-[#205FFF]` : `bg-[#9B9B9B]`)}

                        >
                            <Text style={{ fontFamily: "Matter500" }} className={`text-white leading-none text-[14px]   py-2.5 pb-[14px] font-medium`}>
                                Add Question</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { if (questions.length == currentindex) { Submit() } else { ToastAndroid.show("Go to last Question to submit", ToastAndroid.SHORT) } }}
                            className={clsx(" rounded-full w-[80px] flex items-center ", questions.length == currentindex ? `bg-[#205FFF]` : `bg-[#9B9B9B]`)}

                        >
                            <Text style={{ fontFamily: "Matter500" }} className={`text-white leading-none text-[14px]   py-2.5 pb-[14.5px] font-medium`}>
                                {loading ? <ActivityIndicator color={"#fff"} /> : "Upload"}</Text>
                        </TouchableOpacity>

                    </View>
                    <View className=" flex  gap-4 flex-row">
                        <TouchableOpacity
                            onPress={() => { prev() }}

                        >
                            <Assbtn color={currentindex == 0 ? `#9B9B9B` : `#205FFF`} />

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                if (title && subject && class1) {
                                    if (currentindex == 0) {
                                        setcurrentindex(currentindex + 1);

                                    } else {
                                        next();
                                    }
                                } else {
                                    if (!title) {
                                        ToastAndroid.show("title is required", ToastAndroid.SHORT);

                                    } else if (!subject) {
                                        ToastAndroid.show("subject is required", ToastAndroid.SHORT);

                                    }
                                    else if (!class1) {
                                        ToastAndroid.show("class is required", ToastAndroid.SHORT);
                                    }
                                }
                            }}

                            className={(" rotate-180")}

                        >
                            <Assbtn color={questions.length == currentindex ||
                                !title ||
                                !subject || !class1 > 0 ? `#9B9B9B` : `#205FFF`} />

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
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        overflow: 'hidden',
        width: '100%',
    },
    measureContent: {
        position: 'absolute',
        top: -10000000, // Move it out of view
        left: 0,
        right: 0,
    },
});

export default Teacheraddassessment;