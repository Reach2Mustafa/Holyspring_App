import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./axiosinstance";
const getsinglestudentremarkadmin = async (id) => {
    const token = await AsyncStorage.getItem("token");
    const headers = {
        authorization: `Bearer ${token}`,
    };
    console.log(token, "tttttttttttttttt");
    try {
        const response = await axiosInstance.get(
            `/admin/getstudentremarks/${id}`,
            {
                headers,
            }
        );

        return response.data;
    } catch (error) {
        console.log(error.response);

        return null;
    }
};
export default getsinglestudentremarkadmin;
