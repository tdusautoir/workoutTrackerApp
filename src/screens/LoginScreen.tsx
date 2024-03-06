import { useAuthContext } from '@/context/AuthContext';
import { Routes } from '@/navigation/Routes';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';

export default function LoginScreen({ navigation }: { navigation: any }) {
    const { toggleIsSignedIn } = useAuthContext();

    return (
        <KeyboardAvoidingView behavior='position'>
            <StatusBar style="dark" />
            <View className='p-12 gap-4 h-full justify-center'>
                <Text className='text-4xl font-bold'>Connexion</Text>
                <View className='gap-y-2'>
                    <Text className='text-lg font-semibold'>Email</Text>
                    <TextInput keyboardType='email-address' className='bg-gray-200 text-xl px-4 py-2 rounded-lg' />
                </View>
                <View className='gap-y-2'>
                    <Text className='text-lg font-semibold'>Mot de passe</Text>
                    <TextInput keyboardType='email-address' className='bg-gray-200 text-xl px-4 py-2 rounded-lg' />
                </View>
                <Text className='text-right text-gray-500'>Pas de compte ? <Text onPress={() => navigation.navigate(Routes.REGISTER_SCREEN)}>Enregistrement</Text></Text>
            </View>
        </KeyboardAvoidingView>
    );
}