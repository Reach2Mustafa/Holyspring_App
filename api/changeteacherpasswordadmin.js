import axiosInstance from "./axiosinstance";
import AsyncStorage from '@react-native-async-storage/async-storage';
const ChangeteacherPasswordByadmin = async (teacherId, newpassword) => {
    const requestData = {
        teacherId: teacherId,
        password: newpassword,
    };
    const token = await AsyncStorage.getItem("token")

    const headers = {
        authorization: `Bearer ${token}`,
    };
    try {
        const response = await axiosInstance.post('/admin/changeteacherpassword', requestData, { headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        return { error: error.response.data.error };

    }
};
export default ChangeteacherPasswordByadmin;