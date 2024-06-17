import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
;

export default function Hero() {
    const [animationTrigger, setAnimationTrigger] = useState(false);

    const handlePress = () => {
        setAnimationTrigger(!animationTrigger);
    };

    return (

        <TouchableOpacity onPress={handlePress}>
            <MotiView
                from={{ opacity: 0.5, height: 20 }}
                animate={{ opacity: animationTrigger ? 1 : 0.5, height: animationTrigger ? 200 : 20 }}
                transition={{ type: 'spring', damping: 5, stiffness: 100 }}
                className=" bg-black"
            >
                <Text style={styles.text}>Click Me!</Text>
            </MotiView>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    box: {
        width: 200,
        height: 200,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 18,
    },
});
