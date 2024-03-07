import { useAuth } from '@/context/AuthContext';
import { View, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }: { navigation: any }) {
    const { onLogout } = useAuth();
    return (
        <View className='mt-12'>
            <Text>HomeScreen</Text>
            <TouchableOpacity onPress={() => onLogout()}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}