import InputPassword from '@/components/InputPassword';
import { Routes } from '@/navigation/Routes';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';

export default function RegisterScreen({ navigation }: { navigation: any }) {

    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    return (
        <KeyboardAvoidingView behavior='position'>
            <StatusBar style="dark" />
            <View className='p-12 gap-4 h-full justify-center'>
                <Text className='text-4xl font-bold'>Enregistrement</Text>
                <View className='gap-y-2'>
                    <Text className='text-lg font-semibold'>Email</Text>
                    <TextInput onChangeText={(value) => setEmail(value)} keyboardType='email-address' className='bg-gray-200 text-sm px-4 pt-2 pb-3 rounded-lg' />
                </View>
                <View className='gap-y-2'>
                    <Text className='text-lg font-semibold'>Mot de passe</Text>
                    <InputPassword onUpdate={(value) => setPassword(value)} />
                </View>
                <View className='gap-y-2'>
                    <Text className='text-lg font-semibold'>Confirmation de mot de passe</Text>
                    <InputPassword onUpdate={(value) => setConfirmPassword(value)} />
                </View>
                <Text className='text-right text-gray-500'>Vous possedez déjà un compte ? <Text className='underline' onPress={() => navigation.navigate(Routes.LOGIN_SCREEN)}>Connexion</Text></Text>
            </View>
        </KeyboardAvoidingView>
    );
}