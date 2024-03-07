import { useEffect } from "react";
import { Animated, Easing } from "react-native";
import Loader from '../../../assets/icons/loader.svg';

export default function Spinner({ width, height, stroke }: { width: number, height: number, stroke: string }) {
    const spinValue = new Animated.Value(0);

    const spin = () => {
        spinValue.setValue(0);
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: true
        }).start(() => spin())
    }

    useEffect(() => {
        spin();
    }, [])

    const rotate = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    return <Animated.View style={{ transform: [{ rotate }] }}>
        <Loader width={width} height={height} stroke={stroke} />
    </Animated.View>
}