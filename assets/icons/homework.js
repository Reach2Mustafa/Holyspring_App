import React from 'react'
import Svg, { Path } from 'react-native-svg';

const Homework = ({ color }) => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M16.6673 6.8763V15.0013C16.6673 17.5013 15.1757 18.3346 13.334 18.3346H6.66732C4.82565 18.3346 3.33398 17.5013 3.33398 15.0013V6.8763C3.33398 4.16797 4.82565 3.54297 6.66732 3.54297C6.66732 4.05964 6.87563 4.5263 7.2173 4.86797C7.55896 5.20963 8.02565 5.41797 8.54232 5.41797H11.459C12.4923 5.41797 13.334 4.5763 13.334 3.54297C15.1757 3.54297 16.6673 4.16797 16.6673 6.8763Z"
        stroke={color || "#16191D"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.3327 3.54297C13.3327 4.5763 12.491 5.41797 11.4577 5.41797H8.54102C8.02435 5.41797 7.55766 5.20963 7.21599 4.86797C6.87433 4.5263 6.66602 4.05964 6.66602 3.54297C6.66602 2.50964 7.50768 1.66797 8.54102 1.66797H11.4577C11.9743 1.66797 12.441 1.87631 12.7827 2.21797C13.1244 2.55964 13.3327 3.0263 13.3327 3.54297Z"
        stroke={color || "#16191D"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.66602 10.832H9.99935"
        stroke={color || "#16191D"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.66602 14.168H13.3327"
        stroke={color || "#16191D"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default Homework
