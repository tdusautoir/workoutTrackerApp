import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './Routes';
import HomeScreen from '@/screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LayoutIcon from '../../assets/icons/layout.svg';
import HelpCircleIcon from '../../assets/icons/help-circle.svg';
import LogoutIcon from '../../assets/icons/logout.svg';
import DumbellIcon from '../../assets/icons/dumbell.svg';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import WorkoutScreen from '@/screens/WorkoutScreen';
import { TouchableOpacity, Text, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';

const { theme } = resolveConfig(tailwindConfig) as TwTheme;

const LogoutComponent = () => {
    const { onLogout } = useAuth();

    return (
        <TouchableOpacity
            className='flex-1 items-center justify-center'
            onPress={() => onLogout()}>
            <View className='items-center justify-center'>
                <LogoutIcon stroke={theme.colors.gray[400]} />
            </View>
        </TouchableOpacity>)
}

export default function RootNavigator() {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    borderTopWidth: 0,
                    position: 'absolute',
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === Routes.HOME_SCREEN) {
                        return <LayoutIcon stroke={color} />
                    }

                    if (route.name === Routes.WORKOUT_SCREEN) {
                        return <DumbellIcon stroke={color} />
                    }

                    return <HelpCircleIcon stroke={color} />;
                },
                tabBarLabel: () => null,
            })}>
                <Tab.Group>
                    <Tab.Screen name={Routes.HOME_SCREEN} component={HomeScreen} />
                    <Tab.Screen name={Routes.WORKOUT_SCREEN} component={WorkoutScreen} />
                    <Tab.Screen name="Logout" component={LogoutComponent} options={{
                        tabBarButton: (props) => (<LogoutComponent {...props} />),
                    }} />
                </Tab.Group>
            </Tab.Navigator>
        </NavigationContainer >
    )
}