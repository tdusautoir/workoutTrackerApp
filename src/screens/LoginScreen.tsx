import InputPassword from '@/components/InputPassword';
import { Routes } from '@/navigation/Routes';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen({ navigation }: { navigation: any }) {
    const { onLogin } = useAuth();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = async () => {
        const result = await onLogin(email, password);

        if (result && result.error) {
            alert(result.msg);
        }
    }

    return (
        <KeyboardAvoidingView behavior='position'>
            <StatusBar style="dark" />
            <View className='p-12 gap-4 h-full justify-center'>
                <Text className='text-4xl font-bold'>Connexion</Text>
                <View className='gap-y-2'>
                    <Text className='text-lg font-semibold'>Email</Text>
                    <TextInput onChangeText={(value) => setEmail(value)} keyboardType='email-address' className='bg-gray-200 text-sm px-4 pt-2 pb-3 rounded-lg' />
                </View>
                <View className='gap-y-2'>
                    <Text className='text-lg font-semibold mb-2'>Mot de passe</Text>
                    <InputPassword onUpdate={(value) => setPassword(value)} />
                </View>
                <Text className='text-right text-gray-500'>Pas de compte ? <Text onPress={() => navigation.navigate(Routes.REGISTER_SCREEN)}>Enregistrement</Text></Text>
                <View className='gap-y-2 rounded-lg bg-primary'>
                    <Text onPress={() => handleLogin()} className='text-center  text-white py-2 rounded-lg'>Connexion</Text>
                </View>
            </View>
        </KeyboardAvoidingView >
    );
}