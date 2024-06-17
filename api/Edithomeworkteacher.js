import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";
const Edithomeworkteacher = async (id,description) => {
    const token = await AsyncStorage.getItem("token")
    const requestData = {
        description: description
    };
  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.post(`/teacher/Edithomework/${id}`,requestData ,{
      headers,
    });

    return response.data;
  } catch (error) {
    console.log(error);
   
   
    return null;
  }
};
export default Edithomeworkteacher;
