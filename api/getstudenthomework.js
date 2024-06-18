import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";
const getstudenthomework = async () => {
  const token = await AsyncStorage.getItem("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get("/student/gethomework", {
      headers,
    });

    return response.data;
  } catch (error) {
    console.log(error);


    return null;
  }
};
export default getstudenthomework;
