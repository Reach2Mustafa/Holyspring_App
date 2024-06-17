import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";

const sendMessage = async (message, standard, file) => {
  try {
    console.log(file)
    // Retrieve the user's token from AsyncStorage
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }


    // Set request headers
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    };

    // Create FormData object for sending the message and optional file
    const data = new FormData();
    data.append('message', message);
    data.append('standard', standard);
    if (file) {
      // Extract file name from the URI
      const uriParts = file.split('/');
      const fileName = uriParts[uriParts.length - 1];
      
      // Append the file to FormData with the extracted file name
      data.append('chat', {
        uri: file,
        name: fileName,
        type: `image/jpeg`, // Set the type according to your file type, in this case, it's jpeg
      });
    }
    // Send POST request to the backend API
    const response = await axiosInstance.post(
      `/chat/sendMessage`,
      data,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    return null;
  }
};

export default sendMessage;