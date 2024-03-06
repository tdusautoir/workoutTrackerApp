import { TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Eye from '../../assets/icons/eye.svg';
import EyeOff from '../../assets/icons/eye-off.svg';

const InputPassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className='flex-row gap-x-1 items-center relative'>
            <TextInput secureTextEntry={!showPassword} keyboardType={'visible-password'} className='bg-gray-200 text-sm pl-4 pr-12 pt-2 pb-3 rounded-lg w-full' />
            <TouchableOpacity
                onPress={() => setShowPassword((old) => !old)}
                className='items-center justify-center absolute right-0 bg-gray-200 h-full px-2'>
                {!showPassword ? <EyeOff width={24} height={24} stroke={'black'} /> : <Eye width={24} height={24} stroke={'black'} />}
            </TouchableOpacity>
        </View >
    )
}

export default InputPassword