import InputPassword from '@/components/InputPassword/InputPassword';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform } from 'react-native';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import Spinner from '@/components/Spinner/Spinner';
import PlusSquareIcon from '../../assets/icons/plus-square.svg';

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
            body: JSON.stringify({ name })
        });
        setLoading(false);
        const result = await res.json();

        if (res.status !== 200) {
            if (result && result.error) {
                alert(result.msg);
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

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View className='p-12 gap-4'>
                <Text className='text-4xl font-bold transition-all'>Ajouter un programme</Text>
                <View className='gap-y-2'>
                    <Text className='text-lg font-semibold'>Nom</Text>
                    <TextInput onChangeText={(value) => setName(value)} keyboardType='email-address' className='bg-gray-200 text-sm px-4 pt-2 pb-3 rounded-lg' />
                </View>
                <TouchableOpacity
                    onPress={() => addProgram()}
                    className={'flex-row h-10 bg-secondary gap-x-2 pl-4 rounded-lg pr-1 items-center justify-center' + (loading ? " pr-4" : "")}>
                    {!loading ?
                        <>
                            <Text className='font-semibold text-md text-primary'>Ajouter</Text>
                            <PlusSquareIcon width={24} height={24} stroke={theme.colors.primary} />
                        </> : <Spinner width={24} height={24} stroke={theme.colors.primary} />
                    }
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    );
}