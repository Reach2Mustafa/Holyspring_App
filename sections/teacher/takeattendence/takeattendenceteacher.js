import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import getStudentsByClass from "../../../api/getStudentsByClass";
import Uploadattendance from "../../../api/uploadattendance";
import { router } from "expo-router";
import getFormattedDate from "../../../utils/getFormattedDate";

const Takeattendenceteacher = () => {
  const route = useRoute();
  const { date } = route.params;

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState({});
  const [reload, setreload] = useState(false);
  const [btnloading, setbtnloading] = useState(false);
  const [date1, setdate1] = useState(getFormattedDate());

  useEffect(() => {
    const getAllStudents = async () => {
      const data = await getStudentsByClass(date);
      setStudents(data);
      const initialAttendance = data.reduce((acc, student) => {
        console.log(student);
        acc[student._id] = {
          ispresent:
            student.isPresent != null
              ? student.isLate == "yes"
                ? "late"
                : student.isPresent
              : "present",
          islate: student.isLate == "yes" ? true : false,
        };
        return acc;
      }, {});
      setAttendance(initialAttendance);
      setLoading(false);
    };
    if (date) {
      getAllStudents();
    }
  }, [date, reload]);

  const handleStudentClick = (id) => {
    setAttendance((prevAttendance) => {
      const currentStatus = prevAttendance[id].ispresent;
      let newStatus;
      let isLate = false;
      switch (currentStatus) {
        case "present":
          newStatus = "absent";
          break;
        case "absent":
          newStatus = "late";
          isLate = true;
          break;
        case "late":
          newStatus = "present";
          break;
        default:
          newStatus = "present";
      }
      return {
        ...prevAttendance,
        [id]: { ispresent: newStatus, islate: isLate },
      };
    });
  };

  const formatAttendanceData = async () => {
    return Object.keys(attendance).map((id) => ({
      _id: id,
      isPresent:
        attendance[id].ispresent == "late"
          ? "present"
          : attendance[id].ispresent,
      isLate: attendance[id].islate == true ? "yes" : "no",
    }));
  };

  const handleUpload = async () => {
    const formattedData = await formatAttendanceData();
    console.log(formattedData);

    const data = {
      date: date,
      students: formattedData,
    };
    setbtnloading(true);

    const upload = await Uploadattendance(data);
    if (upload.error) {
      setbtnloading(false);
      return ToastAndroid.show(
        "Something went wrong! Try uploading again",
        ToastAndroid.SHORT
      );
    }
    console.log(upload);
    setreload(true);
    setbtnloading(false);
    ToastAndroid.show("Attendance uploaded Successfully", ToastAndroid.SHORT);

    router.navigate("/teacher/home");
  };

  if (loading) {
    return (
      <View className={`flex justify-center items-center h-full`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className=" flex-1">
      <ScrollView style={styles.container}>
        <View className={` `}>
          <View className={`w-full sticky top-0 border-b border-gray-300`}>
            <View className={`p-6`}>
              <Text
                style={{
                  fontFamily: "Avant",
                  fontFeatures: [{ salt: 1 }],
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Select Students
              </Text>

              <Text
                className="text-gray-600 text-base"
                style={{ fontFamily: "Matter" }}
              >
                {date1}
              </Text>
            </View>
          </View>
          <View className={` p-6`}>
            {students?.map((student) => (
              <TouchableOpacity
                key={student._id}
                style={[
                  styles.studentItem,
                  attendance[student._id].ispresent === "present" &&
                    styles.present,
                  attendance[student._id].ispresent === "absent" &&
                    styles.absent,
                  attendance[student._id].islate && styles.late,
                ]}
                onPress={() => handleStudentClick(student._id)}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.studentText}>{student.name}</Text>
                  <Text
                    className="text-[13.76px]"
                    style={{ fontFamily: "Matter" }}
                  >
                    {student.rollno}
                  </Text>
                </View>
                <Text className="   uppercase" style={[styles.statusText]}>
                  {attendance[student._id].ispresent
                    ? attendance[student._id].ispresent
                    : "unmarked"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="px-4 py-4">
        <View
          className={`flex  flex-row justify-between  border-[1px] border-[#E4E4E5] rounded-full px-2 py-2 items-center`}
        >
          <TouchableOpacity>
            <Text
              style={{ fontFamily: "Matter500" }}
              className=" text-[16px] px-2"
            >
              Mark Attendance
            </Text>
          </TouchableOpacity>
          <View className=" flex  gap-4 flex-row">
            <TouchableOpacity
              className={`bg-[#205FFF] w-[120px] py-4 rounded-full items-center `}
              onPress={async () => handleUpload()}
            >
              <Text className={`text-white text-md font-medium`}>
                {btnloading ? <ActivityIndicator color={"#fff"} /> : "Upload"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  studentItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  present: {
    backgroundColor: "#d4edda",
    borderColor: "#c3e6cb",
  },
  absent: {
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
  },
  late: {
    backgroundColor: "#fff3cd",
    borderColor: "#ffeeba",
  },
  studentText: {
    fontSize: 18,
    fontFamily: "Matter500",
  },
  statusText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Matter",
  },
});

export default Takeattendenceteacher;
