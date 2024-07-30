import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  Image,
  Modal,
} from "react-native";
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AddRemarkapi from "../../../api/addremark";
import { useNavigation } from "expo-router";
import clsx from "clsx";
import Attachment from "../../../assets/icons/attachment";
import Preview from "../../../assets/icons/preview";
import Removefile from "../../../assets/icons/removefile";

const Card = ({ field, details, bg }) => {
  return (
    <View className={clsx("flex-row w-full ", bg ? "bg-[#efefef]" : "")}>
      <Text
        className="w-28 text-[#737A82] font-medium text-[16px] leading-5"
        style={{ fontFamily: "Matter500", wordBreak: "break-word" }}
      >
        {field}
      </Text>
      <Text
        className="text-[16px] w-[60%] leading-5"
        style={{ fontFamily: "Matter", wordBreak: "break-word" }}
      >
        {details}
      </Text>
    </View>
  );
};

const TeacherAddRemark = ({}) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const route = useRoute();
  
  const navigation = useNavigation();
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [file, Setfile] = useState();
  const [loadingImage, setLoadingImage] = useState(false);
 
  const { id, student } = route.params;

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
      Setfile(result.assets[0]);
      setSelectedImageFile(result.assets[0].uri); // Correctly set the selected image file
    }
    setLoadingImage(false); // Stop loading once the URL is ready
  };

  const handleSubmit = async () => {
    if (description.trim().length === 0) {
      return ToastAndroid.show("Description Required", ToastAndroid.SHORT);
    }
    setLoading(true);

    // You can include image handling here if needed

    const data = await AddRemarkapi(description, id, selectedImageFile);
 
    console.log(data, "mmmkjboi");
    if (data) {
      ToastAndroid.show("Remark Added", ToastAndroid.SHORT);
      navigation.navigate("teacher/home");
    }
    setLoading(false);
  };
  useEffect(() => {
  
     
      checkPermissions();
  
  }, []);
  return (
    <View className="flex-1">
      <ScrollView>
        <View className="flex-1 pb-10">
          <View className="w-full border-b border-gray-300">
            <View className="px-6 pt-6 pb-3">
              <Text
                style={{
                  fontFamily: "Avant",
                  textTransform: "uppercase",
                  fontSize: 20,
                }}
              >
                Add Remark
              </Text>
              <Text
                className="text-gray-600 pt-1 text-sm"
                style={{
                  fontFamily: "Matter",
                }}
              >
                This remark reflects on the -{" "}
                <Text
                  style={{
                    fontFamily: "Matter500",
                  }}
                  className="text-black"
                >
                  {student}
                </Text>{" "}
                performance.
              </Text>
            </View>
          </View>
          <View className="px-6 pt-8 flex flex-col gap-4">
            <View>
              <Text
                className="pb-4"
                style={{ fontSize: 16, fontFamily: "Matter500" }}
              >
                Remark
              </Text>
              <TextInput
                className="text-[#858585] px-3 min-h-[300px] text-start border-[1px] border-[#EDEEF4] active:border-[1px] focus:border-[1px] focus:border-[#205FFF] w-full rounded-xl pt-3.5 pb-[14.4px] bg-white"
                style={{
                  fontSize: 16,
                  fontFamily: "Matter",
                  textAlignVertical: "top",
                }}
                placeholder={`Add remark for ${student}`}
                value={description}
                onChangeText={setDescription}
                multiline
              />
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
        <View className="flex flex-row justify-between border-[1px] border-[#E4E4E5] rounded-full px-2 py-2 items-center">
          <Text
            style={{
              fontFamily: "Matter500",
            }}
            className="leading-none pb-1 px-2 text-[16px]"
          >
            Add Remark
          </Text>
          <TouchableOpacity
            onPress={handleSubmit}
            className="rounded-full w-[80px] flex items-center bg-[#205FFF]"
          >
            <Text
              style={{ fontFamily: "Matter500" }}
              className="text-white leading-none text-[14px] py-2.5 pb-[14px] font-medium"
            >
              {loading ? <ActivityIndicator color={"#fff"} /> : "Add"}
            </Text>
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

export default TeacherAddRemark;
