
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";
const getpushtoken = async (id) => {
    const token = await AsyncStorage.getItem("token")
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const requestData = {
    token: id
};
  try {
    const response = await axiosInstance.post(`/notification/getstudentpushtoken`,requestData, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.log(error);
   
   
    return null;
  }
};
export default getpushtoken;
