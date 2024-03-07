import InputPassword from '@/components/InputPassword/InputPassword';
import { Routes } from '@/navigation/Routes';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Animated, Easing } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import ChevronRight from '../../assets/icons/chevron-right.svg';
import Spinner from '@/components/Spinner/Spinner';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';

const { theme } = resolveConfig(tailwindConfig) as TwTheme;

export default function LoginScreen({ navigation }: { navigation: any }) {
    const { onLogin } = useAuth();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        const result = await onLogin(email, password);
        setLoading(false);

        if (result && result.error) {
            alert(result.msg);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <StatusBar style="dark" />
            <View className='p-12 gap-4 h-full justify-center'>
                <Text className='text-4xl font-bold transition-all'>Connexion</Text>
                <View className='gap-y-2'>
                    <Text className='text-lg font-semibold'>Email</Text>
                    <TextInput onChangeText={(value) => setEmail(value)} keyboardType='email-address' className='bg-gray-200 text-sm px-4 pt-2 pb-3 rounded-lg' />
                </View>
                <View className='gap-y-2'>
                    <Text className='text-lg font-semibold mb-2'>Mot de passe</Text>
                    <InputPassword onUpdate={(value) => setPassword(value)} />
                </View>
                <Text className='text-right text-gray-500'>Pas de compte ? <Text onPress={() => navigation.navigate(Routes.REGISTER_SCREEN)}>Enregistrement</Text></Text>
                <TouchableOpacity
                    onPress={() => handleLogin()}
                    className={'items-center justify-center flex-row absolute bottom-0 right-12 h-10 bg-secondary pl-4 rounded-lg pr-1' + (loading ? " pr-4" : "")}>
                    {!loading ?
                        <>
                            <Text className='font-semibold text-md text-primary'>Se connecter</Text>
                            <ChevronRight width={36} height={36} stroke={theme.colors.primary} />
                        </> : <Spinner width={24} height={24} stroke={theme.colors.primary} />
                    }
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
    );
}