import { useAuth } from '@/context/AuthContext';
import { Routes } from '@/navigation/Routes';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

export default function ProgramsScreen({ navigation }: { navigation: any }) {
    const { authState } = useAuth();

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['workouts'],
        queryFn: async () => {
            const url = process.env.EXPO_PUBLIC_API_URL;
            const response = await fetch(url + '/program', {
                headers: { 'Authorization': `Bearer ${authState.token}` }
            });
            return response.json();
        }
    })

    useFocusEffect(
        useCallback(() => {
            refetch();

            return () => { };
        }, [])
    );

    return (
        <SafeAreaView>
            <View className='p-12'>
                <Text className='text-2xl'>Programmes</Text>
                {isLoading && <Text className='text-gray-500 text-xs'>Chargement...</Text>}
                {!isLoading && data.length < 1 && <Text className='text-gray-500 text-xs'>Vous n'avez pas encore ajouté de programme</Text>}
                {!isLoading && data.length > 0 && data.map((program: any) => (
                    <View key={program.id} className='border-2 border-gray-300 p-4 rounded-lg mt-4'>
                        <Text>{program.name as string}</Text>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
}