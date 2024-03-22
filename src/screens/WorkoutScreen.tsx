import { useAuth } from '@/context/AuthContext';
import { Routes } from '@/navigation/Routes';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';

type Props = {
    navigation: any;
    route: any;
}

type Workout = {
    id: number;
    name: string;
    ExerciseOnWorkout: Array<{
        exercise: {
            id: number;
            name: string;
            description: string;
            sets: number;
            reps: number;
            rest: number;
            typeId: number;
        }
    }>;
    WorkoutHistory: Array<any>;
}

export default function WorkoutScreen({ navigation, route }: Props) {
    const { authState } = useAuth();

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['workout'],
        queryFn: async () => {
            const url = process.env.EXPO_PUBLIC_API_URL;
            const response = await fetch(url + '/workout/' + route.params.workout.id, {
                headers: { 'Authorization': `Bearer ${authState.token}` }
            });
            return response.json() as Promise<Workout>;
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
                    <Text className='text-2xl'>Chargement...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <View className='p-12'>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text>Retour</Text>
                </TouchableOpacity>
                <Text className='text-2xl'>{data?.name}</Text>
                <Text className='text-lg'>Exercises</Text>
                {data?.ExerciseOnWorkout.length === 0 && <Text className='text-gray-500 text-xs'>Vous n'avez pas encore ajouté d'exercises</Text>}
                {(data?.ExerciseOnWorkout && data?.ExerciseOnWorkout.length > 0) && <FlatList
                    data={data.ExerciseOnWorkout as unknown as Workout['ExerciseOnWorkout']}
                    keyExtractor={(item) => item.exercise.id.toString()}
                    renderItem={({ item }) => {
                        return <View
                            className='border-2 border-gray-300 p-4 rounded-lg mt-4'>
                            <Text>{item.exercise.name}</Text>
                        </View>
                    }} />}
                <TouchableOpacity
                    onPress={() => navigation.navigate(Routes.ADD_EXERCISE_SCREEN, { workout: data })}
                    className='bg-secondary p-4 rounded-lg mt-4'>
                    <Text className='text-primary'>Ajouter un exercise</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}