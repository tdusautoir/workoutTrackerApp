import { useAuth } from '@/context/AuthContext';
import { Routes } from '@/navigation/Routes';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList } from 'react-native';

type Data = Array<{
    id: number;
    name: string;
}>;

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

    if (isLoading) {
        return (
            <SafeAreaView>
                <View className='p-12'>
                    <Text className='text-2xl'>Lancer un programme</Text>
                    <Text className='text-gray-500 text-xs'>Chargement...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <View className='p-12'>
                <Text className='text-2xl'>Lancer un programme</Text>
                {data && data.length < 1 && <Text className='text-gray-500 text-xs'>Vous n'avez pas encore ajouté de programme</Text>}
                {(data && data.length > 0) &&
                    <View className='mb-[100px]'>
                        <FlatList
                            data={data as Data}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={() => navigation.navigate(Routes.LAUNCH_PROGRAM_SCREEN, { id: item.id })}
                                        className='border-2 border-gray-300 p-4 rounded-lg mt-4'>
                                        <Text>{item.name as string}</Text>
                                    </TouchableOpacity>
                                )
                            }} />
                    </View>
                }
            </View>
        </SafeAreaView>
    );
}