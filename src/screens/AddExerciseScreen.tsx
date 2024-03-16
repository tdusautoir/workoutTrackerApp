import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import Spinner from '@/components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';

const { theme } = resolveConfig(tailwindConfig) as TwTheme;

type Data = Array<{
    id: number;
    name: string;
    description: string;
    sets: number;
    reps: number;
    rest: number;
    typeId: number;
}>;

export default function AddExerciseScreen({ navigation, route }: { navigation: any, route: any }) {
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

    const addExercise = async () => {
        if (!chosenExercise) {
            alert('Veuillez choisir un exercise');
            return;
        }

        setLoading(true);
        const url = process.env.EXPO_PUBLIC_API_URL + '/workout/' + route.params.workout.id + '/exercise';
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + authState.token
            },
            body: JSON.stringify({ exerciseId: chosenExercise })
        });
        setLoading(false);
        const result = await res.json();

        if (res.status !== 200) {
            if (result && result.message) {
                alert(result.message);
            } else {
                alert('Erreur lors de l\'ajout de l\'exercise à la séance');
            }

            return;
        }

        alert('Exercise ajouté à la séance avec succès');
        navigation.goBack();
    }


    const [loading, setLoading] = useState(false);
    const [chosenExercise, setChosenExercise] = useState<number | null>(null);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View className='p-12 gap-4'>
                <Text className='text-4xl font-bold'>Ajouter un exercise</Text>
                {isLoading && <Text className='text-gray-500 text-xs'>Chargement...</Text>}
                {(!isLoading && data && data.length > 0) &&
                    <View className='h-[70%] border-2 border-gray-300 p-4 rounded-lg'>
                        <FlatList
                            data={data as Data}
                            keyExtractor={(item) => item.id.toString()}
                            ItemSeparatorComponent={() => <View className='h-[2px] my-2' />}
                            renderItem={({ item }) => {
                                if (item.id === chosenExercise) {
                                    return (
                                        <View className={'flex flex-col gap-y-2 p-4 rounded-lg bg-secondary'}>
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
                                }

                                return (
                                    <TouchableOpacity onPress={() => {
                                        setChosenExercise(item.id);
                                    }} className={'flex flex-col gap-y-2 bg-gray-200 p-4 rounded-lg'}>
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
                                    </TouchableOpacity>
                                )
                            }} />
                    </View>
                }
                <TouchableOpacity
                    onPress={() => addExercise()}
                    className={'flex-row h-10 bg-secondary gap-x-2 pl-4 rounded-lg pr-1 items-center justify-center' + (loading ? " pr-4" : "")}>
                    {!loading ?
                        <>
                            <Text className='font-semibold text-md text-primary'>Ajouter à la séance</Text>
                        </> : <Spinner width={24} height={24} stroke={theme.colors.primary} />
                    }
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    );
}