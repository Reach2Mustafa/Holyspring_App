import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";
const Edithomeworkadmin = async (id, description) => {
    const token = await AsyncStorage.getItem("token")
    const requestData = {
        description: description
    };
    const headers = {
        authorization: `Bearer ${token}`,
    };
    try {
        const response = await axiosInstance.post(`/admin/Edithomework/${id}`, requestData, {
            headers,
        });

        return response.data;
    } catch (error) {
        console.log(error);


        return null;
    }
};
export default Edithomeworkadmin;
