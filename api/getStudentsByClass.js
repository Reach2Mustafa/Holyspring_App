import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";
const getStudentsByClass = async (date) => {
  const token = await AsyncStorage.getItem("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get(
      `/teacher/getStudentsByClass/${date}`,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);

    return null;
  }
};
export default getStudentsByClass;
