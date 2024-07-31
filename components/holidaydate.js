import React, { useState } from 'react'
import { ActivityIndicator, Text, ToastAndroid, TouchableOpacity } from 'react-native';
import MarkHoliday from '../api/markholiday';
import Getattendancedatesadmin from '../api/getaatendancedatesadmin';

const Holidaydate = ({ entry, index, entryIndex,setAttendence }) => {
    const [lastPress, setLastPress] = useState(0);
    const DOUBLE_PRESS_DELAY = 300; // Double press interval in milliseconds
    const [dateLoad, setdateLoad] = useState(false);

    const toggleHoliday = async (val, targetDate) => {
        setdateLoad(true);
        const res = await MarkHoliday({ date: targetDate, isHoliday: val });
        
        if (res?.error) {
            ToastAndroid.show(res?.error, ToastAndroid.SHORT);
            return;
        }
        const data = await Getattendancedatesadmin();
        setAttendence(data);
        setdateLoad(false);
        ToastAndroid.show(res?.data, ToastAndroid.SHORT);
        setdateLoad(false)
    };

    const handlePress = (value, date, index) => {
        const now = Date.now();

        if (now - lastPress < DOUBLE_PRESS_DELAY) {

            console.log(date);
            toggleHoliday(!value, date);
        } else {
            ToastAndroid.show(
                !value
                    ? "Press one more time to mark it as holiday."
                    : "Press one more time to un-mark holiday.",
                ToastAndroid.SHORT
            );
        }
        setLastPress(now);
    };
    return (
        <TouchableOpacity
            onPress={() =>
                handlePress(entry.holiday, entry.date, index)
            }
            key={entryIndex}
            className="p-2"
            style={{
                width: "20%",
            }}
        >
           
              

       
                <Text
                    className="border-[#EAEAEE]  border-[1px] py-3 rounded-lg  text-[15px]  text-center"
                    style={{
                        fontFamily: "Matter",
                        fontWeight: "bold",
                        fontSize: 16,
                        textDecorationLine: entry.holiday
                            ? "line-through"
                            : "",
                        color: entry.holiday || dateLoad ? "#fff" : "#737A82",
                        borderColor: entry.holiday
                            ? "#0470BC"
                            : "#EAEAEE",

                        backgroundColor: entry.holiday
                            ? "#0470BC"
                            : "#fff",
                    }}
                >
                    {dateLoad?
                    
                    <ActivityIndicator size="small" color="#0000ff" />:
                    entryIndex + 1

                }
                </Text>
         
        </TouchableOpacity>
    )
}

export default Holidaydate
