import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/screens/LoginScreen';
import { Routes } from './Routes';
import RegisterScreen from '@/screens/RegisterScreen';

export default function AuthNavigator() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Group>
                    <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
                    <Stack.Screen name={Routes.REGISTER_SCREEN} component={RegisterScreen} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}