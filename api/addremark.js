import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";

const AddRemarkapi = async (description, id, file) => {
  console.log("kkkkkkkkkkkkkk");
  try {
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
    console.log(description);

    const data = new FormData();
    data.append("remark", description);
    data.append("studentId", id);
    if (file) {
      // Extract file name from the URI
      const uriParts = file.split("/");
      const fileName = uriParts[uriParts.length - 1];

      data.append("remarkpic", {
        uri: file,
        name: fileName,
        type: `image/jpeg`, // Set the type according to your file type, in this case, it's jpeg
      });
    }
    console.log(data, "kkkkkkkkkkk");

    // Send POST request to the backend API
    const response = await axiosInstance.post(`/teacher/addremark`, data, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.log("Error sending message:", error);
    return null;
  }
};

export default AddRemarkapi;
