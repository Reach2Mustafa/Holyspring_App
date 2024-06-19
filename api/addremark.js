import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";

const AddRemarkapi = async (description, id) => {
  try {
    // Retrieve the user's token from AsyncStorage
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    // Set request headers
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const data = {
      studentId: id,
      remark: description,
    };
    console.log(data, "kkkkkkkkkkk");

    // Send POST request to the backend API
    const response = await axiosInstance.post(`/teacher/addremark`, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.log("Error sending message:", error.response);
    return null;
  }
};

export default AddRemarkapi;
