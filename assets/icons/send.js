import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const Send = ({ color }) => {
  return (
    <Svg width={34} height={34} viewBox="0 0 34 34" fill="none">
      <Path
        d="M17.7321 9.70123L25.7365 13.7035C29.3286 15.4995 29.3216 18.434 25.7365 20.2371L17.7321 24.2393C12.351 26.9334 10.1448 24.7272 12.8389 19.3462L14.0269 16.9703L12.8389 14.5944C10.1448 9.21332 12.3439 7.01422 17.7321 9.70123Z"
        stroke={color || "#D8D8D8"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.4693 16.8012L19.5393 16.7941"
        stroke={color || "#D8D8D8"}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Send;
