import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const DashboardCard = ({ data, name, name1, submitted, total, teacher }) => {
  return (
    <View className={`flex-1 px-4`}>

      <View className={`h-full w-full p-6 rounded-3xl border border-[#F1F1F1] bg-[#FAFAFC] flex flex-col justify-between`}>
        <Text className="font-medium pb-4 text-lg leading-none" style={{
          fontFamily: "Matter500", fontSize: 20,
          lineHeight: 20,
        }} >{name}</Text>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>{teacher ? "This month" : name == "Assessment" ? "Completed" : "This month"}:</Text>
          <Text style={styles.dataValue}>{submitted}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Total:</Text>
          <Text style={styles.dataValue}>{total}</Text>
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

export default DashboardCard;
