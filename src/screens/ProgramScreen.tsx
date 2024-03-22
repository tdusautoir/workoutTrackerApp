import { useAuth } from '@/context/AuthContext';
import { Routes } from '@/navigation/Routes';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import PlusIcon from '../../assets/icons/plus.svg';
import PlusSquareIcon from '../../assets/icons/plus-square.svg';
import Spinner from '@/components/Spinner/Spinner';

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


const { theme } = resolveConfig(tailwindConfig) as TwTheme;

export default function ProgramScreen({ navigation, route }: Props) {
    const { authState } = useAuth();

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['program'],
        queryFn: async () => {
            const url = process.env.EXPO_PUBLIC_API_URL;
            const response = await fetch(url + '/program/' + route.params.program.id, {
                headers: { 'Authorization': `Bearer ${authState.token}` }
            });
            return response.json() as Promise<Program>;
        }
    })

    const updateProgram = async ({ name, id }: { name: string, id: number }) => {
        setLoading(true);
        const url = process.env.EXPO_PUBLIC_API_URL + '/program/' + id;
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + authState.token
            },
            body: JSON.stringify({ name, workouts })
        });
        setLoading(false);
        const result = await res.json();

        console.log(result);

        if (res.status !== 200) {
            if (result && result.message) {
                alert(result.message);
            } else {
                alert('Erreur lors de la modification du programme');
            }

            return;
        }

        alert('Programme modifié');
        // refetch();
    }

    const [workouts, setWorkouts] = useState<Array<string>>([]);
    const [loading, setLoading] = useState(false);

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
                {data?.WorkoutOnProgram.length === 0 && <>
                    <Text className='mb-4'>Aucune séance</Text>
                    <View className='gap-4'>
                        {workouts.map((session, index) => (
                            <View key={index} className='flex-row justify-between'>
                                <TextInput
                                    key={index}
                                    placeholder={'Séance ' + (index + 1)}
                                    placeholderTextColor={theme.colors.gray[400]}
                                    keyboardType='default'
                                    className='bg-gray-200 text-sm px-4 pt-2 pb-3 rounded-lg flex-1 mr-2'
                                    onChangeText={(value) => {
                                        const newSessions = [...workouts];
                                        newSessions[index] = value;
                                        setWorkouts(newSessions);
                                    }} />
                                <TouchableOpacity
                                    onPress={() => {
                                        const newSessions = [...workouts];
                                        newSessions.splice(index, 1);
                                        setWorkouts(newSessions);
                                    }}
                                    className='h-10 bg-gray-200 px-2 rounded-lg items-center justify-center'>
                                    <View className='rotate-45'><PlusIcon color={theme.colors.gray[900]} /></View>
                                </TouchableOpacity>
                            </View>
                        ))}
                        {workouts.length < 7 && <TouchableOpacity
                            onPress={() => {
                                if (workouts.length >= 7) return;
                                setWorkouts((prev) => [...prev, 'Séance ' + (prev.length + 1)]);
                            }}
                            className={'flex-row h-10 bg-secondary gap-x-2 pl-4 rounded-lg pr-1 items-center justify-center'}>
                            <Text className='font-semibold text-md text-primary'>Ajouter une Séance</Text>
                            <PlusSquareIcon width={24} height={24} stroke={theme.colors.primary} />
                        </TouchableOpacity>}
                        <TouchableOpacity
                            onPress={() => updateProgram({ name: data?.name, id: data?.id })}
                            className={'flex-row h-10 bg-secondary gap-x-2 pl-4 rounded-lg pr-1 items-center justify-center' + (loading ? " pr-4" : "")}>
                            {!loading ?
                                <>
                                    <Text className='font-semibold text-md text-primary'>Modifier le programme</Text>
                                </> : <Spinner width={24} height={24} stroke={theme.colors.primary} />
                            }
                        </TouchableOpacity>
                    </View>
                </>}
                {data?.WorkoutOnProgram.map((workout) => (
                    <TouchableOpacity onPress={() => navigation.navigate(Routes.WORKOUT_SCREEN, { workout })} key={workout.id} className='border-2 border-gray-300 p-4 rounded-lg mt-4'>
                        <Text>{workout.workout.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
}