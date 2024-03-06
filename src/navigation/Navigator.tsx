import React from 'react'
import AuthNavigator from './AuthNavigator';
// import RootNavigator from './RootNavigator';
import { useAuthContext } from '@/context/AuthContext';

export default function Navigator() {
    const { isSignedIn } = useAuthContext();

    if (!isSignedIn) {
        return <AuthNavigator />
    }

    // return <RootNavigator />
}