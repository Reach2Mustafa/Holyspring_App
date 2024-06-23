import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const DoneIcon = () => {
    return (
        <View>
            <Svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <Path
                    d="M7.75 12L10.58 14.83L16.25 9.17004"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </Svg>
        </View>
    );
};

export default DoneIcon;
