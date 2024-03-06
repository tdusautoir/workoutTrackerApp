import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const InputPassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className='flex-row gap-x-1 items-center relative'>
            <TextInput secureTextEntry={!showPassword} keyboardType={'visible-password'} className='bg-gray-200 text-sm pl-4 pr-12 pt-2 pb-3 rounded-lg w-full' />
            <TouchableOpacity
                onPress={() => setShowPassword((old) => !old)}
                className='items-center justify-center px-2 absolute right-0 bg-gray-200 h-full'>
                <Text>{showPassword ? <Icon name='eye' size={24} color='black' /> : <Icon name='eye-off' size={24} color='black' />}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default InputPassword