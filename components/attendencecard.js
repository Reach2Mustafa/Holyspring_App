import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const AttendanceCard = ({ present, absent, late }) => {
  return (
    <View className={"mx-4"} style={{ ...styles.card }}>
      <Text style={styles.title}>Attendance</Text>
      <View style={styles.content}>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Present:</Text>
          <Text style={styles.dataValue}>{present}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Absent:</Text>
          <Text style={styles.dataValue}>{absent}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Late:</Text>
          <Text style={styles.dataValue}>{late}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {

    padding: 24,
    borderRadius: 24,
    borderColor: '#F1F1F1',
    borderWidth: 1,
    backgroundColor: '#FAFAFC',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: "Matter500",
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 20,
  },
  content: {
    marginTop: 16,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dataLabel: {
    fontFamily: "Matter500",
    fontSize: 16,
    color: '#8A8A8A',
  },
  dataValue: {
    fontFamily: "Matter",
    fontSize: 16,
  },
});

export default AttendanceCard;
