import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

type AuthProps = {
    authState: {
        token: string | null;
        user: { id: number | null, email: string | null };
        authenticated: boolean | null
    };
    onRegister: (email: string, password: string) => Promise<any>;
    onLogin: (email: string, password: string) => Promise<any>;
    onLogout: () => Promise<any>;
}

const TOKEN_KEY = 'user_payload';
const AuthContext = createContext<AuthProps>({
    authState: {
        token: null,
        user: { id: null, email: null },
        authenticated: null
    },
    onRegister: () => Promise.resolve({}),
    onLogin: () => Promise.resolve({}),
    onLogout: () => Promise.resolve({})
});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<AuthProps['authState']>({
        token: null,
        authenticated: null,
        user: { id: null, email: null }
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            const parsedToken = token ? JSON.parse(token) : null;

            if (parsedToken) {
                setAuthState({
                    token: parsedToken.token,
                    authenticated: true,
                    user: parsedToken.user
                })
            }
        }
        loadToken();
    }, [])

    const fetchAuth = async ({ signin = false, password, email }: { signin: boolean, password: string, email: string }) => {
        try {
            const url = process.env.EXPO_PUBLIC_API_URL + '/auth' + (signin ? '/login' : '/register');
            const result = await fetch(url, {
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                method: "POST",
                body: JSON.stringify({ email, password })
            })

            const data = await result.json();

            if (result.status !== 200) {
                return { error: true, msg: data.message }
            }

            setAuthState({
                token: data.token,
                authenticated: true,
                user: data.user
            })

            await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify({ token: data.token, user: data.user }));
        } catch (e: any) {
            console.log(e);
            return { error: true, msg: e.response.data.ms }
        }
    }

    const register = async (email: string, password: string) => {
        return fetchAuth({ signin: false, password, email });
    }

    const login = async (email: string, password: string) => {
        return fetchAuth({ signin: true, password, email });
    }

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync(TOKEN_KEY)

            setAuthState({
                token: null,
                authenticated: null,
                user: { id: null, email: null }
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