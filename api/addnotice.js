import axiosInstance from "./axiosinstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AddNoticeApi = async (requestData) => {
  const token = await AsyncStorage.getItem("token");

  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.post("/admin/addnotice", requestData, {
      headers,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return { error: error.response.data.error };
  }
};
export default AddNoticeApi;
