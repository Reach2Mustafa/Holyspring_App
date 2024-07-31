import axiosInstance from "./axiosinstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
const MarkHoliday = async (requestData) => {
  const token = await AsyncStorage.getItem("token");

  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.post(
      "/admin/addholiday",
      requestData,
      { headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: error.response.data?.error || "Unexpected error occured" };
  }
};
export default MarkHoliday;
