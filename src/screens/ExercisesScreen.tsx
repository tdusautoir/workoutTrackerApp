import { useAuth } from '@/context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native';

type Data = Array<{
    id: number;
    name: string;
    description: string;
    sets: number;
    reps: number;
    rest: number;
    typeId: number;
}>;

export default function ExercisesScreen({ navigation }: { navigation: any }) {
    const { authState } = useAuth();

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['exercises'],
        queryFn: async () => {
            const url = process.env.EXPO_PUBLIC_API_URL;
            const response = await fetch(url + '/exercise', {
                headers: { 'Authorization': `Bearer ${authState.token}` }
            });
            return response.json();
        }
    });

    return (
        <SafeAreaView>
            <View className='p-12'>
                <Text className='text-2xl'>Exercices</Text>
                {isLoading && <Text>Chargement...</Text>}

                <View className='mt-4 flex flex-row justify-between mb-[100px]'>
                    {(data && data.length > 0) &&
                        <FlatList
                            data={data as Data}
                            keyExtractor={(item) => item.id.toString()}
                            ItemSeparatorComponent={() => <View className='h-[2px] bg-gray-300 my-6' />}
                            renderItem={({ item }) => {
                                return (
                                    <View className='flex flex-col gap-y-2'>
                                        <Text className='text-lg'>{item.name}</Text>
                                        <View>
                                            <Text className='mb-2 font-medium'>Description :</Text>
                                            <Text>{item.description}</Text>
                                        </View>
                                        <View className='flex flex-row justify-between ,m'>
                                            {item.sets && <Text>sets : {item.sets}</Text>}
                                            {item.reps && <Text>reps : {item.reps}</Text>}
                                            {item.rest && <Text>rest : {item.rest}</Text>}
                                        </View>
                                    </View>
                                )
                            }} />
                    }
                </View>
            </View>
        </SafeAreaView>
    );
}