import { createContext, useContext, useState } from "react";

type AuthContextType = {
    isSignedIn: boolean;
    toggleIsSignedIn: () => void;
}

const AuthContext = createContext<AuthContextType>({
    toggleIsSignedIn: () => undefined,
    isSignedIn: false,
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const toggleIsSignedIn = () => {
        setIsSignedIn(old => !old);
    }

    return (
        <AuthContext.Provider value={{ isSignedIn, toggleIsSignedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

// #138bac
// #bfe3eb

const useAuthContext = () => {
    return useContext(AuthContext);
}

export { AuthContextProvider, useAuthContext };