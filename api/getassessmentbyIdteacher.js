import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";
const getassessmentbyIdteacher = async (class1) => {
    const token = await AsyncStorage.getItem("token");
    const headers = {
        authorization: `Bearer ${token}`,
    };
    try {
        const response = await axiosInstance.get(
            `/teacher/getassessmentbyId/${class1}`,
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
export default getassessmentbyIdteacher;
