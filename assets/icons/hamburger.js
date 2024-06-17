import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const HamburgerMenu = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.bar}></View>
        <View style={styles.bar1}></View>
        <View style={styles.bar2}></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 35,
    height: 20,
    justifyContent: 'space-between',
    alignItems:""
  },
  bar: {
    width: 35,
    height: 3,
    backgroundColor: 'black',
    borderRadius: 2,
    
  },
  bar1: {
    width: 35,
    backgroundColor: 'black',
    height: 3,
    borderRadius: 2,
   
  },
  bar2: {
    width: 35,
    height: 3,
    backgroundColor: 'black',
   
    borderRadius: 2,
   
  },
});

export default HamburgerMenu;
