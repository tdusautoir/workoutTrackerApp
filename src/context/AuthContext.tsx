import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
// import { API_URL } from "@env";

type AuthProps = {
    authState: { token: string | null; authenticated: boolean | null };
    onRegister: (email: string, password: string) => Promise<any>;
    onLogin: (email: string, password: string) => Promise<any>;
    onLogout: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
const AuthContext = createContext<AuthProps>({
    authState: { token: null, authenticated: null },
    onRegister: () => Promise.resolve({}),
    onLogin: () => Promise.resolve({}),
    onLogout: () => Promise.resolve({})
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if (token) {
                setAuthState({
                    token,
                    authenticated: true
                })
            }
        }
        loadToken();
    }, [])

    const register = async (email: string, password: string) => {
        try {
            return await fetch(process.env.EXPO_PUBLIC_API_URL + '/users', {
                method: "POST",
                body: JSON.stringify({ email, password })
            })
        } catch (e: any) {

        }
    }

    const login = async (email: string, password: string) => {
        try {
            const result = await fetch(process.env.EXPO_PUBLIC_API_URL + '/auth/login', {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    email: email, password
                })
            });

            const data = await result.json();

            if (result.status !== 200) {
                return { error: true, msg: data.message }
            }

            setAuthState({
                token: data.token,
                authenticated: true,
            })

            await SecureStore.setItemAsync(TOKEN_KEY, data.token);
        } catch (e: any) {
            console.log(e);
            return { error: true, msg: e.response.data.ms }
        }
    }

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY)

            setAuthState({
                token: null,
                authenticated: null
            })
        } catch (e: any) {
            return { error: true, msg: e.response.data.ms }
        }
    }

    const value: AuthProps = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}