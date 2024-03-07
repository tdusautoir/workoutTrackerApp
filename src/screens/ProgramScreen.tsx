import { useAuth } from '@/context/AuthContext';
import { Routes } from '@/navigation/Routes';
import { useQuery } from '@tanstack/react-query';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

export default function ProgramScreen({ navigation }: { navigation: any }) {
    const { authState } = useAuth();

    return (
        <SafeAreaView>
            <View className='p-12'>
                <Text className='text-2xl'>ProgramScreen</Text>
            </View>
        </SafeAreaView>
    );
}