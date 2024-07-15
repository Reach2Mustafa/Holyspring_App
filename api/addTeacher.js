import axiosInstance from "./axiosinstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AddTeacher = async (
  name,
  email,
  password,
  phone,
  subjects,
  teachingclass,
  classteacher
) => {
  const requestData = {
    name: name,
    email: email,
    password: password,
    phone: phone,
    subjects: subjects,
    teachingclass: teachingclass,
    classteacher: classteacher,
  };
  const token = await AsyncStorage.getItem("token");

  const headers = {
    authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.post(
      "/admin/teacherRegister",
      requestData,
      { headers }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    return { error: error.response.data.error };
  }
};
export default AddTeacher;
