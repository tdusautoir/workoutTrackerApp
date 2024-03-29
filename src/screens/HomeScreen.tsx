import { useAuth } from '@/context/AuthContext';
import { Routes } from '@/navigation/Routes';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

export default function HomeScreen({ navigation }: { navigation: any }) {
    const { authState } = useAuth();

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['workouts'],
        queryFn: async () => {
            const url = process.env.EXPO_PUBLIC_API_URL;
            const response = await fetch(url + '/program/last', {
                headers: { 'Authorization': `Bearer ${authState.token}` }
            });

            if (!response.ok && response.status === 404) {
                return null;
            }

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
                <Text className='text-2xl'>Bonjour, <Text className='text-xl'>{authState.user.email}</Text></Text>
                <View>
                    <Text className='text-3xl font-semibold pt-12'>Programmes</Text>
                    {isLoading && <Text className='text-gray-500 text-xs'>Chargement...</Text>}
                    {!isLoading && <>
                        {data ? <>
                            <Text className='text-gray-500'>Dernier programme ajouté : </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(Routes.PROGRAM_SCREEN, { program: data })}
                                className='border-2 border-gray-300 p-4 rounded-lg mt-4'>
                                <Text>{data.name}</Text>
                            </TouchableOpacity>
                        </> : <>
                            <Text className='text-gray-500 text-xs'>Vous n'avez pas encore ajouté de programme</Text>
                        </>
                        }
                        <TouchableOpacity
                            onPress={() => navigation.navigate(Routes.ADD_PROGRAM_SCREEN)}
                            className='bg-secondary p-4 rounded-lg mt-4'>
                            <Text className='text-primary'>Ajouter un programme</Text>
                        </TouchableOpacity>
                    </>}
                </View>
                <View>
                    <Text className='text-3xl font-semibold pt-12'>Exercises</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(Routes.EXERCISES_SCREEN)}
                        className='bg-secondary p-4 rounded-lg mt-4'>
                        <Text className='text-primary'>Voir tout les exercises</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}