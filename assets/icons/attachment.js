import React from 'react'
import { Svg, Path } from 'react-native-svg';
const Attachment = ({color}) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M9.32031 6.50141L11.8803 3.94141L14.4403 6.50141"
      stroke={color||"#292D32"}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.8809 14.1817V4.01172"
      stroke={color||"#292D32"}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 12C4 16.42 7 20 12 20C17 20 20 16.42 20 12"
      stroke={color||"#292D32"}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
  )
}

export default Attachment
