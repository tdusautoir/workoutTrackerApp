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
import { TouchableOpacity, Text, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProgramsScreen from '@/screens/ProgramsScreen';
import AddProgramScreen from '@/screens/AddProgramScreen';
import ProgramScreen from '@/screens/ProgramScreen';

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


const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <HomeStack.Screen name={"Default"} component={HomeScreen} />
            <HomeStack.Screen name={Routes.PROGRAM_SCREEN} component={ProgramScreen} />
            <HomeStack.Group screenOptions={{ presentation: 'modal' }}>
                <HomeStack.Screen name={Routes.ADD_PROGRAM_SCREEN} component={AddProgramScreen} />
            </HomeStack.Group>
        </HomeStack.Navigator>
    );
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

                    if (route.name === Routes.PROGRAMS_SCREEN) {
                        return <DumbellIcon stroke={color} />
                    }

                    return <HelpCircleIcon stroke={color} />;
                },
                tabBarLabel: () => null,
            })}>
                <Tab.Group>
                    <Tab.Screen name={Routes.HOME_SCREEN} component={HomeStackScreen} />
                    <Tab.Screen name={Routes.PROGRAMS_SCREEN} component={ProgramsScreen} />
                    <Tab.Screen name="Logout" component={LogoutComponent} options={{
                        tabBarButton: (props) => (<LogoutComponent {...props} />),
                    }} />
                </Tab.Group>
            </Tab.Navigator>
        </NavigationContainer >
    )
}