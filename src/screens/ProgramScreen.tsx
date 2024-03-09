import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

type Props = {
    navigation: any;
    route: any;
}

type Program = {
    id: number;
    name: string;
    WorkoutOnProgram: Array<{
        id: number;
        workout: {
            id: number;
            name: string;
            ExerciseOnWorkout: Array<any>;
        }
    }>
}

export default function ProgramScreen({ navigation, route }: Props) {
    const { authState } = useAuth();

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['workout'],
        queryFn: async () => {
            const url = process.env.EXPO_PUBLIC_API_URL;
            const response = await fetch(url + '/program/' + route.params.program.id, {
                headers: { 'Authorization': `Bearer ${authState.token}` }
            });
            return response.json() as Promise<Program>;
        }
    })

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
                {data?.WorkoutOnProgram.map((workout) => (
                    <View key={workout.id} className='border-2 border-gray-300 p-4 rounded-lg mt-4'>
                        <Text>{workout.workout.name}</Text>
                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
}