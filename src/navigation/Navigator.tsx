import React from 'react'
import AuthNavigator from './AuthNavigator';
import RootNavigator from './RootNavigator';
import { useAuth } from '@/context/AuthContext';

export default function Navigator() {
    const { authState } = useAuth();

    if (!authState.authenticated) {
        return <AuthNavigator />
    }

    return <RootNavigator />
}