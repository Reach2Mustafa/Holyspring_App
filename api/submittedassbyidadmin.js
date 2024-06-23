import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";
const getsubmittedassesmentbyidadmin = async (id, userId) => {
    const token = await AsyncStorage.getItem("token")
    const headers = {
        authorization: `Bearer ${token}`,
    };
    try {
        const response = await axiosInstance.get(`/admin/getsubmittedassesmentbyid/${id}/${userId}`, {
            headers,
        });

        return response.data;
    } catch (error) {
        console.log(error);


        return null;
    }
};
export default getsubmittedassesmentbyidadmin;
