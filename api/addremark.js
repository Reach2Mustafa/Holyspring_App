import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";

const AddRemarkapi = async (description, id, file) => {
  console.log("Preparing to send request");

  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    const data = new FormData();
    data.append("remark", description);
    data.append("studentId", id);

    if (file) {
      const uriParts = file.split("/");
      const fileName = uriParts[uriParts.length - 1];

      data.append("remarkpic", {
        uri: file,
        name: fileName,
        type: `image/jpeg`, // Adjust type according to the actual file type
      });
    }

    console.log("FormData before sending:", data);

    const response = await axiosInstance.post(`/teacher/addremark`, data, { headers });

    return response.data;
  } catch (error) {
    console.log("Error sending message:", error);
    return error;
  }
};

export default AddRemarkapi;
