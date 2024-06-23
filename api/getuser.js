import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from 'expo-updates';
import axiosInstance from "./axiosinstance";

const getuser = async (token) => {
  const headers = {
    authorization: `Bearer ${token}`,
  };

  try {
    // Try to get student data
    const studentResponse = await axiosInstance.get("/student/getStudent", {
      headers,
    });
    return studentResponse.data;
  } catch (studentError) {
    console.log("Error fetching student data:", studentError);

    try {
      // If student request fails, try to get teacher data
      const teacherResponse = await axiosInstance.get("/teacher/getTeacher", {
        headers,
      });
      return teacherResponse.data;
    } catch (teacherError) {
      console.log("Error fetching teacher data:", teacherError);

      try {
        // If teacher request fails, try to get admin data
        const adminResponse = await axiosInstance.get("/admin/getadmin", {
          headers,
        });
        return adminResponse.data;
      } catch (adminError) {
        console.log("Error fetching admin data:", adminError);

        // If all requests fail, clear the token and reload the app
        AsyncStorage.removeItem("token");
        await Updates.reloadAsync();
        return null;
      }
    }
  }
};

export default getuser;
