import 'react-native-reanimated'
import 'react-native-gesture-handler'
import NetInfo from "@react-native-community/netinfo";
import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import "../public/fonts/Avant/stylesheet.css";
import "../public/fonts/polysans/stylesheet.css";
import "../public/fonts/matter/stylesheet.css";
import "./global.css"
import { useFonts } from 'expo-font';
import Hero from '../sections/hero';
import { Slot, usePathname } from 'expo-router';
import { UserProvider } from '../redux/userContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Menu from '../components/menu';
import { useEffect, useState } from 'react';
import App from '../App';
import HamburgerMenu from '../assets/icons/hamburger';
// import HamburgerMenu from '../assets/icons/hamburger';

export default function _layout() {
    const [fontsLoaded] = useFonts({
        "Matter": require("../public/fonts/Matter-Regular.ttf"),
        "Matter500": require("../public/fonts/Matter-Medium.ttf"),
        "Avant": require("../public/fonts/Avant Garde Bold.ttf"),


    });
    const [isConnected, setIsConnected] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const navigation = usePathname();
    const [drawerAnimation] = useState(new Animated.Value(0));
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    const toggleDrawer = () => {
        const toValue = drawerOpen ? 0 : 1;
        Animated.timing(drawerAnimation, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();
        setDrawerOpen(!drawerOpen);
    };
    useEffect(() => {
        // Hide drawer if we are at '/'
        if (navigation) {
            if (navigation === "/") {
                setDrawer(true);
            } else {
                setDrawer(false);
            }
            closeDrawer();
            console.log(navigation);
        }
    }, [navigation]);

    const closeDrawer = () => {
        Animated.timing(drawerAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        setDrawerOpen(false);
    };
    if (fontsLoaded) {

        return (
            <UserProvider>
                <SafeAreaView style={{ flex: 1, }}>
                    {isConnected ? (
                        <>
                            <App />
                            <View style={{ flex: 1 }}>
                                <View className="pt-12 flex-1">

                                    <Slot />
                                </View>
                                <Animated.View
                                    className="border-r-[1px] border-[#E2E4E8]"
                                    style={{

                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        width: 200,
                                        backgroundColor: "#F7F8FA",
                                        transform: [
                                            {
                                                translateX: drawerAnimation.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [-300, 0],
                                                }),
                                            },
                                        ],
                                    }}
                                >
                                    <SafeAreaView style={{ position: "relative", flex: 1 }}>
                                        <TouchableOpacity className={`  absolute  right-2 top-2`} onPress={toggleDrawer}>
                                            <Text className={` text-[24px] text-[#737A82]`} >&#10005;</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity >

                                            <Menu />
                                        </TouchableOpacity>
                                    </SafeAreaView>
                                </Animated.View>
                                {drawerOpen || drawer ? (
                                    ""
                                ) : (
                                    <TouchableOpacity
                                        onPress={toggleDrawer}
                                        style={{
                                            overflow: "hidden",
                                            position: "absolute",
                                            top: 0,
                                            left: 0,

                                            borderRadius: 99999999999,
                                            display: "flex", // A very large number for a circular shape
                                            width: 55, // Width of the button
                                            height: 55, // Height of the button
                                            justifyContent: "center", // Center content vertically
                                            alignItems: "center", // Center content horizontally
                                        }}
                                    >
                                        <Text
                                            style={{ color: "white", fontFamily: "Matter500" }}
                                        >
                                            <HamburgerMenu onPress={toggleDrawer} />
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </>
                    ) : (
                        <View
                            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                        >
                            <Text>No internet connection</Text>
                        </View>
                    )}
                </SafeAreaView>
            </UserProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
