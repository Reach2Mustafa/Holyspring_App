import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";

const addHomework = async (standard, subject, description, file) => {
  try {
    console.log(file);
    // Retrieve the user's token from AsyncStorage
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    // Set request headers
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    // Create FormData object for sending the message and optional file
    const data = new FormData();
    data.append("standard", standard);
    data.append("subject", subject);
    data.append("description", description);
    if (file) {
      // Extract file name from the URI
      const uriParts = file.split("/");
      const fileName = uriParts[uriParts.length - 1];


      data.append("homework", {
        uri: file,
        name: fileName,
        type: `image/jpeg`, // Set the type according to your file type, in this case, it's jpeg
      });
    }
    // Send POST request to the backend API
    const response = await axiosInstance.post(`/teacher/addHomework`, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.log("Error sending message:", error.response);
    return null;
  }
};

export default addHomework;
