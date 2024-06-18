import React from 'react'
import Svg, { Path } from 'react-native-svg';
const Remark = ({ color }) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.00019 15V10.5M10.0002 15V6M13.0002 15V9M5.49996 2H14.5001C15.6047 2 16.5002 2.89545 16.5001 4.00004L16.4999 16C16.4999 17.1046 15.6045 18 14.4999 18L5.49987 18C4.3953 18 3.49987 17.1045 3.49988 15.9999L3.49996 3.99999C3.49996 2.89542 4.39539 2 5.49996 2Z"
        stroke={color || "#16191D"}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Remark
