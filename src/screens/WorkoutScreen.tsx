import { useAuth } from '@/context/AuthContext';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

export default function WorkoutScreen({ navigation }: { navigation: any }) {
    const { onLogout } = useAuth();
    return (
        <SafeAreaView className='mt-12'>
            <Text>WorkoutScreen</Text>
            <TouchableOpacity onPress={() => onLogout()}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}