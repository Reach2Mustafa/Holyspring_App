import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Modal,
  Image,
  Easing,
  ScrollView,
  ToastAndroid,
} from "react-native";
import Arrowdown from "../../../assets/icons/Arrowdown";

import Attachment from "../../../assets/icons/attachment";
import * as ImagePicker from "expo-image-picker";

import { router } from "expo-router";
import { useUser } from "../../../redux/userContext";
import clsx from "clsx";
import Removefile from "../../../assets/icons/removefile";
import Preview from "../../../assets/icons/preview";
import addhomeworkteacher from "../../../api/addhomework";
import getFormattedDate from "../../../utils/getFormattedDate";

const TeacherAddhomework = () => {
  const { state } = useUser();
  const user = state.user;
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const [subject, setSubject] = useState("");
  const [class1, setClass1] = useState("");
  const [arrowRotation] = useState(new Animated.Value(0));
  const [arrowRotation1] = useState(new Animated.Value(0));
  const [expandedClass, setExpandedClass] = useState(false);
  const [expandedSubject, setExpandedSubject] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;
  const heightAnim1 = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);
  const [contentHeight1, setContentHeight1] = useState(0);
  const [selectedClass, setSelectedClass] = useState();
  const [selectedSubject, setSelectedSubject] = useState();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);
  const [file, Setfile] = useState();
  const [date, Setdate] = useState(getFormattedDate());
  useEffect(() => {
    if (user) {
      setLoading(false);
      checkPermissions();
    }
  }, [user]);

  useEffect(() => {
    console.log(selectedImageFile, "kkkkk");
  }, [selectedImageFile]);

  const heightAnimClass = useRef(new Animated.Value(0)).current;
  const heightAnimSubject = useRef(new Animated.Value(0)).current;

  const [contentHeightClass, setContentHeightClass] = useState(0);
  const [contentHeightSubject, setContentHeightSubject] = useState(0);

  const toggleExpandClass = () => {
    Animated.timing(heightAnimClass, {
      toValue: expandedClass ? 0 : contentHeightClass,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setExpandedClass(!expandedClass);
  };

  const toggleExpandSubject = () => {
    Animated.timing(heightAnimSubject, {
      toValue: expandedSubject ? 0 : contentHeightSubject,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setExpandedSubject(!expandedSubject);
  };

  useEffect(() => {
    console.log(contentHeightClass);
    console.log(contentHeightSubject);
  }, [contentHeightClass, contentHeightSubject]);

  const checkPermissions = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      requestPermissions();
    }
  };

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Please grant permission to access the media library to select an image."
      );
    }
  };
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

  const pickImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      requestPermissions();
      return;
    }
    setLoadingImage(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // Start loading
      Setfile(result.assets[0]);
      setSelectedImageFile(result.assets[0].uri); // Correctly set the selected image file
    }
    setLoadingImage(false); // Stop loading once the URL is ready
  };

  const addhomework = async () => {
    if (description.trim() == 0) {
      return ToastAndroid.show("Please add description", ToastAndroid.SHORT);
    }
    if (!class1) {
      return ToastAndroid.show("Please select class", ToastAndroid.SHORT);
    }
    if (!subject) {
      return ToastAndroid.show("Please select subject", ToastAndroid.SHORT);
    }
    setLoading1(true);
    const data = await addhomeworkteacher(
      class1,
      subject,
      description,
      selectedImageFile
    );
    console.log(data);
    if (data.error) {
      setLoading1(false);
      return ToastAndroid.show(
        "Something went wrong try again",
        ToastAndroid.SHORT
      );
    }
    ToastAndroid.show("Homework added successfully", ToastAndroid.SHORT);
    router.navigate("/teacher/homework");

    console.log(selectedClass, selectedSubject, description, selectedImageFile);
  };
  useEffect(() => {
    console.log(selectedImageFile);
  }, [selectedImageFile]);
  if (loading) {
    return (
      <View className={`flex justify-center items-center h-full`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <ScrollView className={` h-full flex-1 `}>
        <View>
          <View className={`w-full sticky top-0  border-b border-gray-300`}>
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
                  Add Homework
                </Text>

                <Text
                  className={"text-gray-600 text-base"}
                  style={{ fontFamily: "Matter" }}
                >
                  {date}
                </Text>
              </View>
            </View>
          </View>
          <View className={` flex flex-col p-6 gap-[16px]`}>
            <View style={styles.descriptionContainer}>
              <Text
                className=" pb-2"
                style={{ fontSize: 16, fontFamily: "Matter500" }}
              >
                Description
              </Text>
              <TextInput
                className="text-[#858585] px-3  border-[1px] border-[#EDEEF4] active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl  pt-3.5 pb-[14.4px] bg-white"
                style={[
                  { fontSize: 16, fontFamily: "Matter" }, // Set the font size explicitly
                ]}
                placeholder="Enter description"
                value={description}
                onChangeText={setDescription}
                multiline
              />
            </View>
            <View className={`relative w-full flex items-center`}>
              <Text
                className=" pb-2 w-full"
                style={{ fontSize: 16, fontFamily: "Matter500" }}
              >
                Subject
              </Text>

              <TouchableOpacity
                onPress={() => {
                  toggleExpand();
                }}
                className={`relative flex w-full items-center`}
              >
                <TextInput
                  readOnly
                  value={subject}
                  className="text-[#858585] px-3 uppercase  border-[1px] border-[#EDEEF4] active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl  pt-3.5 pb-[14.4px] bg-white"
                  style={[
                    { fontSize: 16, fontFamily: "Matter" }, // Set the font size explicitly
                  ]}
                  placeholder="Select Subject"
                />
                <TouchableOpacity
                  onPress={() => {
                    toggleExpand();
                  }}
                  className={`absolute right-3 h-full  flex flex-row items-center`}
                >
                  <Animated.View
                    className="absolute right-3 h-full flex flex-row items-center"
                    style={[
                      {
                        transform: [
                          {
                            rotate: arrowRotation.interpolate({
                              inputRange: [0, 1],
                              outputRange: ["0deg", "180deg"],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
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
                <View
                  className={`w-[100%]  mt-2 py-1 border-[1px] border-[#EDEEF4] rounded-xl bg-[#FAFBFC]`}
                >
                  {user?.subjects.map((sub, index) => (
                    <Text
                      key={index}
                      className="px-3 py-3 duration-300 font-medium text-[#707070] border-[#EDEEF4] uppercase w-full hover:text-[#707070] hover:bg-[#EDEDED] text-[16px] leading-none"
                      style={[
                        {
                          fontFamily: "Matter",
                          borderBottomWidth:
                            index !== user.subjects.length - 1 ? 1 : 0,
                        },
                      ]}
                    >
                      {sub}
                    </Text>
                  ))}
                </View>
              </View>
              <Animated.View style={[styles.content, { height: heightAnim }]}>
                <View
                  className={`w-[100%]  mt-2 py-1 border-[1px] border-[#EDEEF4] rounded-xl bg-[#FAFBFC]`}
                >
                  {user?.subjects.map((sub, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        setSubject(sub);
                        toggleExpand();
                      }}
                    >
                      <Text
                        key={index}
                        className="px-3 py-3 duration-300 font-medium text-[#707070] border-[#EDEEF4] uppercase w-full hover:text-[#707070] hover:bg-[#EDEDED] text-[16px] leading-none"
                        style={[
                          {
                            fontFamily: "Matter",
                            borderBottomWidth:
                              index !== user.subjects.length - 1 ? 1 : 0,
                          },
                        ]}
                      >
                        {sub}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Animated.View>
            </View>
            <View className={`relative w-full flex items-center`}>
              <Text
                className=" w-full pb-2"
                style={{ fontSize: 16, fontFamily: "Matter500" }}
              >
                Class
              </Text>

              <TouchableOpacity
                onPress={() => {
                  toggleExpand1();
                }}
                className={`relative flex w-full items-center`}
              >
                <TextInput
                  readOnly
                  value={class1}
                  className="text-[#858585] px-3  border-[1px] border-[#EDEEF4] active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl  pt-3.5 pb-[14.4px] bg-white"
                  style={[
                    { fontSize: 16, fontFamily: "Matter" }, // Set the font size explicitly
                  ]}
                  placeholder="Select Class"
                />
                <TouchableOpacity
                  className={`absolute right-3 h-full  flex flex-row items-center`}
                >
                  <Animated.View
                    className="absolute right-3 h-full flex flex-row items-center"
                    style={[
                      {
                        transform: [
                          {
                            rotate: arrowRotation1.interpolate({
                              inputRange: [0, 1],
                              outputRange: ["0deg", "180deg"],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
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
                <View
                  className={`w-[100%]  mt-2 py-1 border-[1px] border-[#EDEEF4] rounded-xl bg-[#FAFBFC]`}
                >
                  {user?.teachingclass.map((sub, index) => (
                    <Text
                      key={index}
                      className="px-3 py-3 duration-300 font-medium text-[#707070] border-[#EDEEF4] uppercase w-full hover:text-[#707070] hover:bg-[#EDEDED] text-[16px] leading-none"
                      style={[
                        {
                          fontFamily: "Matter",
                          borderBottomWidth:
                            index !== user.subjects.length - 1 ? 1 : 0,
                        },
                      ]}
                    >
                      {sub}
                    </Text>
                  ))}
                </View>
              </View>
              <Animated.View style={[styles.content, { height: heightAnim1 }]}>
                <View
                  className={`w-[100%]  mt-2 py-1 border-[1px] border-[#EDEEF4] rounded-xl bg-[#FAFBFC]`}
                >
                  {user?.teachingclass.map((sub, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        setClass1(sub);
                        toggleExpand1();
                      }}
                    >
                      <Text
                        key={index}
                        className="px-3 py-3 duration-300 font-medium text-[#707070] border-[#EDEEF4] uppercase w-full hover:text-[#707070] hover:bg-[#EDEDED] text-[16px] leading-none"
                        style={[
                          {
                            fontFamily: "Matter",
                            borderBottomWidth:
                              index !== user.subjects.length - 1 ? 1 : 0,
                          },
                        ]}
                      >
                        {sub}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Animated.View>
            </View>
            <View>
              <Text
                className=" w-full pb-2"
                style={{ fontSize: 16, fontFamily: "Matter500" }}
              >
                Attachment <Text className={`text-[#858585] `}>(optional)</Text>
                {/* {selectedImageFile && <Text onPress={() => setSelectedImageFile(null)} style={{ ...tw`  text-[#F42F52]`, fontSize: 16, fontFamily: "Inter-Black" }}>  Remove</Text>} */}
              </Text>

              <TouchableOpacity
                className={clsx(
                  "text-[#858585] px-3 mt-3  border-[1px]  active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full  justify-center items-center rounded-xl  pt-3.5 pb-[14.4px] bg-white flex flex-row ",
                  selectedImageFile ? "border-[#205FFF]" : "border-[#EDEEF4]"
                )}
                style={{
                  height: 150,
                }}
                onPress={() => {
                  if (!selectedImageFile) {
                    pickImage();
                  }
                }}
              >
                {selectedImageFile ? (
                  <View
                    id="fileList"
                    className={clsx(
                      " h-full w-full flex justify-center items-center"
                    )}
                  >
                    <View className=" w-[200px] flex flex-col gap-2">
                      <View className=" relative border-[#E4E4E4] flex flex-row items-center px-3  pb-2 gap-2 w-full border-[1px]  rounded-lg ">
                        <Preview />
                        <View className=" leading-none flex flex-col gap-1">
                          <Text
                            style={{ fontFamily: "Matter" }}
                            className=" font-Matter text-[14.4px] text-[#3C3C3C]"
                          >
                            {file?.fileName.length > 15
                              ? `${file?.fileName.substring(0, 15)}...`
                              : file?.fileName}
                          </Text>
                          <Text
                            style={{ fontFamily: "Matter500" }}
                            className=" font-Matter font-medium text-[14.4px] text-[#999999]"
                          >
                            {(file?.fileSize / (1024 * 1024)).toFixed(2)} MB
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedImageFile(null), Setfile(null);
                          }}
                          className=" absolute -top-3.5  -right-1.5"
                        >
                          <Text onClick={() => {}}>
                            <Removefile />
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <Text
                        onPress={() => {
                          setFullScreenImage(true);
                        }}
                        className=" font-Matter  underline text-[#205FFF] text-center"
                      >
                        Preview
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View className=" font-Matter text-[#4B5563]  font-medium">
                    <View className="flex flex-row items-center justify-center gap-2">
                      <Attachment color={selectedImageFile ? "#205FFF" : ""} />
                      <Text style={{ fontFamily: "Matter500" }} className=" ">
                        Upload Media
                      </Text>
                    </View>
                    <Text
                      style={{ fontFamily: "Matter" }}
                      className=" text-center text-[#9CA3AF] font-normal pt-2 text-[14.4px]"
                    >
                      Click here to upload a file.
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              <Modal visible={fullScreenImage !== null} transparent={true}>
                <View className="flex-1 justify-center items-center bg-black">
                  <TouchableOpacity
                    className="absolute top-4 right-4 z-10"
                    onPress={() => setFullScreenImage(null)}
                  >
                    <Text className="text-white text-lg">&#10005;</Text>
                  </TouchableOpacity>
                  <Image
                    source={{ uri: selectedImageFile }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                  />
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="px-4 pb-4">
        <View
          className={`flex  flex-row justify-between  border-[1px] border-[#E4E4E5] rounded-full px-2  py-2 items-center`}
        >
          <TouchableOpacity>
            <Text
              style={{ fontFamily: "Matter500" }}
              className=" text-[16px] px-2"
            >
              Add Homework
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={addhomework}>
            <Text className="rounded-full text-white font-bold w-[100px] text-center bg-blue-500  px-3 py-4">
              {loading1 ? <ActivityIndicator color={"#fff"} /> : " ADD "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dropdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdown: {
    flex: 1,
    margin: 10,
  },
  measureContent: {
    position: "absolute",
    top: -1000, // Move it out of view
    left: 0,
    right: 0,
  },
  content: {
    overflow: "hidden",
    width: "100%",
  },
  text: {
    padding: 20,
    color: "white",
    textAlign: "center",
  },
  descriptionContainer: {
    marginTop: 20,
  },
  textInput: {
    height: 100,
    fontSize: 16,
    fontFamily: "Inter-Black",
    textAlignVertical: "top",
  },
});

export default TeacherAddhomework;
