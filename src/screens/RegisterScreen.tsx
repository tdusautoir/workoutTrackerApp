import InputPassword from '@/components/InputPassword';
import { useAuthContext } from '@/context/AuthContext';
import { Routes } from '@/navigation/Routes';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';

export default function RegisterScreen({ navigation }: { navigation: any }) {
    const { toggleIsSignedIn } = useAuthContext();

    return (
        <KeyboardAvoidingView behavior='position'>
            <StatusBar style="dark" />
            <View className='p-12 gap-4 h-full justify-center'>
                <Text className='text-4xl font-bold'>Enregistrement</Text>
                <View className='gap-y-2'>
                    <Text className='text-lg font-semibold'>Email</Text>
                    <TextInput keyboardType='email-address' className='bg-gray-200 text-sm px-4 pt-2 pb-3 rounded-lg' />
                </View>
                <View className='gap-y-2'>
                    <Text className='text-lg font-semibold'>Mot de passe</Text>
                    <InputPassword />
                </View>
                <View className='gap-y-2'>
                    <Text className='text-lg font-semibold'>Confirmation de mot de passe</Text>
                    <InputPassword />
                </View>
                <Text className='text-right text-gray-500'>Vous possedez déjà un compte ? <Text className='underline' onPress={() => navigation.navigate(Routes.LOGIN_SCREEN)}>Connexion</Text></Text>
            </View>
        </KeyboardAvoidingView>
    );
}