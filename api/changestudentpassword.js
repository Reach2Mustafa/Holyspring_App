import axiosInstance from "./axiosinstance"; 
import AsyncStorage from '@react-native-async-storage/async-storage';
const ChangeStudentPassword = async (oldpassword, newpassword) => {
    const requestData = {
        oldpassword: oldpassword,
        newpassword: newpassword,
    };
    const token = await AsyncStorage.getItem("token")
   
    const headers = {
      authorization: `Bearer ${token}`,
    };
    try {
        const response = await axiosInstance.post('/student/changepassword', requestData,{headers}); 
        console.log(response.data);
        return response.data;
    } catch (error) { 
            return { error: error.response.data.error };
       
    }
};
export default ChangeStudentPassword;