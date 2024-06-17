import axiosInstance from "./axiosinstance";
import { BACK_KEY } from "./variables";
import AsyncStorage from '@react-native-async-storage/async-storage';
const getScoreForAssessment = async (requestData) => {
    const token = await AsyncStorage.getItem("token")
    const headers = {
      authorization: `Bearer ${token}`,
    };
    try {
        const response = await axiosInstance.post('/student/getScoreForAssessment', requestData,{headers});
       console.log(response.data)
        return response.data;
    } catch (error) {

        console.log(error);
            return { error: error.response.data.error };
       
    }
};
export default getScoreForAssessment;