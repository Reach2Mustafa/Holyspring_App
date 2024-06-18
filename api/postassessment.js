import axiosInstance from "./axiosinstance";
import { BACK_KEY } from "./variables";
import AsyncStorage from '@react-native-async-storage/async-storage';
const postAssessment = async (standard, subject, title, assessment) => {
    const token = await AsyncStorage.getItem("token");
    const headers = {
        authorization: `Bearer ${token}`,
    };
    const requestData = {
        standard: standard,
        subject: subject,
        title: title,
        assessment: assessment
    };
    try {
        const response = await axiosInstance.post('/teacher/postAssessment', requestData, {
            headers,
        });

        return response.data;
    } catch (error) {

        console.log(error);
        return { error: error.response.data.error };

    }
};
export default postAssessment;