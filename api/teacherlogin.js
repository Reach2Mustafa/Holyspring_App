import axiosInstance from "./axiosinstance";
import { BACK_KEY } from "./variables";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Teacherlogin = async (email, password) => {
    const requestData = {
        email: email,
        password: password,
    };
    try {
        const response = await axiosInstance.post('/teacher/login', requestData);
        await AsyncStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {

        console.log(error);
            return { error: error.response.data.error };
       
    }
};
export default Teacherlogin;