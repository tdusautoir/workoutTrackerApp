import InputPassword from '@/components/InputPassword/InputPassword';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform } from 'react-native';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import Spinner from '@/components/Spinner/Spinner';
import PlusSquareIcon from '../../assets/icons/plus-square.svg';
import PlusIcon from '../../assets/icons/plus.svg';

const { theme } = resolveConfig(tailwindConfig) as TwTheme;

export default function AddProgramScreen({ navigation }: { navigation: any }) {
    const { authState } = useAuth();

    const addProgram = async () => {
        setLoading(true);
        const url = process.env.EXPO_PUBLIC_API_URL + '/program';
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + authState.token
            },
            body: JSON.stringify({ name, workouts })
        });
        setLoading(false);
        const result = await res.json();

        if (res.status !== 200) {
            if (result && result.message) {
                alert(result.message);
            } else {
                alert('Erreur lors de l\'ajout du programme');
            }

            return;
        }

        alert('Programme ajouté');
        navigation.goBack();
    }

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [workouts, setWorkouts] = useState<Array<string>>([]);


    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View className='p-12 gap-4'>
                <Text className='text-4xl font-bold'>Ajouter un programme</Text>
                <View className='gap-y-2'>
                    <Text className='text-lg font-semibold'>Nom</Text>
                    <TextInput onChangeText={(value) => setName(value)} keyboardType='default' className='bg-gray-200 text-sm px-4 pt-2 pb-3 rounded-lg' />
                </View>
                <Text className='text-lg font-semibold'>Séances</Text>
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
                    onPress={() => addProgram()}
                    className={'flex-row h-10 bg-secondary gap-x-2 pl-4 rounded-lg pr-1 items-center justify-center' + (loading ? " pr-4" : "")}>
                    {!loading ?
                        <>
                            <Text className='font-semibold text-md text-primary'>Ajouter</Text>
                        </> : <Spinner width={24} height={24} stroke={theme.colors.primary} />
                    }
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    );
}