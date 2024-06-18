import React from 'react'
import Svg, { Path } from 'react-native-svg';
const Assessment = ({ color }) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M2.91602 15.0013V5.83464C2.91602 2.5013 3.74935 1.66797 7.08268 1.66797H12.916C16.2493 1.66797 17.0827 2.5013 17.0827 5.83464V14.168C17.0827 14.2846 17.0827 14.4013 17.0743 14.518"
        stroke={color || "#16191D"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.29102 12.5H17.0827V15.4167C17.0827 17.025 15.7743 18.3333 14.166 18.3333H5.83268C4.22435 18.3333 2.91602 17.025 2.91602 15.4167V14.875C2.91602 13.5667 3.98268 12.5 5.29102 12.5Z"
        stroke={color || "#16191D"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.66602 5.83203H13.3327"
        stroke={color || "#16191D"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.66602 8.75H10.8327"
        stroke={color || "#16191D"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>

  )
}

export default Assessment
