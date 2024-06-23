import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";
const getStudentById = async (id) => {
  const token = await AsyncStorage.getItem("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.get(`/admin/getstudent/${id}`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.log(error);

    return { error: error.response.data.error };
  }
};
export default getStudentById;
