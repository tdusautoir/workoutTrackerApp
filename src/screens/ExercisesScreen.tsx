import { useAuth } from '@/context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';

const { theme } = resolveConfig(tailwindConfig) as TwTheme;

type Data = Array<{
    id: number;
    name: string;
    description: string;
    sets: number;
    reps: number;
    rest: number;
    typeId: number;
}>;

export default function ExercisesScreen({ navigation }: { navigation: any }) {
    const { authState } = useAuth();
    const [selectedType, setSelectedType] = useState<number | null>(null);

    const exercisesQuery = useQuery({
        queryKey: ['exercises'],
        queryFn: async () => {
            const url = process.env.EXPO_PUBLIC_API_URL;

            let searchParams = new URLSearchParams();
            if (selectedType) {
                searchParams.append('typeId', selectedType.toString());
            }

            const response = await fetch(url + '/exercise?' + searchParams, {
                headers: { 'Authorization': `Bearer ${authState.token}` }
            });
            return response.json();
        }
    });

    const typesQuery = useQuery({
        queryKey: ['types'],
        queryFn: async () => {
            const url = process.env.EXPO_PUBLIC_API_URL;
            const response = await fetch(url + '/exercise-types', {
                headers: { 'Authorization': `Bearer ${authState.token}` }
            });
            return response.json();
        }
    });

    useEffect(() => {
        exercisesQuery.refetch();
    }, [selectedType]);

    if (exercisesQuery.isLoading) {
        return (
            <SafeAreaView>
                <View className='p-12'>
                    <Text className='text-2xl'>Exercices</Text>
                    <Text>Chargement...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <View className='p-12'>
                <Text className='text-2xl'>Exercices</Text>
                {typesQuery.isLoading && <View className='flex-row h-10 mt-[12px] bg-secondary rounded-lg pr-1 items-center justify-center'><Text className='text-primary'>Chargement...</Text></View>}
                {(!typesQuery.isLoading && typesQuery.data && typesQuery.data.length > 0) &&
                    <SelectDropdown
                        search={true}
                        buttonTextStyle={{ color: theme.colors.primary }}
                        buttonStyle={{ backgroundColor: theme.colors.secondary, width: "100%", height: 45, marginTop: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}
                        dropdownStyle={{ borderRadius: 8, backgroundColor: theme.colors.secondary, height: 160, marginTop: 10 }}
                        defaultButtonText='Sélectionner un type'
                        searchInputStyle={{ backgroundColor: theme.colors.secondary }}
                        searchInputTxtStyle={{ color: theme.colors.primary }}
                        searchPlaceHolder='Rechercher un type'
                        searchPlaceHolderColor={theme.colors.primary}
                        rowStyle={{ backgroundColor: theme.colors.secondary, borderBottomWidth: 0 }}
                        rowTextStyle={{ color: theme.colors.primary }}
                        dropdownOverlayColor='transparent'
                        data={[{
                            id: 0,
                            name: "Tous"
                        }, ...typesQuery.data] as Array<{ id: number, name: string }>}
                        onSelect={(selectedItem: { id: number, name: string }, index: number) => {
                            if (selectedItem.id === 0) {
                                setSelectedType(null);
                                return;
                            }

                            setSelectedType(selectedItem.id);
                        }}
                        buttonTextAfterSelection={(selectedItem: { id: number, name: string }, index: number) => {
                            return selectedItem.name
                        }}
                        rowTextForSelection={(item: { id: number, name: string }, index: number) => {
                            return item.name
                        }}
                    />
                }
                <View className='mt-4 flex flex-row justify-between mb-[268px]'>
                    {(exercisesQuery.data && exercisesQuery.data.length > 0) &&
                        <FlatList
                            data={exercisesQuery.data as Data}
                            keyExtractor={(item) => item.id.toString()}
                            ItemSeparatorComponent={() => <View className='h-[2px] bg-gray-300 my-6' />}
                            renderItem={({ item }) => {
                                return (
                                    <View className='flex flex-col gap-y-2'>
                                        <Text className='text-lg'>{item.name}</Text>
                                        <View>
                                            <Text className='mb-2 font-medium'>Description :</Text>
                                            <Text>{item.description}</Text>
                                        </View>
                                        <View className='flex flex-row justify-between ,m'>
                                            {item.sets && <Text>sets : {item.sets}</Text>}
                                            {item.reps && <Text>reps : {item.reps}</Text>}
                                            {item.rest && <Text>rest : {item.rest}</Text>}
                                        </View>
                                    </View>
                                )
                            }} />
                    }
                </View>
            </View>
        </SafeAreaView>
    );
}