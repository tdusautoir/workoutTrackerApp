import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from './Routes';
import HomeScreen from '@/screens/HomeScreen';

export default function RootNavigator() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Group>
                    <Stack.Screen name={Routes.HOME_SCREEN} component={HomeScreen} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer >
    )
}