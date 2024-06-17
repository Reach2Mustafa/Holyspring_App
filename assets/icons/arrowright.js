import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ArrowRight = ({ color }) => {
  return (
    <View>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M14.4297 5.92969L20.4997 11.9997L14.4297 18.0697" stroke={color || "#fff"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M3.5 12H20.33" stroke={color || "#fff"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </View>
  );
};

export default ArrowRight;
