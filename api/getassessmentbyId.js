import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";
const getassessmentbyId = async (id) => {
    const token = await AsyncStorage.getItem("token")
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get(`/student/getassessmentbyId/${id}`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.log(error);
   
   
    return null;
  }
};
export default getassessmentbyId;
