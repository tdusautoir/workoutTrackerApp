import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";

export default function LaunchProgramscreen({ navigation }: { navigation: any }) {
    return (
        <SafeAreaView>
            <View className="p-12">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text>Retour</Text>
                </TouchableOpacity>
                <Text className="text-2xl">LaunchProgramscreen</Text>
                <Text>Coming soon</Text>
            </View>
        </SafeAreaView>
    );

}