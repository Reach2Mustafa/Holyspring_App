import React from 'react'
import { Circle, Path, Svg } from 'react-native-svg'

const Removefile = () => {
    return (
        <Svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Circle cx="8" cy="8" r="7.5" fill="white" stroke="#E4E4E4" />
            <Path d="M5 11.0508L11.0502 5.00053" stroke="#7E7E7E" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M11.0502 11.0502L5 5" stroke="#7E7E7E" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    )
}

export default Removefile
