import axiosInstance from "./axiosinstance";
import { BACK_KEY } from "./variables";
import AsyncStorage from '@react-native-async-storage/async-storage';
const login1 = async (email, password) => {
    const requestData = {
        rollno: email,
        password: password,
    };
    try {
        const response = await axiosInstance.post('/student/login', requestData);
        await AsyncStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {

        console.log(error);
            return { error: error.response.data.error };
       
    }
};
export default login1;