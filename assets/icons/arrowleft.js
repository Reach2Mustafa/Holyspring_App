import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ArrowLeft = ({ color }) => {
  return (
    <View>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M9.57 5.92993L3.5 11.9999L9.57 18.0699" stroke={color || "#fff"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M20.5019 12H3.67188" stroke={color || "#fff"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  );
}

export default ArrowLeft;
