import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Modal,
    Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { io } from "socket.io-client";

import { useRoute } from "@react-navigation/native";
import clsx from "clsx";
import { useUser } from "../../redux/userContext";
import getMessages from "../../api/getMessages";
import { IMAGE_BASE_URL, SOCKET_BASE_URL } from "../../api/variables";
import sendMessage from "../../api/sendMessage";
import Send from "../../assets/icons/send";
import Chatattach from "../../assets/icons/chatattach";
import formatDateAndDay from "../../utils/formatDateAndDay";

const Chating = () => {
    const chatContainerRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [pageload, setpageload] = useState(true);
    const { state } = useUser();
    const [fullScreenImage, setFullScreenImage] = useState(null);
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [selectedImageFile, setSelectedImageFile] = useState(null);
    const [imageloading, setimageloading] = useState(false);

    const [loadingImage, setLoadingImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const user = state.user;
    const route = useRoute();
    const { group } = route.params;
    useEffect(() => {
        console.log(group, "ggg")
    }, [group])
    const [imageLoadingStates, setImageLoadingStates] = useState({});
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollToEnd({ animated: true });
        }
    };
    const handleImageLoadStart = (uri) => {
        setImageLoadingStates((prevStates) => ({
            ...prevStates,
            [uri]: { loading: true, error: false },
        }));
    };

    const handleImageLoadEnd = (uri) => {
        setImageLoadingStates((prevStates) => ({
            ...prevStates,
            [uri]: { loading: false, error: false },
        }));
    };

    const handleImageError = (uri) => {
        setImageLoadingStates((prevStates) => ({
            ...prevStates,
            [uri]: { loading: false, error: true },
        }));
    };
    useEffect(() => {
        checkPermissions();
    }, []);

    useEffect(() => {
        checkPermissions();
    }, []);

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
            setSelectedImageUrl(result.assets[0].uri);
            setSelectedImageFile(result.assets[0].uri); // Correctly set the selected image file
        }
        setLoadingImage(false); // Stop loading once the URL is ready
    };


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (group && user) {
                    const previousMessages = await getMessages(group);

                    setMessages(previousMessages);
                    scrollToBottom()
                    if (previousMessages) {

                        setpageload(false);
                    }
                }
            } catch (error) {
                console.error("Error fetching previous messages:", error);
            }

        };

        fetchMessages();

    }, [group, user]);

    useEffect(() => {
        const socket = io(SOCKET_BASE_URL);
        setSocket(socket);
        socket.on("NewMessages", () => {

        });

        return () => {
            socket.disconnect();
        };
    }, [loading, user]);

    useEffect(() => {
        if (socket) {
            socket.emit("create_room", group);

            console.log("joinRoom called");

            return () => {
                socket.emit("leaveRoom", group); // Signal that the user is leaving the group
                console.log("leaveRoom called");
            };
        }
    }, [socket, group]);

    useEffect(() => {
        if (socket) {
            socket.on("chat", (data) => {
                console.log(data);
                setMessages([...messages, data]);
            });
        }
    }, [socket, messages]);

    useEffect(() => {
        // console.log(messages)
    }, [messages]);
    useEffect(() => {
        scrollToBottom();
    }, [messages, pageload]);

    const handleMessageSubmit = async () => {
        try {
            if (input || selectedImageFile) {
                setLoading(true);
                const data = await sendMessage(input, group, selectedImageFile);

                setMessages((prevMessages) => [...prevMessages, data]);
                setInput("");
                setSelectedImageFile(null);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className={`flex-1  h-full`}>
            {pageload ? <View className={`h-full w-full  justify-center items-center`}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View> : <View className={`flex-1 h-full`}>
                <View className={`w-full border-b border-gray-300`}>
                    <View className={`p-6`}>
                        <View className={`flex flex-row gap-2 items-end`}>

                            <Text
                                style={{
                                    fontFamily: "Avant",

                                    textTransform: "uppercase",

                                    fontSize: 20,
                                }}
                            >
                                chat
                            </Text>
                            <Text
                                className="text-gray-600 text-base "
                                style={{
                                    fontFamily: "Matter",

                                }}
                            >
                                Class-{group}
                            </Text>
                        </View>

                        <Text
                            className="text-gray-600 text-base"
                            style={{
                                fontFamily: "Matter",

                            }}
                        >
                            Chat with tutors and get help.
                        </Text>
                    </View>
                </View>
                <View className={`  w-full`}>

                    {messages ? (
                        <View className={` h-full`}>
                            {messages.length <= 0 ? (
                                <View className={`flex h-[80%] justify-center items-center`}>
                                    <Text className={`font-Matter font-medium`}>
                                        Start a Conversation now
                                    </Text>
                                </View>
                            ) : (
                                <ScrollView contentContainerStyle={{
                                    paddingTop: "16px"
                                }} ref={chatContainerRef}>
                                    <View className={`flex flex-col gap-2  px-4 py-8 pb-[240px]`}>
                                        {messages.map((each, index) => {
                                            const imageUri = (IMAGE_BASE_URL + each?.document);
                                            const { loading = false, error = false } =
                                                imageLoadingStates[imageUri] || {};

                                            return (
                                                <View className={`w-full`} key={index}>
                                                    {each?.document ? (
                                                        <View
                                                            className={clsx("border p-1 rounded-b-xl", each?.sender === user._id
                                                                ? `bg-[#EBF1FF] border-[#DDE7FD] rounded-l-xl self-end`
                                                                : `bg-[#F9FBFC] border-[#EBEEF5] rounded-r-xl self-start`,)}
                                                            style={[

                                                                { width: "60%" },

                                                                each?.sender === user._id
                                                                    ? { alignSelf: "flex-end" }
                                                                    : { alignSelf: "flex-start" },
                                                            ]}
                                                        >
                                                            <Text
                                                                className="font-medium text-sm px-2 pb-2"
                                                                style={{

                                                                    fontFamily: "Matter500",

                                                                }}
                                                            >
                                                                {each?.sendername}
                                                            </Text>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    if (!error) {
                                                                        setFullScreenImage(each?.document);
                                                                    }
                                                                }}
                                                            >
                                                                <View
                                                                    className="relative"
                                                                    style={{

                                                                        height: 300,
                                                                        width: "100%",
                                                                    }}
                                                                >
                                                                    <Image
                                                                        source={{ uri: imageUri.replace("public", "") }}
                                                                        style={{
                                                                            width: "100%",
                                                                            height: 300,
                                                                            display: loading ? "none" : "flex",
                                                                        }}
                                                                        resizeMode="cover"
                                                                        onLoadStart={() =>
                                                                            handleImageLoadStart(imageUri)
                                                                        }
                                                                        onLoadEnd={() => handleImageLoadEnd(imageUri)}
                                                                        onError={() => handleImageError(imageUri)}
                                                                    />
                                                                    {loading && (
                                                                        <View
                                                                            className="absolute inset-0 flex justify-center h-full w-full  rounded-md items-center bg-gray-200 "

                                                                        >
                                                                            <ActivityIndicator
                                                                                size="large"
                                                                                color="#0000ff"
                                                                                className={`absolute inset-0`}
                                                                            />
                                                                        </View>
                                                                    )}
                                                                    {error && (
                                                                        <View
                                                                            className={`absolute inset-0 flex justify-center h-full w-full  rounded-md items-center bg-gray-200`}
                                                                        >
                                                                            <Text
                                                                                className="text-red-500"
                                                                                style={{

                                                                                    fontFamily: "Matter",
                                                                                }}
                                                                            >
                                                                                Failed to load image
                                                                            </Text>
                                                                            {/* <ActivityIndicator size="large" color="#0000ff" /> */}
                                                                        </View>
                                                                    )}
                                                                </View>
                                                            </TouchableOpacity>
                                                            <View
                                                                className={` px-2  pb-1 pt-1 flex flex-col gap-1`}
                                                            >
                                                                <Text
                                                                    className="font-medium  text-base text-[#475464]"
                                                                    style={{

                                                                        fontFamily: "Matter",
                                                                        display: each?.message ? "" : "none",
                                                                    }}
                                                                >
                                                                    {each?.message}
                                                                </Text>
                                                                <Text
                                                                    className="text-xs"
                                                                    style={{

                                                                        alignSelf: "flex-end",
                                                                        fontFamily: "Matter",
                                                                    }}
                                                                >
                                                                    {formatDateAndDay(each?.timestamp).time}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    ) : (
                                                        <View
                                                            className={clsx("border p-3 rounded-b-xl", each?.sender === user._id
                                                                ? `bg-[#EBF1FF] border-[#DDE7FD] rounded-l-xl self-end`
                                                                : `bg-[#F9FBFC] border-[#EBEEF5] rounded-r-xl self-start`,)}
                                                            style={[

                                                                { maxWidth: "60%" },

                                                                each?.sender === user._id
                                                                    ? { alignSelf: "flex-end" }
                                                                    : { alignSelf: "flex-start" },
                                                            ]}
                                                        >
                                                            <View
                                                                className={`text-[#475464] font-Matter flex flex-col gap-1 font-medium`}
                                                            >
                                                                <Text
                                                                    className="font-medium text-sm"
                                                                    style={{

                                                                        fontFamily: "Matter",
                                                                        display:
                                                                            messages[index - 1]?.sender == each?.sender
                                                                                ? "none"
                                                                                : "",
                                                                    }}
                                                                >
                                                                    {each?.sendername}
                                                                </Text>
                                                                <Text
                                                                    className="font-medium text-base text-[#475464]"
                                                                    style={{

                                                                        fontFamily: "Matter",
                                                                    }}
                                                                >
                                                                    {each?.message}
                                                                </Text>
                                                                <Text
                                                                    className="text-xs"
                                                                    style={{

                                                                        alignSelf: "flex-end",
                                                                        fontFamily: "Matter",
                                                                    }}
                                                                >
                                                                    {formatDateAndDay(each?.timestamp).time}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    )}
                                                </View>
                                            );
                                        })}
                                    </View>
                                </ScrollView>
                            )}
                        </View>
                    ) : (
                        <View className={` flex  h-[80%]    w-full justify-center items-center`}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    )}

                    <Modal visible={!!fullScreenImage} transparent={true}>
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setFullScreenImage(null)}

                            >
                                <Text style={styles.closeButtonText}>&#10005;</Text>
                            </TouchableOpacity>
                            {fullScreenImage && (
                                <Image
                                    onLoadEnd={() => { setimageloading(false) }}
                                    source={{ uri: IMAGE_BASE_URL + fullScreenImage.replace("public", "") }}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        resizeMode: "contain",
                                    }}
                                    onError={() => setFullScreenImage(null)}
                                />
                            )}
                        </View>
                    </Modal>

                </View>
                <Modal
                    visible={!!selectedImageFile || loadingImage}
                    style={{ position: 'relative', height: '100%' }}
                >
                    <View className="px-3 w-full absolute bottom-2" style={{ zIndex: 60 }}>
                        <View></View>
                        <View
                            className={`flex flex-row border-2 w-full border-[#F7F7F7] bg-white rounded-full justify-between p-1`}
                        >
                            <View className={`px-4 h-[25.4px]  w-[80%]  my-2 text-[12.8px]`}>
                                <TextInput
                                    className="w-full h-full outline-none"
                                    style={{

                                        fontFamily: 'Matter',
                                    }}
                                    placeholder='Type your Message here...'
                                    value={input}
                                    onChangeText={(text) => setInput(text)}
                                />
                            </View>
                            <TouchableOpacity
                                onPress={handleMessageSubmit}
                                className={`flex flex-row h-full items-center`}
                            >
                                <TouchableOpacity onPress={handleMessageSubmit}>
                                    {loading ? (
                                        <ActivityIndicator size='small' color='#0000ff' />
                                    ) : input.trim().length <= 0 && !selectedImageFile ? (
                                        <Send />
                                    ) : (
                                        <Send color='#205FFF' />
                                    )}
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setSelectedImageFile(null)}
                        >
                            <Text style={styles.closeButtonText}>&#10005;</Text>
                        </TouchableOpacity>
                        {selectedImageFile && (
                            <Image
                                source={{ uri: selectedImageFile }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'contain',
                                }}
                                onError={() => setSelectedImageFile(null)}
                            />
                        )}
                        {loadingImage && (
                            <View className={`absolute inset-0 bg-gray-300`}>
                                <ActivityIndicator
                                    size='large'
                                    color='#0000ff'
                                    className={`absolute inset-0`}
                                />
                            </View>
                        )}
                    </View>
                </Modal>

                <View className={`px-3 w-full absolute bottom-2`}>
                    <View></View>
                    <View
                        className={`flex flex-row border-2 w-full border-[#F7F7F7] bg-white rounded-full justify-between p-1`}
                    >
                        <View className={`px-4 h-[25.4px]  w-[80%]  my-2 text-[12.8px]`}>
                            <TextInput
                                className="w-full h-full outline-none"
                                style={{

                                    fontFamily: "Matter",
                                }}
                                placeholder="Type your Message here..."
                                value={input}
                                onChangeText={(text) => setInput(text)}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={handleMessageSubmit}
                            className={`flex flex-row h-full items-center`}
                        >
                            <TouchableOpacity onPress={pickImage}>
                                <Chatattach color={selectedImageFile ? "#205FFF" : "#D8D8D8"} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleMessageSubmit}>
                                {loading ? (
                                    <ActivityIndicator size="small" color="#0000ff" />
                                ) : input.trim().length <= 0 && !selectedImageFile ? (
                                    <Send />
                                ) : (
                                    <Send color="#205FFF" />
                                )}
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>}

        </View>
    );
};

export default Chating;

const styles = {
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 1)', // Semi-transparent black background
    },
    closeButton: {
        position: 'absolute',
        top: 16, // Equivalent to top-4 (4 * 4px = 16px)
        right: 16, // Equivalent to right-4 (4 * 4px = 16px)
        zIndex: 10, // Position the close button
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18, // Equivalent to text-lg (varies based on your base font size, typically 18px)
    },
};
