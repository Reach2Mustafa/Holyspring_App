import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// Custom hook for detecting if an element is in view
const useIntersectionObserver = () => {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { threshold: 0.5 } // Adjust threshold as needed
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return { ref, inView };
};

const AnimatedInView = () => {
    const { ref, inView } = useIntersectionObserver();

    // Example animation control
    const animatedStyles = {
        opacity: inView ? 1 : 0,
        transform: [{ translateY: inView ? 0 : 50 }],
        transition: { duration: 500 } // Adjust animation duration
    };

    return (
        <View style={styles.container}>
            <View ref={ref} style={[styles.box, animatedStyles]}>
                <Text style={styles.text}>Animated View</Text>
            </View>
            {/* Additional content below */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight + 20 // Adjust as needed
    },
    box: {
        width: 200,
        height: 200,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default AnimatedInView;
