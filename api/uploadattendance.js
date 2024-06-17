import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";
const Uploadattendance = async (requestData) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axiosInstance.post(
      "/teacher/addattendance",
      requestData,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: error.response.data.error };
  }
};
export default Uploadattendance;
