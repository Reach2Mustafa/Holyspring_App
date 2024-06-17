import React from 'react'
import { Path, Rect, Svg } from 'react-native-svg'

const Assbtn = ({ color }) => {
    return (
        <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect width="30" height="30" rx="15" transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 30 0)" fill={color || "#9B9B9B"} />
            <Path d="M17.5 22.5L10.6102 16.3258C9.79658 15.5966 9.79658 14.4034 10.6102 13.6742L17.5 7.5" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    )
}

export default Assbtn
